function callsCount(calls){
    let numberCalls = 0;
    calls.forEach(call => {
        numberCalls = numberCalls + call[1];
    });

    return numberCalls;
}

module.exports = callsCount;