let express = require('express')
let bodyParser = require('body-parser')

const app = express()
const port = 3000
app.use(bodyParser.json())
let todoArray = []

function createTodo(req, res) {
  const todo = {
    id: Math.floor(Math.random() * 100),
    title: req.body.title,
    description: req.body.description,
    completed: false
  }
  todoArray.push(todo)
  const message = {
    id: todo.id
  }
  res.status(201).send(message)
}

app.post('/todos', createTodo)

function retreiveTodo(req, res) {
  res.send(todoArray)
}

app.get('/todos', retreiveTodo)

function retreiveWithId(req, res) {
  const id = parseInt(req.params.id)
  const findTodo = todoArray.find(element => element.id === id)
  if (!findTodo) {
    res.status(401).send('Not found!!')
  } else {
    res.send(findTodo)
  }
}

app.get('/todos/:id', retreiveWithId)

function updateWithId(req, res) {
  const id = parseInt(req.params.id)
  const todoPresent = todoArray.some(element => element.id === id)

  if (todoPresent) {
    todoArray = todoArray.map(element => {
      if (element.id === id) {
        element.title = req.body.title
        element.description = req.body.description
      }
      return element
    })
    res.status(200).send('ID found and Todo updated')
  } else {
    res.status(404).send('ID not found!!')
  }
}

app.put('/todos/:id', updateWithId)

function deleteWithId(req, res) {
  const id = parseInt(req.params.id)
  const todoPresent = todoArray.some(element => element.id === id)
  if (todoPresent) {
    todoArray = todoArray.filter(element => element.id !== id)
    res.status(200).send('ID found and Todo deleted')
  } else {
    res.status(404).send('ID not found!!')
  }
}

app.delete('/todos/:id', deleteWithId)
app.listen(port, message)

function message() {
  console.log(`App server created at ${port}`)
}
/*

    {
        "title": "Btry some pickles",
        "description": "great emphasis on essays"
    }
    {
        "title": "Great with maths",
        "description": "Good in math is not in optrion"
    }
    {
        "title": "trait of sympahties",
        "description": "you must be forgiveer"
    }

*/
