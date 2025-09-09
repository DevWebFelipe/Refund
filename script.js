// Seleciona os elementos de formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

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

// formata o valor no padrão BRL que é o real brasileiro
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

  // atualiza os totais da lista (uk)
  updateTotals()

  // limpa os campos da tela após inserir um novo item na lista
  formClear()
}

// adiciona um novo item na lista
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

    // cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // adiciona os elementos criados no item (li)
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // adiciona o item (li) na lista (ul)
    expenseList.append(expenseItem)
  } catch (error) {
    alert("Não foi possível inserir a nova despesa!")
    console.log(error)
  }
}

// atualiza os totais
function updateTotals() {
  try {
    // recupera a quantidade de itens (li) da lista (ul)
    const items = expenseList.children

    // atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`

    // variável para incrementar o total
    let total = 0

    // percorre cada item (li) da lista (ul)
    for (let item = 0; item < items.length; item++) {
      // pega o componente que contém o valor no item que está sendo iterado
      const itemAmount = items[item].querySelector(".expense-amount")

      // usa expressão regular para remover tudo que não for número e troca vírgula por ponto
      // CUIDADO com a vírgula depois do \d pois sem ela, a vírgula de casa decimal também será removida e vai acabar pulando para milhar
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".")

      // converte o valor acima para float
      value = parseFloat(value)

      // verifica se é um número válido
      if (isNaN(value)) {
        return alert("Não foi possível calcular o total.")
      }

      // incrementa o valor total
      total += Number(value) // Number só para garantir, porque não precisaria pois já tem o if + o parseFloat
    }

    // cria a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // formata o valor total e remove o R$ para que seja usado o do elemento acima
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // limpa o conteúdo do elemento
    expensesTotal.innerHTML = ""

    // adiciona o símbolo da moeda e o valor total formatado
    expensesTotal.append(symbolBRL, total)
  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}

// evento que captura o clic dos itens da lista
expenseList.addEventListener("click", function (event) {
  // verifica se o elemento clicado é o de remover item da lista
  if (event.target.classList.contains("remove-icon")) {
    // obtém a li pai do elemento clicado
    const item = event.target.closest(".expense")

    // remove o item da lista
    item.remove()

    // atualiza os totais novamente
    updateTotals()
  }
})

// limpar campos da tela
function formClear() {
  // limpa os campos da tela
  expense.value = ""
  category.value = ""
  amount.value = ""

  // foca no componente de valor
  expense.focus()
}
