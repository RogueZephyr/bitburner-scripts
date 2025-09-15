/** @param {NS} ns */
export async function main(ns) {
  var RealTimeout = setTimeout
  setTimeout = (thing) => RealTimeout(thing, 1)
}