"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRequest_1 = __importDefault(require("../ClientRequest"));
/**
 * @param {String} serverId ID of the server to send a command to
 * @param {String} command Command to send
 */
async function sendCommand(serverId, command) {
    const Req = new ClientRequest_1.default(process.env.ClientHost, process.env.ClientKey);
    const data = { command: command };
    return Req.request('sendCommand', 'POST', data, 'sendCommand', `/api/client/servers/${serverId}/command`, true);
}
exports.default = sendCommand;
