/** @param {NS} ns */
export async function QuickSort(ns, serverArray) {
  // Function to sort servers by funds in descending order
  return [...serverArray].sort((a, b) => {
    return a.svrMaxFunds - b.svrMaxFunds
  });
}
