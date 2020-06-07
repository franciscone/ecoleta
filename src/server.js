const express = require("express")
const server = express()

//config pasta publica
server.use(express.static("public"))


//uilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//página inicial
//req é uma requisição/pedido
//res é uma resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos." })
})
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3001)