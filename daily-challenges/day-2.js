// DAILY CHALLENGE 2 — PROMISE CHAIN

function randomDelay() {
    return Math.floor(Math.random() * 2000) + 1000;
}

function stepOne() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 1 complete");
            resolve();
        }, randomDelay());
    });
}

function stepTwo() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 2 complete");
            resolve();
        }, randomDelay());
    });
}

function stepThree() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 3 complete");
            resolve();
        }, randomDelay());
    });
}

console.time("Total execution time");

stepOne()
    .then(() => stepTwo())
    .then(() => stepThree())
    .then(() => {
        console.log("All steps completed!");
    })
    .catch(error => {
        console.error("Something went wrong:", error);
    })
    .finally(() => {
        console.timeEnd("Total execution time");
    });