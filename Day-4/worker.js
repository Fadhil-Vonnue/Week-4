postMessage("HELLO BOSS");
onmessage = (e) => {
    console.log("Message received from main script");
    let numbers = e.data;
    const workerResult = numbers.sort((a, b) => a.id - b.id);
    console.log("Posting message back to main script");
    postMessage(workerResult);
};
