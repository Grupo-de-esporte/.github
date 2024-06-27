function logar() {
  var pegaUsuario = document.getElementById('usuario').value;
  var pegaSenha = document.getElementById('senha').value;
  let validaLogin = false;

  // Obter os dados do localStorage
  var armazenadoItens = JSON.parse(localStorage.getItem("login"));

  // Verificar se os dados do usuário estão corretos
  for (let i = 0; i < armazenadoItens.contatos.length; i++) {
    if (pegaUsuario === armazenadoItens.contatos[i].nome && pegaSenha === armazenadoItens.contatos[i].senha) {
      validaLogin = true;
      break;
    }
  }

  if (validaLogin) {
    alert("Login bem-sucedido");
    location.href = 'HomePage.html';
  } else {
    alert("Usuário ou senha incorreta");
  }
}
