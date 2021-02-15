"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationRequest_1 = __importDefault(require("../ApplicationRequest"));
const getEggInfo_1 = __importDefault(require("./getEggInfo"));
/**
 * @param {String} name Name of server to create
 * @param {Integer} ownerId User ID of who should own this server
 * @param {String} description Description of server
 * @param {Integer} eggId Egg ID to use when installing the server
 * @param {Integer} nestID ID of the nest to use when making a server
 * @param {Integer} ram The amount of RAM the server has
 * @param {Integer} swap The amount of Swap the server has
 * @param {Integer} disk The amount of Storage the server has
 * @param {Integer} cpu The amount of CPU Power the server can use (100 = 1 core);
 * @param {Object} environment Servers environment variables. REQUIRED!
 * @param {Integer} amountOfDatabases The max amount of databases a server can use
 * @param {Integer} amountOfAllocations The max amount of allocation(s) a server can use
 * @param {Integer} amountOfBackups The max amount of backups a server can use
 * @param {String} [startupCmd] The command to use when starting this server (AKA JVM Arguments)
 * @param {String} [dockerImage] The image to use from Docker
 * @param {Integer} [io=500] Set this to 500.
 * @yields {ServerAttributes} (refer to docs for schema);
 */
async function createServer(name, ownerId, description, nestId, eggId, ram, swap, disk, cpu, environment, amountOfDatabases, amountOfAllocations, amountOfBackups, startupCmd, dockerImage, io = 500) {
    const egg = await getEggInfo_1.default(nestId, eggId);
    if (!egg)
        throw new Error('No such egg exsists!');
    if (!startupCmd)
        startupCmd = egg.startup;
    if (!dockerImage)
        dockerImage = egg.docker_image;
    const body = makeData(name, ownerId, description, eggId, nestId, ram, swap, disk, cpu, environment, amountOfDatabases, amountOfAllocations, amountOfBackups, startupCmd, dockerImage, io);
    const Req = new ApplicationRequest_1.default(process.env.AppHost, process.env.AppKey);
    return Req.request('createServer', 'POST', body, 'attributes', '/api/application/servers', true);
}
exports.default = createServer;
function makeData(name, ownerId, description, eggId, nestId, ram, swap, disk, cpu, environment, amountOfDatabases, amountOfAllocations, amountOfBackups, startupCmd, dockerImage, io) {
    return {
        name: name,
        user: ownerId,
        description: description,
        egg: eggId,
        pack: nestId,
        docker_image: dockerImage,
        startup: startupCmd,
        limits: {
            memory: ram,
            swap: swap,
            disk: disk,
            io: io,
            cpu: cpu,
        },
        feature_limits: {
            databases: amountOfDatabases,
            allocations: amountOfAllocations,
            backups: amountOfBackups,
        },
        environment: environment,
        allocation: {
            default: 1,
            additional: [],
        },
        deploy: {
            locations: [1],
            dedicated_ip: false,
            port_range: [],
        },
        start_on_completion: false,
        skip_scripts: false,
        oom_disabled: false,
    };
}
