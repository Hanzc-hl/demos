const express = require('express')
const app = express()

app.get('/app2service', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000")
    res.header("Access-Control-Allow-Credentials", true)
    res.json({code: 0, message: 'app2 message'})
})

app.listen('8001', () => {
    console.log('app2 running at port 8001')
})