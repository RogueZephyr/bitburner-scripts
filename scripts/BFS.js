/** @param {NS} ns */
export async function BFS(ns) {
  //Collects all servers
  let servers = ns.scan("home")
  for (let i = 0; i < servers.length; i++) {
    let newServers = ns.scan(servers[i])
    for (const newServer of newServers) {
      if (!servers.includes(newServer)) {
        servers.push(newServer)
      }
    }
  }
  return servers
}