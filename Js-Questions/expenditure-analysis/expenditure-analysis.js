/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

const items = [
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza'
  }
]

function calculateTotalSpentByCategory(itemsArray) {
  let temp = {}
  let finalItemArray = []

  itemsArray.forEach(item => {
    let currentPrice = item.price

    if (temp[item.category]) {
      // this condition check whether our temp object with key "item.category" already have some
      // amount or not. if this property exist with some price then we will add the current price
      // otherwise it temp[item.category] will intializes with currentPrice
      temp[item.category] = temp[item.category] + currentPrice
    } else {
      temp[item.category] = currentPrice
    }
  })

  for (let key in temp) {
    var temp_obj = {
      category: key,
      totalSpent: temp[key]
    }
    finalItemArray.push(temp_obj)
  }

  //   console.log(finalItemArray)
  return finalItemArray
}

module.exports = calculateTotalSpentByCategory
