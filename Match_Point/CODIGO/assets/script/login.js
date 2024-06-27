function logar() {
  var pegaUsuario = document.getElementById('usuario').value;
  var pegaSenha = document.getElementById('senha').value;
  let validaLogin = false;

  // Obter os dados do localStorage
  var armazenadoItens = JSON.parse(localStorage.getItem("login"));

  // Verificar se os dados do usuário estão corretos
  for (let i = 0; i < armazenadoItens.length; i++) {
    if (pegaUsuario === armazenadoItens[i].nome && pegaSenha === armazenadoItens[i].senha) {
      validaLogin = true;
      break;
    }
  }

  if (validaLogin = true) {
    alert("sucesso");
    location.href = 'index.html';
  } else {
    alert("Usuário ou senha incorreta");
  }
}