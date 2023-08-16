import { Component } from 'react';
import './App.css';

const endereco_servidor = "https://mensagem-nodejs-vercel.vercel.app";

class FrmMensagem extends Component {

  // Construtor
  constructor(props) {
    super(props);

    // Estados inciais das variáveis do formulário
    this.state = {
      mensagemAnterior: '',
      mensagem: '',
      resposta: ''
    };
  }

  // Atualiza o estado das variáveis do formulário
  handleInputChange = (event) => {
    // Recupera o nome e o valor do campo do evento
    const { name, value } = event.target;
    // Atualiza o estado
    this.setState({ [name]: value });
  };

  // Evento da submissão do formulário 
  handleSubmit = (event) => {
    // Impede o recarregamento da página
    event.preventDefault();

    //Recupera e atualiza a mensagem anterior antes de enviar a nova mensagem
    fetch(`${endereco_servidor}/mensagem`)
      .then((response) => response.json()) //Converte a resposta para JSON
      .then((data) => { //Recupera a resposta
        this.setState({ mensagemAnterior: data.mensagem }); // Atribui a resposta ao estado
      });

    // Recupera o valor da mensagem
    const { mensagem } = this.state;
    // Envia a mensagem nova para o servidor
    fetch(`${endereco_servidor}/mensagempath/${mensagem}`)
      .then((response) => response.json()) //Converte a resposta para JSON
      .then((data) => { //Recupera a resposta
        this.setState({ resposta: data.mensagem }); // Atribui a resposta ao estado
      });
  };

  // Limpa os campos do formulário.     
  limpar = () => {
    this.setState({
      mensagemAnterior: '',
      mensagem: '',
      resposta: ''
    });
  };

  // Renderiza o formulário
  render() {
    return (
      <form name="FrmMensagem" method="get" onSubmit={this.handleSubmit}>
        <label><h1>Formulário Mensagem</h1> </label>
        <label>Mensagem anterior: {this.state.mensagemAnterior} </label><br /><br />
        <label>Nova mensagem:
          <input type="text" name="mensagem" value={this.state.mensagem} onChange={this.handleInputChange} />
        </label><br />
        <input type="button" name="Limpar" value="Limpar" onClick={this.limpar} />
        <input type="submit" name="Enviar" value="Enviar" /><br /><br />
        <label>Resposta: {this.state.resposta} </label>
      </form>
    )
  }
}

export default FrmMensagem;