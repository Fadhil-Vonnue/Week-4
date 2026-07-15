const myWorker = new Worker("worker.js");
const div = document.createElement("div");
div.textContent = `I AM RENDERING`;
document.body.appendChild(div);
const unsortedArray = [];
for (let i = 5000000; i > 0; i--)
    unsortedArray.push({ id: i, name: `name${i}` });
myWorker.postMessage(unsortedArray);
console.log("Message posted to worker");
myWorker.onmessage = (e) => {
    console.log(e.data);
};
const workerResult = unsortedArray.sort((a, b) => a.id - b.id);
console.log(workerResult);
const div1 = document.createElement("div");
div1.textContent = `I AM RENDERING SECOND TIME`;
document.body.appendChild(div1);
