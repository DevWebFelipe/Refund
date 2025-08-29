// Seleciona os elementos de formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// observa toda vez que algum valor for inserido/alterado no input
amount.oninput = () => {
  /*
  O usuário quer 150,00 por exemplo, então quando ele digitar 1, vai ficar 0,01
  aí ele digita 5, vai ficar 0,15
  aí ele digita 0, vai ficar 1,50
  outro zero, 15,00
  outro zero, 150,00  
*/

  // usa regex para remover qualquer caractere não numérico
  let value = amount.value.replace(/\D/g, "")

  // Transforma o valor em centavos
  value = Number(value) / 100

  // reatribui o valor sem caracteres não numéricos e já formatado ao input
  amount.value = formatCurrencyBRL(value)
}

// Formata o valor no padrão BRL que é o real brasileiro
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

// trata o evento de enviar formulario
form.onsubmit = (event) => {
  event.preventDefault() // previne o evento de envio do botão

  const newExpense = {
    id: new Date().getTime(), // pega a hora exata do momento do envio
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  console.log(newExpense)
}
