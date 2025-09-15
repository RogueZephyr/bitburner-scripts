/** @param {NS} ns */
export async function SmartSwarm(ns, host, target) {

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

  //Script Ram
  const wknRam = ns.getScriptRam(scripts.wknScript);
  const grwRam = ns.getScriptRam(scripts.grwScript);
  const hckRam = ns.getScriptRam(scripts.hckScript);

  // Calculate Required ram + threads
  const srvRam = ns.getServerMaxRam(host);
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
  if (ns.fileExists(scripts.wknScript)) { ns.scp(scripts.wknScript, host, "home") }
  if (ns.fileExists(scripts.grwScript)) { ns.scp(scripts.grwScript, host, "home") }
  if (ns.fileExists(scripts.hckScript)) { ns.scp(scripts.hckScript, host, "home") }

  // Executes scripts with max threads per Script
  ns.killall(host)
  ns.exec(scripts.wknScript, host, wknThreads, target)
  ns.exec(scripts.grwScript, host, grwThreads, target)
  ns.exec(scripts.hckScript, host, hckThreads, target)

  // Prints the max thread, host and target to terminal
  const totalThreads = wknThreads + grwThreads + hckThreads
  ns.tprint(`---| Swarmed ${target} from ${host} with ${totalThreads} threads |---`)
}