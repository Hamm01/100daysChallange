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
    itemName: 'toothpaste',
    category: 'dailyuse',
    price: 100,
    timestamp: 'Wed, 14 Jun 2017'
  },
  {
    itemName: 'pepsi',
    category: 'fruitdrink',
    price: 20,
    timestamp: 'Wed, 13 Jun 2017'
  },
  {
    itemName: 'brush',
    category: 'dailyuse',
    price: 10,
    timestamp: 'Wed, 12 Jun 2017'
  },
  {
    itemName: 'pepsi-lite',
    category: 'fruitdrink',
    price: 20,
    timestamp: 'Wed, 10 Jun 2017'
  },
  {
    itemName: 'cauliflower',
    category: 'vegetabe',
    price: 30,
    timestamp: 'Wed, 13 Jun 2017'
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
      total_price: temp[key]
    }
    finalItemArray.push(temp_obj)
  }

  console.log(finalItemArray)
  return finalItemArray
}

calculateTotalSpentByCategory(items)
