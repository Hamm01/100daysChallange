// Reading the contents of a file

const fs = require('fs')

fs.readFile('fd.txt', 'utf-8', callback)

function callback(err, data) {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
}

for (let i = 0; i < 100000000; i++) {
  /* 
  This is the exppensive opreation , which mean by
  line by line when this js executes, the fs.readfile will lead to async task
  and it goes to webapi stack for processing the file, meanwhile our program flow will not stop
  it will continue to execute and when pointer comes to for loop , it will perform this expensive
  task as because running from 0 to 100000000 so it is expensive take some time to execute meanwhile
  our main thread of program will be blocked and we cannot execute further our code until this
  loop completed or terminated. as soon in between when our aync task completed , so it will throws the
  callback function output to callback Queue, and as soon our loop completed meant by our main thread is 
  free then callback queue will provide that output to main thread to perform the task
  */
}
