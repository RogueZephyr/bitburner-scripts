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
export declare function main(ns: NS): Promise<void>;
export {};
//# sourceMappingURL=early-hack.d.ts.map
