/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function sum(start, end) {
  let startTime = Date.now()
  let sum = 0
  for (let i = start; i < end; i++) {
    sum += i
  }
  let totalTime = Date.now() - startTime + ' ms'

  return totalTime
}

console.log('Total execution time is : ' + sum(1, 1000000))
console.log('Total execution time is : ' + sum(1, 10000))
console.log('Total execution time is : ' + sum(1, 100000000))
