// Filtro
const busca = document.getElementById("busca")
const inputSemestre = document.getElementById("semestre")
const inputPeriodoDia = document.getElementById("periodo-dia")
const inputPublicoAula = document.getElementById("publico-aula")
const inputPreco = document.getElementById("preco")
const professores = document.querySelectorAll(".professor")

function filtrar(event) {
  event.preventDefault()
  let pesquisa = busca.value.toLowerCase()
  let semestre = inputSemestre.value
  let periodo = inputPeriodoDia.value
  let publico = inputPublicoAula.value
  let preco = inputPreco.value

  professores.forEach((professor) => {
    let nomeProfessor = professor.dataset.nome.toLowerCase()
    let precoDesejado =
      (preco !== "" && professor.dataset.precoMin <= preco) || preco === ""
    if (
      nomeProfessor.includes(pesquisa) &&
      professor.dataset.semestre === semestre &&
      professor.dataset.horario === periodo &&
      professor.dataset.publico === publico &&
      precoDesejado
    ) {
      professor.classList.remove("hide")
    } else {
      professor.classList.add("hide")
    }
  })
}

// Implementação do Collapsible (lista oculta, toggle list)
var coll = document.getElementsByClassName("collapsible")
var i

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active")
    var content = this.nextElementSibling
    if (content.style.display === "block" || content.style.display === "flex") {
      content.style.display = "none"
    } else {
      content.style.display = "flex"
      content.style.flexDirection = "column"
      content.style.margin = "0 auto"
      content.style.maxWidth = "300px"
      content.style.gap = "10px"
    }
  })
}

// Animação do slider - valor máximo da aula (R$)

var output = document.getElementById("demo")
output.innerHTML = inputPreco.value

inputPreco.oninput = function () {
  output.innerHTML = this.value
}

// Função que define o slider de valor da aula para seu valor máximo quando a página é recarregada
const reset = document.getElementById("reset-button")

reset.addEventListener("click", () => {
  document.getElementById("preco").value = "300"
  output.innerHTML = document.getElementById("preco").value
})
