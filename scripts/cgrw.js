/** @param {NS} ns */
export async function main(ns) {
  // @ignore-infinite
  while (true) {
    await ns.grow(ns.args[0])
  }
}