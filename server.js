const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 3000
var cors = require('cors')


const app = express()

// init Middleware tratamento de requisição
app.use(cors())
app.use(express.json())

const upload = require('multer')()

app.post('/send', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome
    const email = req.body.email
    const mensagem = req.body.mensagem
    const anexo = req.file

    require('./src/service/mailService')(email, nome, mensagem, anexo)
    .then(response => res.json(response))
    .catch(error => res.status(500).json(error))

})

app.use(express.static(path.join(__dirname, 'build')))

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})