// --------------------------- USING FETCH API ---------------------------
fetch('https://readerapi.codepolitan.com/articles')
.then(function (response) {
    if (response.status !== 200) {
        console.log('Error : ' + response.status)
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response) // AFTER ADDING THIS YOU CAN ADD MORE THEN
})
.then((response) => {
    return response.json(response)
})
.then((data) => {
    console.log(data);
})
.catch(function(error) {
    console.log('Error : ' + error)
});