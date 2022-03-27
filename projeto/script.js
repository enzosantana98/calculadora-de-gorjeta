const
  amont = document.querySelector('.js-amont'),
  total = document.querySelector('.js-total'),
  porcentagemSelecionada = document.querySelectorAll('.js-porcentagem'),
  conta = document.querySelector('.js-conta'),
  pessoas = document.querySelector('.js-pessoas'),
  btnReset = document.querySelector('.js-reset'),
  erro = document.querySelector('.js-mensagemErro'),
  custom = document.querySelector('.js-custom')
;

let 
  porcento,
  customSelec
;

function handleConta() {
  if (porcento != '' && pessoas.value != 0) {
    handleCalc();
  }
}

// Adiciona estilo ao elemento clicado, e armazena a porcentagem selecionada
function handleSelect(e) {
  porcentagemSelecionada.forEach((n) => n.classList.remove('porcentagem-selecionada'));
  custom.classList.remove('custom-selecionado');
  custom.value = '';
  e.target.classList.add('porcentagem-selecionada');
  porcento = parseInt(e.target.value.split('%')) / 100;
  if (conta.value != 0 && pessoas.value != 0) {
    handleCalc();
  }
}

// Botao de porcentagem personalizada
function handleCustom(e) {
  porcentagemSelecionada.forEach((n) => n.classList.remove('porcentagem-selecionada'));
  e.target.classList.add('custom-selecionado');
}

function handleCustomValue(e) {
  porcento = parseFloat(e.target.value) / 100;
  if (pessoas.value >= 1 && e.target.value != '') {
    handleCalc();
  } 
}

// Realiza o calculo da gorjeta
function handleCalc() {
  if (pessoas.value == '0') {
    erro.innerHTML = `Can't be zero`
  } else if(porcento != '' && conta.value != 0 && pessoas.value != '') {
    erro.innerHTML = ''
    const amontExp = parseFloat((conta.value * porcento) / pessoas.value);
    const totalExp = parseFloat((conta.value / pessoas.value) + amontExp);
    amont.innerHTML = `$${amontExp.toFixed(2)}`;
    total.innerHTML = `$${totalExp.toFixed(2)}`;
  }
}

// Faz reset nos valores, estilos e variaveis ja defenidas
function handleReset() {
  porcento = 0;
  conta.value = '';
  pessoas.value = '';
  porcentagemSelecionada.forEach((item) => item.classList.remove('porcentagem-selecionada'));
  custom.classList.remove('custom-selecionado');
  total.innerHTML = '0.00';
  amont.innerHTML = '0.00';
  custom.value = '';
}

conta.addEventListener('keyup', handleConta);

porcentagemSelecionada.forEach((item) => item.addEventListener('click', handleSelect));

custom.addEventListener('click', handleCustom);

custom.addEventListener('keyup', handleCustomValue);

pessoas.addEventListener('keyup', handleCalc);

btnReset.addEventListener('click', handleReset);