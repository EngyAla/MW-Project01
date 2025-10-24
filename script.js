let obj = {
    useName: "Engy",
    age: 20
}

let userJson = JSON.stringify(obj); // convert object into json
console.log(userJson) 

console.log(JSON.parse(userJson))

// Q: ليه ال server ميستخدمش js object علي طول بدون التحويل الي json

//////////////////////////////////////////////////////

// Synchronous and Asynchronous in JS

console.log("One"); 
console.log("Two");
// alert("Hi");  // Block Thread => Synchronous | JS is Single Thread  
console.log("Three");

// call stack 01
console.log("One"); 

// call stack 02
console.log("Two");

// call stack 03  => send it to web API then to the stack but stack must be empty
// even if setTimeout has no time
setTimeout(() =>{
    console.log("Hi")  // Non- Block  
}, 0)

// call stack 04
console.log("Three");



function One(){
    console.log("one")
}

function Two(){
    One()
    console.log("one")
}

function Three(){
    Two()
    console.log("one")
}

Three();  // first calling function  and stored in Stack then we call tow the one

// => stack LIFO

    // ONE
    // TWO
    // THREE

// => ONE is last in ant it will be first out then two then three


let request = new XMLHttpRequest();
// console.log(request); // object  |  readyState: 0 | status: 0

request.open('GET', 'https://jsonplaceholder.typicode.com/todos');
request.send();

console.log(request)  //  readyState: 4 | status: 200

request.onreadystatechange = () =>{
    console.log(request.readyState)
    console.log(request.status)
    if(request.readyState === 4 && request.status === 200){
        // console.log(request.responseText)
        console.log(JSON.parse(request.responseText))        
    }
}


// status:- 
// Informational responses (100 – 199)
// Successful responses (200 – 299)  * 200 
// Redirection messages (300 – 399)
// Client error responses (400 – 499)  * 404  => front end errors
// Server error responses (500 – 599)  * 500  => back end errors

// readyState:-	Holds the status of the XMLHttpRequest.
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready



////////////////////////////////////////////////////////////////////////

function callBackFn(){
    console.log("call back fun")
}
setTimeout(callBackFn, 200)

// callBackFn in callBackFn  ===> callBack hell => pyradim of dom شكل هرمي
// صعوبه القراءه والتعديلل
// setTimeout(() =>{
//     console.log("task 1");
//     setTimeout(() =>{
//         console.log("task 2")
//             setTimeout(() =>{
//             console.log("task 3")
//                 setTimeout(() =>{
//                 console.log("task 4")
//             }, 2000)
//         }, 2000)
//     }, 2000)
// }, 2000)

// ألحل => promise

/* 
Promise Intro And Syntax
    --Promise In JavaScript Is Like Promise In Real Life
    --Promise Is Something That Will Happen In The Future
    --Promise Avoid Callback Hell
    --Promise Is The Object That Represent The Status Of An Asynchronous Operation

Promise Status

    --Pending: Initial State
    --Fulfilled: Completed Successfully
    --Rejected: Failed

Story

    --Once A Promise Has Been Called, It Will Start In A Pending State
    --The Created Promise Will Eventually End In A Resolved State Or In A Rejected
    --Calling The Callback Functions (Passed To Then And Catch) Upon Finishing.

Then
    --Takes 2 Optional Arguments [Callback For Success Or Failure] chain 
*/


// Promise(callback(resolveFn, rejectFn))

let myPromise = new Promise((resolveFn, rejectFn) => {  // (resolve: (value: any) => void, reject: (reason?: any) => void)
    // let connectToDatabase = false; // Uncaught (in promise) faild to connect
    let connectToDatabase = true; // Promise {<fulfilled>: 'connected'}
    if(connectToDatabase){
        resolveFn("connected")
    } else{
        rejectFn("faild to connect")
    }
}).then(
    (resolvedValue) => {console.log(`Good, ${resolvedValue}`)}, // Promise resolved then call first callback in .then
    (rejectedValue) => {console.log(`Bad, ${rejectedValue}`)}  // Promise rejected then call second callback in .then
)

console.log(myPromise);


/////////


let promise = new Promise((resolveFn, rejectFn) =>{
    // let employees = [];
    let employees = ["osama", "ali", "alaa", "ahmed"]
    if(employees.length === 4){
        resolveFn(employees)
    } else{
        rejectFn(Error("No one come"))
    }
})
.then(
    (resolvedValue) => {
        return resolvedValue.slice(0, 3)
    }
)
.then(
    (resolvedValue) => {
        return resolvedValue.slice(0, 2)
    }
)
.then(
    (resolvedValue) => {console.log(resolvedValue)},
)
.catch((err) => console.log(err))
.finally(() => console.log("done"))

//////

const getData1 = (apiLink) =>{
    return new Promise((resolvedFn, rejectFn) =>{
        let req = new XMLHttpRequest();
        req.onload = () =>{
            if(req.status === 200 && req.readyState === 4){
                resolvedFn(JSON.parse(req.responseText))
            } else{
                rejectFn(Error("somting went wrong"))
            }
        }
        req.open('GET', apiLink)
        req.send()
    })
}

getData1('https://jsonplaceholder.typicode.com/todos')
.then((data) => console.log(data.slice(0, 5)))


/////

fetch('https://jsonplaceholder.typicode.com/todos')
.then((res) => res.json())
.then((data) => data.slice(0, 10))
.then((data) => data.slice(0, 5))
.then((data) => console.log(data.slice(0, 3)))

//////

/*
    Promise
        All
        All Settled
        Rase
*/

let myPromiseFirst = new Promise((resolveFn, rejectFn) => { 
    setTimeout(() =>{
        resolveFn("pro 1")
    }, 5000)
})

let myPromiseSec = new Promise((resolveFn, rejectFn) => { 
    setTimeout(() =>{
        rejectFn("pro 2")
    }, 3000)
})

let myPromiseThird = new Promise((resolveFn, rejectFn) => { 
    setTimeout(() =>{
        rejectFn("pro 3")
    }, 2000)
})

// if all resolved :- all() will return all Promise
// if one is rejected :- all() will return reject Promise
// if one or more is rejected :- all() will return first reject Promise


Promise.all([myPromiseFirst, myPromiseSec, myPromiseThird])
    .then((resolvedValue) =>{
        console.log("Promise.all", resolvedValue)
    }, 
    (rejectedValue) =>{
        console.log("Promise.all", rejectedValue)
    }
)

// allSettled => return all promises with its status
Promise.allSettled([myPromiseFirst, myPromiseSec, myPromiseThird])
    .then((resolvedValue) =>{
        console.log("Promise.allSettled", resolvedValue)
    }, 
    (rejectedValue) =>{
        console.log("Promise.allSettled", rejectedValue)
    }
)

// race => return least time
Promise.race([myPromiseFirst, myPromiseSec, myPromiseThird])
    .then((resolvedValue) =>{
        console.log("Promise.race", resolvedValue)
    }, 
    (rejectedValue) =>{
        console.log("Promise.race", rejectedValue)
    }
)

/////////////////////


function getData(){
    return new Promise((resolveFn, rejectFn) =>{
        let users = [];
        if(users.length > 0){
            resolveFn("Data fount")
        } else{
            rejectFn("No Data found")
        }
    })
}

getData().then(
    (resolvedValue) => console.log(resolvedValue),
    (rejectedValue) => console.log(rejectedValue)
)

// we will use async instead of using return new Promise
// async return promise withount write return new Promise

async function getData3(){
        let users = [];
        if(users.length > 0){
            return ("Data fount")
        } else{
            return ("No Data found")
        }
}

getData3().then(
    (resolvedValue) => console.log(resolvedValue),
    (rejectedValue) => console.log(rejectedValue)
)


/*
    Await

*/


let myPromise3 = new Promise((resolveFn, rejectFn) => { 
    setTimeout(() =>{
        resolveFn("await pro 3")
    }, 2000)
})

async function readData (){
    console.log("Before promise")
    // myPromise3.then(val => console.log(val)) // After will printed first
    console.log(await myPromise3)  // مش هيطبع After غير بعد هذا السطر
    console.log("After promise")
}

readData()

// second commit
// adedddddd