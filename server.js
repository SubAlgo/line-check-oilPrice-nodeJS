const express = require('express')
const app = express()

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.json({
    message: 'OK'
  })
})
let hello = (req, res, next)=> {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}

//app.get('*', (req, res) => {
//  res.json({
//    message: 'Error'
//  })
//})

app.use('/hello', hello);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})


