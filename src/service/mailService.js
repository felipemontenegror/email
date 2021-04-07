const mailer = require('nodemailer')
module.exports = (email, nome, mensagem, anexo) => {
    const smtp = mailer.createTransport({
        host: 'smtp.hotmail.com',
        port: 587,
        auth: {
            user: 'feliptijuk@hotmail.com', //email pessoal
            pass: 'xxxxx', //senha propria 
        }
    })

    const mail = {
        from: 'feliptijuk@hotmail.com',
        to: email,
        subject: `email enviado por ${nome}`,
        text: mensagem
    }
    if (anexo)
    mail.attachments = []
    mail.attachments.push({
        filename: anexo.originalname,
        content: anexo.buffer
    })

    return new Promise((resolve, reject) => {
        smtp.sendMail(mail)
        .then(response =>  {
            smtp.close()
            return resolve(response)
        })
        .catch(error => {
            smtp.close()
            return reject(error)
        })
    })
}