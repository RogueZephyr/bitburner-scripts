/** @param {NS} ns */
export async function main(ns) {
  // @ignore-infinite
  while (true) {
    await ns.weaken(ns.args[0])
  }
}