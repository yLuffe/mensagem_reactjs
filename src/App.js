import { Component } from 'react';
import './App.css';

class FrmMensagem extends Component {
  constructor(props) { // Construtor
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
    this.setState({ [name]: value }); // Atualiza o estado
  };

  // Evento da submissão do formulário
  handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    //Recupera e atualiza a mensagem anterior antes de
    //enviar a nova mensagem
    fetch(`http://localhost:8080/mensagem`)
      .then((response) => response.json()) //Converte para JSON
      .then((data) => { //Recupera a resposta
        this.setState({ mensagemAnterior: data.mensagem });
      });

    const { mensagem } = this.state; // Recupera o valor da mensagem
    // Envia a mensagem nova para o servidor
    fetch(`http://localhost:8080/mensagempath/${mensagem}`)
      .then((response) => response.json()) //Converte para JSON
      .then((data) => { //Recupera a resposta
        this.setState({ resposta: data.mensagem });
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

  render() {// Renderiza o formulário
    return (
      <form name="FrmMensagem" method="get"
        onSubmit={this.handleSubmit}>
        <label><h1>Formulário Mensagem</h1> </label>
        <label>Mensagem anterior: {this.state.mensagemAnterior}
        </label><br /><br />
        <label>Nova mensagem:
          <input type="text" name="mensagem"
            value={this.state.mensagem}
            onChange={this.handleInputChange} />
        </label><br />
        <input type="button" name="Limpar"
          value="Limpar" onClick={this.limpar} />
        <input type="submit" name="Enviar"
          value="Enviar" /><br /><br />
        <label>Resposta: {this.state.resposta} </label>
      </form>
    )
  }
}
export default FrmMensagem;