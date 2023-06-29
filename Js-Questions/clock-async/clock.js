// you create a clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

// HH:MM::SS (Eg. 13:45:23)

/* To solve this problem we need to update the function every 1 sec and 
we need the getHours() and getMinutes() and getSeconds() 
these all are methods which date instance have inside , we will use them
*/

function clock() {
  let date = new Date()
  let displayTime =
    date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds()
  console.clear()
  console.log(displayTime)
}

setInterval(clock, 1000)
