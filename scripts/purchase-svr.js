/** @param {NS} ns */
export async function main(ns) {
  //TODO 
  //refactor the purchaseServer to use the index of the desired object so that the user can see the amount
  // and price before choosing an item

  const choices = {
    ramChoices: [],
    ramCap: [],
    ramPrice: []
  }
  for (let i = 1; i < 21; i++) {
    const ramNum = 2 ** i
    const ramCost = ns.format.number(ns.getPurchasedServerCost(ramNum))
    const costPerRam = `-[${i}]- Ram: ${ramNum} GBs | Cost: \$${ramCost}`
    choices.ramCap.push(ramNum)
    choices.ramPrice.push(ramCost)
    choices.ramChoices.push(costPerRam)
  }
  const srvChoice = await ns.prompt(`How much would you like to buy?`, { type: "select", choices: choices.ramCap })
  const answer = await ns.prompt(`Are you sure you want ${ns.format.number(srvChoice)} GBs of Ram?`, { type: "boolean" })
  if (answer) {
    const countSrv = [1, 5, 10, 15, 20, 25]
    const count = await ns.prompt(`Input Server amount here: `, { type: "select", choices: countSrv })
    let srvName = 0;
    for (let i = 0; i < count; i++) {
      ns.purchaseServer(`psrv-${srvName}`, srvChoice)
      srvName++
    }
    ns.toast(`
    Server purchased! 
    ${srvChoice} Ram
    ${srvName} Servers
    `)
  } else { ns.toast(`Server purchase canceled`) }
}