/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0]
  const srvData = {
    name: server,
    root: ns.hasRootAccess(server),
    svrFunds: ns.getServerMoneyAvailable(server),
    svrMaxFunds: ns.getServerMaxMoney(server),
    svrGrowth: ns.format.percent(ns.getServerGrowth(server) / 1000),
    hackGain: ns.hackAnalyze(server) * 1000,
    timeToHack: ns.format.time(ns.getHackTime(server)),
    reqHckSkill: ns.getServerRequiredHackingLevel(server),
    srvSec: ns.getServerSecurityLevel(server),
    svrMinSec: ns.getServerMinSecurityLevel(server),
    portsReq: ns.getServerNumPortsRequired(server),
    svrMaxRam: ns.getServerMaxRam(server),
    srvUsedRam: ns.getServerUsedRam(server)
  }
  function log(srv) {
    ns.clearLog();
    ns.print(`
    Server name: ${srv.name}
    Root access: ${srv.root}
    Required Hack LVL ${srv.reqHckSkill}
    Security LVL: ${Math.floor(srv.srvSec)} / ${srv.svrMinSec} (${srv.timeToHack})
    Ports required: ${srv.portsReq}
    Ram: ${srv.srvUsedRam} GBs / ${srv.svrMaxRam} GBs
    Current Funds: \$${ns.format.number(srv.svrFunds)} / \$${ns.format.number(srv.svrMaxFunds)} (${ns.format.percent(srv.svrGrowth)})
    Potential hack gain: ${ns.format.percent(srv.hackGain)}
    `);
  }
  ns.ui.openTail()
  for (let i = 0; i < 60; i++) {
    log(srvData)
    await ns.asleep(1000)
  }
}