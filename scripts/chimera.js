import { SmartSwarm } from "SmartSwarm.js"

/** @param {NS} ns */
export async function main(ns) {
  /** 
   * this is a script that uses all available servers and their ram
   * to perform a concentrated attack on a specified server
  */

  //Constant variable and resources
  const attackScript = "attack_v1.js"
  const host = "home"
  const scriptRam = ns.getScriptRam(attackScript)


  //Collects all servers
  let servers = ns.scan()
  for (let i = 0; i < servers.length; i++) {
    let newServers = ns.scan(servers[i])
    for (const newServer of newServers) {
      if (!servers.includes(newServer)) {
        servers.push(newServer)
      }
    }
  }

  //Filters servers based on hacking level
  const svrsLVL = servers.filter(
    (s) => ns.getServerNumPortsRequired(s) <= 5
      && ns.getServerMaxRam(s) >= scriptRam)
  let numOfThreads = 0;

  let brute = 0;
  let ftp = 0;
  let relay = 0;
  let worm = 0;
  let sql = 0;
  let root = 0;
  let copied = 0;

  //using the filtered servers list it execute a NUKE command
  //and then copies the attack files to the servers
  //after that it calculates the necesary threads to max out all servers
  for (const server of svrsLVL) {
    if (ns.fileExists("bruteSSH.exe")) { ns.brutessh(server); brute++; }
    if (ns.fileExists("FTPCrack.exe")) { ns.ftpcrack(server); ftp++; }
    if (ns.fileExists("relaySMTP.exe")) { ns.relaysmtp(server); relay++; }
    if (ns.fileExists("HTTPWorm.exe")) { ns.httpworm(server); worm++ }
    if (ns.fileExists("SQLInject.exe")) { ns.sqlinject(server); sql++ }
    if (!ns.hasRootAccess(server)) { ns.nuke(server); root++; }
    if (!ns.fileExists(attackScript, server)) { ns.scp(attackScript, server, host); copied++; }



    const maxRam = ns.getServerMaxRam(server);
    const threads = Math.floor(maxRam / scriptRam)

    //kills all currently running scripts
    ns.killall(server)
    await ns.sleep(1000)

    numOfThreads += threads
    ns.exec(attackScript, server, threads, ns.args[0])
  }
  //ns.tprint(`-- ${svrsLVL.length} server attacking ${ns.args[0]} --`)
  await SmartSwarm(ns, ns.args[1], ns.args[0])
  ns.tprint(`---| ${numOfThreads} threads currently active across ${svrsLVL.length} servers |---`)
  ns.tprint(`
  BruteSSH: ${brute} servers
  FTPCrack: ${ftp}
  RelaySMPT: ${relay}
  HTTPWorm: ${worm}
  SQLInject: ${sql}
  Nuke: ${root}
  Provisioned: ${copied}
  `)
  // Sends updates to the log terminal 
  //showing the status of all scripts attacking the target


}