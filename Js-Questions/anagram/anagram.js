/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  let charMap1 = stringCharmap(str1)
  let charMap2 = stringCharmap(str2)
  if (Object.keys(charMap1).length !== Object.keys(charMap2).length) {
    return false
  }

  for (let char in charMap1) {
    if (charMap1[char] !== charMap2[char]) {
      return false
    }
  }
  return true
}

function stringCharmap(str) {
  let charMap = {}
  for (let char of str.toLowerCase()) {
    charMap[char] = charMap[char] + 1 || 1
  }
  return charMap
}

// const bool = isAnagram('Elite', 'eeistl')
// console.log(bool)

module.exports = isAnagram

/*
Anagram Easy method

function isAnagram(str1, str2) {

  return cleanString(str1) === cleanString(str2)
}

function cleanString(str) {
  return str.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('')
 
    // 1. replace method /[^\w]/g meant by any character other then [a-z,A-Z,0-9] replacing with empty string
    // 2. then the cleanstring to lowercase characters
    // 3. split converts string to array
    // 4. sorting the character array
    // 5. Joining the array again into string
  
}

*/
