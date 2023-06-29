/*
 Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

function delay1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved at 1sec')
    }, 1000)
  })
}

function delay2() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved at 2sec')
    }, 2000)
  })
}

function delay3() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved at 3sec')
    }, 3000)
  })
}

// To wait for all three promises to resolve using Promise.all and print the time it took for all promises to resolve, you can use the following function:

// promise.all run all the promises in parllel, which meant by if one of it fails , the promise.all
// will throw error, and what ever be the maximum time taken by the promise, so that
// total time will be taken . in our case it is 3 sec

function waitForPromises() {
  const start = Date.now()
  Promise.all([delay1(), delay2(), delay3()]).then(str => {
    console.log(str) // this will print array of resolved data respectivly by each promise
    const end = Date.now()
    const totalTime = end - start
    console.log(`Total time taken ${totalTime} milliseconds.`)
  })
}

waitForPromises()
