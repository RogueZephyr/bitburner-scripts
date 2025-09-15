/** @param {NS} ns */
export async function main(ns) {

  //disabled log flags
  ns.disableLog("getServerMaxRam")
  ns.disableLog("killall")
  ns.disableLog("exec")
  ns.disableLog("clearLog")
  ns.clearLog()

  //Ratio of Scripts
  const wknRatio = 6;
  const grwRatio = 3;
  const hckRatio = 1;

  //Scripts
  const scripts = {
    wknScript: "cwkn.js",
    grwScript: "cgrw.js",
    hckScript: "chck.js"
  }

  //target argument
  const target = ns.args[0]

  //Player owned servers
  const pServers = ns.getPurchasedServers()

  //Total threads across all servers
  let totalThreadsAllSrvs = 0;
  let totalSrvs = 0;

  //Runs the swarm on all player owned servers
  for (const srv of pServers) {

    //Script Ram
    const wknRam = ns.getScriptRam(scripts.wknScript);
    const grwRam = ns.getScriptRam(scripts.grwScript);
    const hckRam = ns.getScriptRam(scripts.hckScript);

    // Calculate Required ram + threads
    const srvRam = ns.getServerMaxRam(srv);
    const wknReqRam = wknRam * wknRatio;
    const grwReqRam = grwRam * grwRatio;
    const hckReqRam = hckRam * hckRatio;

    const threads = srvRam / (wknReqRam + grwReqRam + hckReqRam);
    const wknMaxRam = threads * wknReqRam
    const grwMaxRam = threads * grwReqRam
    const hckMaxRam = threads * hckReqRam

    const wknThreads = Math.floor(wknMaxRam / wknRam)
    const grwThreads = Math.floor(grwMaxRam / grwRam)
    const hckThreads = Math.floor(hckMaxRam / hckRam)

    //Provisions all required dependencies if not present
    if (!ns.fileExists(scripts.wknScript, srv)) { ns.scp(scripts.wknScript, srv, "home") }
    if (!ns.fileExists(scripts.grwScript, srv)) { ns.scp(scripts.grwScript, srv, "home") }
    if (!ns.fileExists(scripts.hckScript, srv)) { ns.scp(scripts.hckScript, srv, "home") }

    // Executes scripts with max threads per Script
    ns.killall(srv)
    ns.exec(scripts.wknScript, srv, wknThreads, target)
    ns.exec(scripts.grwScript, srv, grwThreads, target)
    ns.exec(scripts.hckScript, srv, hckThreads, target)

    // Prints the max thread, server and target to terminal
    const totalThreads = wknThreads + grwThreads + hckThreads
    ns.print(`---| Swarmed ${target} from ${srv} with ${totalThreads} threads |---`)
    totalThreadsAllSrvs += totalThreads;
    totalSrvs++;
  }
  ns.tprint(`---| Swarmed ${target} from ${totalSrvs} server with ${ns.format.number(totalThreadsAllSrvs)} total threads |---`)
}