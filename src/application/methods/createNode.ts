import { NodeAttributes } from '../interfaces/Node';
import Request from '../ApplicationRequest';

/**
 * @param {String} name The name of the node
 * @param {String} description A description for the node
 * @param {Number} locationId Location ID to use
 * @param {Boolean} isPublic Is this node public? (true/false)
 * @param {String} fqdn Fully Qualified Domain Name (If you're using an IP: Scheme needs to be HTTP)
 * @param {String} scheme http/https
 * @param {Number} ram How much RAM should be allocated for the node?
 * @param {Number} disk How much disk space be allocated for the node?
 * @param {Number} [daemonPort=8080] What port should the daemon use? Normally 8080
 * @param {Number} [daemonSFTPPort=2022] What port should the daemon use? Normally 2022
 * @param {Number} [ramOverAllocate=-1] How much overallocation for RAM? (Percent)
 * @param {Number} [diskOverallocate=-1] How much overallocation for the Disk? (percent)
 * @param {String} [daemonDir='/var/lib/pterodactyl/volumes'] Directory of the daemon, normally /var/lib/pterodactyl/volumes
 * @param {Boolean} [maintenceMode=false] Is the node in maintence mode? (true/false)
 * @param {Number} [maxUploadSize=100] Must be between 1 and 1024 or you'll get a 422
 * @param {Boolean} [behindProxy=false] Is this node behind a proxy? (true/false)
 */
export default async function createNode(
    name: string,
    description: string,
    locationID: number,
    isPublic: boolean,
    fqdn: string,
    scheme: string,
    ram: number,
    disk: number,
    daemonPort: number = 8080,
    daemonSFTPPort: number = 2022,
    ramOverAllocate: number = -1,
    diskOverallocate: number = -1,
    daemonDir: string = '/var/lib/pterodactyl/volumes',
    maintenceMode: boolean = false,
    maxUploadSize: number = 100,
    behindProxy: boolean = false
): Promise<NodeAttributes> {
    const data = makeData(
        name,
        description,
        locationID,
        isPublic,
        fqdn,
        scheme,
        ram,
        disk,
        daemonPort,
        daemonSFTPPort,
        ramOverAllocate,
        diskOverallocate,
        daemonDir,
        maintenceMode,
        maxUploadSize,
        behindProxy
    );
    const Req = new Request(process.env.AppHost!, process.env.AppKey!);
    return Req.request(
        'createNode',
        'POST',
        data,
        'attributes',
        '/api/application/nodes',
        true
    );
}

function makeData(
    name: string,
    description: string,
    locationID: number,
    isPublic: boolean,
    fqdn: string,
    scheme: string,
    ram: number,
    disk: number,
    daemonPort: number,
    daemonSFTPPort: number,
    ramOverAllocate: number,
    diskOverallocate: number,
    daemonDir: string,
    maintenceMode: boolean,
    maxUploadSize: number,
    behindProxy: boolean
) {
    return {
        name: name,
        description: description,
        location_id: locationID,
        public: isPublic,
        fqdn: fqdn,
        scheme: scheme,
        behind_proxy: behindProxy,
        memory: ram,
        memory_overallocate: ramOverAllocate,
        disk: disk,
        disk_overallocate: diskOverallocate,
        daemon_base: daemonDir,
        daemon_listen: daemonPort,
        daemon_sftp: daemonSFTPPort,
        maintenance_mode: maintenceMode,
        upload_size: maxUploadSize,
    };
}
