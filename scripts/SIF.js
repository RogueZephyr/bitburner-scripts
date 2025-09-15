import { BFS } from "BFS.js"
import { QuickSort } from "QuickSort.js"

/** @param {NS} ns */
export async function main(ns) {
  //Local script variables

  //Collects all servers
  let servers = await BFS(ns)

  //Filters servers based on hacking level
  const srvsLVL = servers.filter(
    (s) => ns.getServerNumPortsRequired(s) <= 5
      && ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(s)
  )

  const serverData = srvsLVL.map(server => ({
    name: server,
    svrFunds: ns.format.number(ns.getServerMoneyAvailable(server)),
    svrMaxFunds: ns.getServerMaxMoney(server),
    svrGrowth: ns.format.percent(ns.getServerGrowth(server) / 1000),
    hackGain: ns.format.number(ns.hackAnalyze(server)) * 1000,
    timeToHack: ns.format.time(ns.getHackTime(server)),
    reqHckSkill: ns.getServerRequiredHackingLevel(server),
    srvSec: ns.getServerSecurityLevel(server),
    svrMinSec: ns.getServerMinSecurityLevel(server),
    portsReq: ns.getServerNumPortsRequired(server),
    svrMaxRam: ns.getServerMaxRam(server),
    srvUsedRam: ns.getServerUsedRam(server)
  }))
  let sortedSrv = await QuickSort(ns, serverData)
  ns.ui.clearTerminal()
  for (const srv of sortedSrv) {
    ns.tprint(`
    Server name: ${srv.name}
    Required Hack LVL ${srv.reqHckSkill}
    Security LVL: ${srv.srvSec} / ${srv.svrMinSec} (${ns.format.time(srv.timeToHack)})
    Ports required: ${srv.portsReq}
    Ram: ${srv.srvUsedRam} GBs / ${srv.svrMaxRam} GBs
    Current Funds: \$${srv.svrFunds} / \$${ns.format.number(srv.svrMaxFunds)} (${srv.svrGrowth})
    Potential hack gain: ${srv.hackGain}
    `)
  }
}