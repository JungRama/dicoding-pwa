let setName = function (name) {
    return new Promise((resolve, reject) => {
        if(name === "" || name === undefined || name == null){
            reject("Name is required")
        }else{
            resolve(name)
        }
    })
}

let setAge = function (age) {
    return `Your age is ${age}`
}

/* ------------------------------ CALL PROMISES ----------------------------- */
setName("Adi B")
    .then((resName) => {
        console.log(`Your name is ${resName}`)
    })
    .then((resAge) => {
        let age = setAge(19)
        console.log(age)
    })
    .catch((err) => {
        console.log(err)
    })

/* ------------------------------- PROMISE ALL ------------------------------ */
let promises = Promise.all([
    setName("Ahmad"),
    setName("Maria"),
    setName("Muldoko")
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
])

/* --------------------------- CALL PROMISE ALL -------------------------- */
promises // CALL FROM VARIABLE PROMISES
    .then((result) => {
        return result
    }).catch((err) => {
        return err
    });