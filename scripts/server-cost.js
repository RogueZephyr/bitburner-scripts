/** @param {NS} ns */
export async function main(ns) {
  ns.print(`--- SERVER LIST ---`)
  for (let i = 1; i < 21; i++) {
    const server_Ram = 2 ** i
    const server_Price = ns.format.number(ns.getPurchasedServerCost(server_Ram))
    ns.print(`-[${i}]- RAM: ${server_Ram} GBs | COST: \$${server_Price}`)
  }
  ns.ui.openTail()
}
