// main.js
 
wasmWorker("./calculator.wasm").then((wasmProxyInstance) => {
    wasmProxyInstance.add(2, 3)
        .then((result) => {
            console.log(result); // 5
        })
        .catch((error) => {
            console.error(error);
        });
 
    wasmProxyInstance.divide(100, 10)
        .then((result) => {
            console.log(result); // 10
        })
        .catch((error) => {
            console.error(error);
        });
});
