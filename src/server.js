const express = require('express')
const server = express()
const nunjucks = require("nunjucks")

server.use(express.static("public"))

// Template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Rotas
server.get("/", (req, res) => {
   return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

server.listen(3000)