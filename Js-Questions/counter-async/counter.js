// Create a counter in JavaScript
// try to code a counter in Javascript It should go up as time goes by in intervals of 1 second
let counter = 1

function callBack() {
  console.clear()
  console.log(counter++)
}

setInterval(callBack, 1000)
