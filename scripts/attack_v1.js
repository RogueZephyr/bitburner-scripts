/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const minSec = ns.getServerMinSecurityLevel(target) + 2;
  const maxMoney = ns.getServerMaxMoney(target) * 0.9;

  while (true) {
    if (ns.getServerSecurityLevel(target) > minSec) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < maxMoney) {
      await ns.grow(target);
    } else {await ns.hack(target);}
  }
}