/*
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```
*/
/*
how to solve
1. reading the file content 
2. then processing the content "means remvoing the space"
3. then writing this processed data back to file
*/

const fs = require('fs')

fs.readFile('fd.txt', 'utf-8', readContent)

function readContent(err, data) {
  if (err) {
    console.error(err)
    return
  }

  cleandata(data) // we will process the data to remove the spaces
}

function cleandata(data) {
  // we need to write the regex for the removing extra spaces

  const str = data.replace(/(?<=[\s])[\s]/g, '')

  /*
   replace is method for string to replace the part of our string with the result we need. 
   
    so /(?<=[\s])[\s]/g is our regex so first understand what is (?<=[\s])
   This mean by we are selecting first space in our received data take eg data. "Real     are better than coke"
   where we selecting the spaces if we have ahead more spaces after 1st space so [\s] after (?<=[\s]) meant by we are 
   selecting all the spaces after first space and 
   we are converting all the further spaces into empty string using replace method
   g is global modifier meant which signifies in our string there are occurences of spaces after each word we
   we need to select each of that group occurences
  */

  writeFile(str) // passing our cleaned string into write file function
}

function writeFile(processedString) {
  // we are writing our file with processedString
  fs.writeFile('fd.txt', processedString, 'utf-8', contentAfterupdating)
}

function contentAfterupdating(err) {
  if (err) {
    console.error(err)
  }
  console.log('Succefully written the file')
}
