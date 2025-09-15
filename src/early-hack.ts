/**
 * Early game hacking script for Bitburner
 * Targets easy servers for money generation
 */

interface NS {
  hack(target: string): Promise<number>;
  grow(target: string): Promise<number>;
  weaken(target: string): Promise<number>;
  getServerSecurityLevel(target: string): number;
  getServerMinSecurityLevel(target: string): number;
  getServerMoneyAvailable(target: string): number;
  getServerMaxMoney(target: string): number;
  sleep(time: number): Promise<true>;
  print(msg: string): void;
}

export async function main(ns: NS): Promise<void> {
  const target = "n00dles";

  while (true) {
    const security = ns.getServerSecurityLevel(target);
    const minSecurity = ns.getServerMinSecurityLevel(target);
    const money = ns.getServerMoneyAvailable(target);
    const maxMoney = ns.getServerMaxMoney(target);

    if (security > minSecurity + 5) {
      ns.print(`Weakening ${target}`);
      await ns.weaken(target);
    } else if (money < maxMoney * 0.75) {
      ns.print(`Growing ${target}`);
      await ns.grow(target);
    } else {
      ns.print(`Hacking ${target}`);
      await ns.hack(target);
    }

    await ns.sleep(100);
  }
}
