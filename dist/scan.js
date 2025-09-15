export async function main(ns) {
    const visited = new Set();
    const servers = [];
    function scanServer(hostname, depth = 0) {
        if (visited.has(hostname) || depth > 10)
            return;
        visited.add(hostname);
        const connections = ns.scan(hostname);
        for (const server of connections) {
            if (!visited.has(server)) {
                servers.push({
                    name: server,
                    hasRoot: ns.hasRootAccess(server),
                    hackLevel: ns.getServerRequiredHackingLevel(server),
                    portsRequired: ns.getServerNumPortsRequired(server),
                    maxMoney: ns.getServerMaxMoney(server),
                });
                scanServer(server, depth + 1);
            }
        }
    }
    ns.tprint("Scanning network...");
    scanServer("home");
    const playerLevel = ns.getHackingLevel();
    const hackableServers = servers
        .filter((s) => s.hackLevel <= playerLevel && s.maxMoney > 0)
        .sort((a, b) => b.maxMoney - a.maxMoney);
    ns.tprint(`Found ${servers.length} servers, ${hackableServers.length} hackable:`);
    for (const server of hackableServers.slice(0, 10)) {
        ns.tprint(`${server.name}: $${server.maxMoney.toLocaleString()} ` +
            `(Level ${server.hackLevel}, ${server.portsRequired} ports, ` +
            `Root: ${server.hasRoot ? "Yes" : "No"})`);
    }
}
