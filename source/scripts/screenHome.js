function HomePage(){
var formulario = document.createElement('form');
formulario.id = 'meuFormulario';

var labelNome = document.createElement('label');
labelNome.textContent = 'Nome:';
formulario.appendChild(labelNome);

var inputNome = document.createElement('input');
inputNome.type = 'text';
inputNome.id = 'nome';
inputNome.name = 'nome';
inputNome.required = true;
formulario.appendChild(inputNome);
formulario.appendChild(document.createElement('br'));

var labelEmail = document.createElement('label');
labelEmail.textContent = 'E-mail:';
formulario.appendChild(labelEmail);

var inputEmail = document.createElement('input');
inputEmail.type = 'email';
inputEmail.id = 'email';
inputEmail.name = 'email';
inputEmail.required = true;
formulario.appendChild(inputEmail);
formulario.appendChild(document.createElement('br'));

var labelMensagem = document.createElement('label');
labelMensagem.textContent = 'Mensagem:';
formulario.appendChild(labelMensagem);

var textareaMensagem = document.createElement('textarea');
textareaMensagem.id = 'mensagem';
textareaMensagem.name = 'mensagem';
textareaMensagem.rows = '4';
textareaMensagem.required = true;
formulario.appendChild(textareaMensagem);
formulario.appendChild(document.createElement('br'));

var botaoEnviar = document.createElement('button');
botaoEnviar.type = 'submit';
botaoEnviar.textContent = 'Enviar';
formulario.appendChild(botaoEnviar);


document.body.appendChild(formulario);

}
 HomePage();