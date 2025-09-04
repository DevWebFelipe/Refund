// Seleciona os elementos de formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")

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
  event.preventDefault() // previne o evento de envio padrão do botão

  // cria um novo objeto com os dados da tela
  const newExpense = {
    id: new Date().getTime(), // pega a hora exata do momento do envio
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // chama a função que adiciona o item na lista
  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    // cria o elemento que será adicionado na lista

    // cria a o item (li) que é o elemento pai que será adicionado na lista(ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // cria a informação da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // cria o nome do tipo de despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // monta a div do nome da dispesa
    expenseInfo.append(expenseName, expenseCategory)

    // cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`

    // adiciona os elementos criados no item (li)
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount)

    // adiciona o item (li) na lista (ul)
    expenseList.append(expenseItem)
  } catch (error) {
    alert("Não foi possível inserir a nova despesa!")
    console.log(error)
  }
}
