import { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {

const [campos, setcampos] = useState({
  nome: '',
  email: '',
  mensagem: '',
  anexo: ''
})

function handleInputChange(event){
  if (event.target.name === 'anexo')
    campos[event.target.name] = event.target.files[0]
  else
    campos[event.target.name] = event.target.value
  setcampos(campos)
}

function handleFormSubmit(event) {
  event.preventDefault()
  console.log(campos)
  send()
}

function send() {
  const formData = new FormData()
  Object.keys(campos).forEach(key => formData.append(key, campos[key] ))
  axios.post('/send', formData, {
    headers: {
      'content-type': `multipart/form-data;boundary=${formData._boundary}`
    }
  })
  .then(response => alert(response.data))
}



  return (
    <div className="container">

      <form onSubmit={handleFormSubmit}>
        <label htmlfor="email">E-mail</label>
        <input type="text" id="email" name="email" placeholder="Digite o email de destino..." onChange={handleInputChange} />

        <label htmlfor="nome">Nome</label>
        <input type="text" id="nome" name="nome" placeholder="Digite seu nome..." onChange={handleInputChange} />

        <label htmlfor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" placeholder="digite sua mensagem..." onChange={handleInputChange} ></textarea>

        <label htmlfor="anexo">Anexo</label>
        <input type="file" id="anexo" name="anexo" onChange={handleInputChange} />

        <input type="submit" value="enviar" />
      </form>

    </div>
  );
}

export default App;
