
const input = document.querySelector("input");
const findRg = /^((([0-9]{2}).([0-9]{3}).([0-9]{3})\/([0-9]{4})-([0-9]{2}))|([0-9]{14}))$/;

input.addEventListener('keyup', (e) => {

  validCnpj(input.value);

  switch (e.target.value.length) {

    case 2:
      input.value += '.';
      break;

    case 6:
      input.value += '.';
      break;

    case 10:
      input.value += '/';
      break;

    case 15:
      input.value += '-';
      break;
  };
})

const validCnpj = (cnpj) => {

  const isValid = findRg.exec(cnpj);

  if (isValid) {
    const complete = `${isValid[3] + isValid[4] + isValid[5] + isValid[6] + isValid[7]}`;
    findCnpj(complete);
  } else {
    if (document.querySelector("ul")) {
      document.querySelector("ul").remove();
    }
  }
}

const findCnpj = async (cnpj) => {
  const response = await fetch(`https://receitaws.com.br/v1/cnpj/${cnpj}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  })

  const data = await response.json();
  const ul = document.createElement("ul");

  const list = `
  <li><strong>Abertura:</strong> ${data.abertura}</li>
  <li><strong>Atividade 1:</strong> ${data.atividade_principal.map(item => `<p><strong>code:</strong> ${item.code} <strong>principal:</strong> ${item.text}</p>`)}</li>
  <li><strong>Atividade 2:</strong> ${data.atividades_secundarias.map(item => `<p><strong>code:</strong> ${item.code} <strong>secundaria:</strong> ${item.text}</p>`)}</li>
  <li><strong>Bairro:</strong> ${data.bairro}</li>
  <li><strong>Billing:</strong> ${data.billing.free, data.billing.database}</li>
  <li><strong>Capital:</strong> ${data.capital_social}</li>
  <li><strong>Cep:</strong> ${data.cep}</li>
  <li><strong>Cnpj:</strong> ${data.cnpj}</li>
  <li><strong>Complemento:</strong> ${data.complemento}</li>
  <li><strong>Data:</strong> ${data.data_situacao}</li>
  <li><strong>Data:</strong> ${data.data_situacao_especial}</li>
  <li><strong>Efr:</strong> ${data.efr}</li>
  <li><strong>Email: </strong>${data.email}</li>
  <li><strong>Fantasia:</strong> ${data.fantasia}</li>
  <li><strong>Logradouro:</strong> ${data.logradouro}</li>
  <li><strong>Motivo:</strong> ${data.motivo_situacao}</li>
  <li><strong>Municipio:</strong> ${data.municipio}</li>
  <li><strong>Natureza:</strong> ${data.natureza_juridica}</li>
  <li><strong>Nome:</strong> ${data.nome}</li>
  <li><strong>Numero: </strong>${data.numero}</li>
  <li><strong>Portee:</strong> ${data.porte}</li>
  <li><strong>Nomes:</strong> ${data.qsa.map(item => `<p>${item.nome}</p>`)}</li>
  <li><strong>Situação:</strong> ${data.situacao}</li>
  <li><strong>Situação:</strong> ${data.situacao_especial}</li>
  <li><strong>Status:</strong> ${data.status}</li>
  <li><strong>Telefone:</strong> ${data.telefone}</li>
  <li><strong>Tipo:</strong> ${data.tipo}</li>
  <li><strong>Uf: </strong>${data.uf}</li>
  <li><strong>Atualização:</strong> ${data.ultima_atualizacao}</li>
  `
  ul.innerHTML = list;
  document.body.appendChild(ul);
}