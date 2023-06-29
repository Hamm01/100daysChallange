/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function delay(milliseconds) {
  return new Promise(resolve => {
    const startTime = Date.now()
    while (Date.now() - startTime < milliseconds) {
      // Busy-waiting
    }
    resolve()
  })
}
console.log('start')

delay(2000).then(() => {
  console.log('After 2 seconds')
})

console.log('End is printing after 2 sec gap')
