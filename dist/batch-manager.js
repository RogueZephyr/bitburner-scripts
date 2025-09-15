export async function main(ns) {
    const target = ns.args[0] || "n00dles";
    const batchDelay = 20;
    const spacingMs = 5;
    const jobs = [];
    let batchId = 0;
    const completedJobs = () => jobs.filter((j) => Date.now() > j.finishTime);
    while (true) {
        const hackTime = ns.getHackTime(target);
        const growTime = ns.getGrowTime(target);
        const weakenTime = ns.getWeakenTime(target);
        const baseTime = Date.now();
        const finishTime = baseTime + weakenTime;
        const hackDelay = finishTime - hackTime - spacingMs * 3;
        const weakenDelay1 = finishTime - weakenTime - spacingMs * 2;
        const growDelay = finishTime - growTime - spacingMs * 1;
        const weakenDelay2 = finishTime - weakenTime;
        const batch = [
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
