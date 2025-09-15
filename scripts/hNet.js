/** @param {NS} ns */
export async function main(ns) {
  //Global variables
  const hn = ns.hacknet
  const nodes = hn.numNodes()
  const timer = 10 * 1000

  //@ignore-infinite
  while (true) {
    for (let i = 0; i < nodes; i++) {
      ns.print(`Node server :${i}`)
      const nodeLvlCost = hn.getLevelUpgradeCost(i)
      const nodeRamCost = hn.getRamUpgradeCost(i)
      const nodeCoreCost = hn.getCoreUpgradeCost(i)
      const nodeProduction = hn.getNodeStats(i).totalProduction
      if (nodeProduction > nodeCoreCost) {
        ns.print(`Node ${i} core upgraded!`)
        hn.upgradeCore(i)
      } else if (nodeProduction > nodeLvlCost) {
        ns.print(`Node ${i} level upgraded!`)
        hn.upgradeLevel(i)
      } else if (nodeProduction > nodeRamCost) {
        ns.print(`Node ${i} ram upgraded!`)
        hn.upgradeRam(i)
      } else { ns.print(`No upgrade bought!`) }
    }
    await ns.asleep(timer)
  }
}