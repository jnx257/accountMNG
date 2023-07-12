const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const cors = require('cors')


app.use(cors())
app.use(express.json())
//mongoose conextion
const conn = require('./db/conn')
conn()

app.listen(PORT => {
console.log(`listening on ${port}`)
})


