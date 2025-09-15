/**
 * Batch hacking manager for Bitburner
 * Coordinates HWGW (Hack, Weaken, Grow, Weaken) batches for optimal income
 */

interface NS {
  hack(target: string, opts?: { threads?: number }): Promise<number>;
  grow(target: string, opts?: { threads?: number }): Promise<number>;
  weaken(target: string, opts?: { threads?: number }): Promise<number>;
  sleep(time: number): Promise<true>;
  getWeakenTime(target: string): number;
  getGrowTime(target: string): number;
  getHackTime(target: string): number;
  print(msg: string): void;
  getServerMaxRam(hostname: string): number;
  getServerUsedRam(hostname: string): number;
  args: (string | number | boolean)[];
}

interface BatchJob {
  type: "hack" | "grow" | "weaken";
  target: string;
  threads: number;
  delay: number;
  finishTime: number;
}

export async function main(ns: NS): Promise<void> {
  const target = (ns.args[0] as string) || "n00dles";
  const batchDelay = 20; // ms between batches
  const spacingMs = 5; // ms between operations in a batch

  const jobs: BatchJob[] = [];
  let batchId = 0;

  // Track completed jobs for monitoring
  const completedJobs = () => jobs.filter((j) => Date.now() > j.finishTime);

  while (true) {
    const hackTime = ns.getHackTime(target);
    const growTime = ns.getGrowTime(target);
    const weakenTime = ns.getWeakenTime(target);

    // Calculate timing for HWGW batch
    const baseTime = Date.now();
    const finishTime = baseTime + weakenTime;

    const hackDelay = finishTime - hackTime - spacingMs * 3;
    const weakenDelay1 = finishTime - weakenTime - spacingMs * 2;
    const growDelay = finishTime - growTime - spacingMs * 1;
    const weakenDelay2 = finishTime - weakenTime;

    // Create batch jobs
    const batch: BatchJob[] = [
      {
        type: "hack",
        target,
        threads: 1,
        delay: hackDelay,
        finishTime: finishTime - spacingMs * 3,
      },
      {
        type: "weaken",
        target,
        threads: 1,
        delay: weakenDelay1,
        finishTime: finishTime - spacingMs * 2,
      },
      {
        type: "grow",
        target,
        threads: 1,
        delay: growDelay,
        finishTime: finishTime - spacingMs * 1,
      },
      {
        type: "weaken",
        target,
        threads: 1,
        delay: weakenDelay2,
        finishTime: finishTime,
      },
    ];

    ns.print(`Batch ${batchId}: Starting HWGW sequence for ${target}`);
    ns.print(`Completed jobs: ${completedJobs().length}`);

    // Execute the batch (simplified - in real implementation would use exec())
    for (const job of batch) {
      if (job.delay > 0) {
        await ns.sleep(job.delay);
      }

      switch (job.type) {
        case "hack":
          await ns.hack(job.target);
          break;
        case "grow":
          await ns.grow(job.target);
          break;
        case "weaken":
          await ns.weaken(job.target);
          break;
      }
    }

    batchId++;
    await ns.sleep(batchDelay);
  }
}
