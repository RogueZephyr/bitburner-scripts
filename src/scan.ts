/**
 * Server scanner utility for Bitburner
 * Recursively scans all connected servers and displays information
 */

interface NS {
  scan(hostname?: string): string[];
  hasRootAccess(hostname: string): boolean;
  getServerRequiredHackingLevel(hostname: string): number;
  getServerNumPortsRequired(hostname: string): number;
  getServerMaxMoney(hostname: string): number;
  getHackingLevel(): number;
  print(msg: string): void;
  tprint(msg: string): void;
}

export async function main(ns: NS): Promise<void> {
  const visited = new Set<string>();
  const servers: Array<{
    name: string;
    hasRoot: boolean;
    hackLevel: number;
    portsRequired: number;
    maxMoney: number;
  }> = [];

  function scanServer(hostname: string, depth = 0): void {
    if (visited.has(hostname) || depth > 10) return;
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
    ns.tprint(
      `${server.name}: $${server.maxMoney.toLocaleString()} ` +
        `(Level ${server.hackLevel}, ${server.portsRequired} ports, ` +
        `Root: ${server.hasRoot ? "Yes" : "No"})`,
    );
  }
}
