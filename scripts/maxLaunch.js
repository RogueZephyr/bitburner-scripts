/** @param {NS} ns */
export async function main(ns) {
  const host = ns.args[0]
  const script = "attack_v1.js"
  const hostRam = ns.getServerMaxRam(host)
  const scriptRam = ns.getScriptRam(script)
  const threads = Math.floor(hostRam / scriptRam)

  ns.tprint(`Starting ${threads} threads of ${script}`)

  ns.exec(script, host, threads, ns.args[1])
}