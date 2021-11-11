// Filtro
const busca = document.getElementById("busca")
const inputSemestre = document.getElementById("semestre")
const inputPeriodoDia = document.getElementById("periodo-dia")
const inputPublicoAula = document.getElementById("publico-aula")
const inputPreco = document.getElementById("preco")
const inputDiaSemana = document.getElementsByClassName("dia-check")
const professores = document.querySelectorAll(".professor")

function filtrar(event) {
  event.preventDefault()
  let pesquisa = busca.value.toLowerCase()
  let semestre = inputSemestre.value
  let periodo = inputPeriodoDia.value
  let publico = inputPublicoAula.value
  let preco = inputPreco.value
  let dias = Array.apply(false, Array(7))
  let contadorDiasFiltrados = 0
  for (let i = 0; i < inputDiaSemana.length; i++) {
    if (inputDiaSemana[i].checked == true) {
      dias[i] = true
      contadorDiasFiltrados++
    } else {
      dias[i] = false
    }
  }

  professores.forEach((professor) => {
    let nomeProfessor = professor.dataset.nome.toLowerCase()
    let diasDisponiveisString = professor.dataset.dias.toLowerCase()
    let flagDisponivel = false
    if (contadorDiasFiltrados != 0) {
      let diasDisponiveisVetor = Array.apply(false, Array(7))
      if (diasDisponiveisString.indexOf("dom") !== -1) {
        diasDisponiveisVetor[0] = true
      } else {
        diasDisponiveisVetor[0] = false
      }

      if (diasDisponiveisString.indexOf("seg") !== -1) {
        diasDisponiveisVetor[1] = true
      } else {
        diasDisponiveisVetor[1] = false
      }

      if (diasDisponiveisString.indexOf("ter") !== -1) {
        diasDisponiveisVetor[2] = true
      } else {
        diasDisponiveisVetor[2] = false
      }

      if (diasDisponiveisString.indexOf("qua") !== -1) {
        diasDisponiveisVetor[3] = true
      } else {
        diasDisponiveisVetor[3] = false
      }

      if (diasDisponiveisString.indexOf("qui") !== -1) {
        diasDisponiveisVetor[4] = true
      } else {
        diasDisponiveisVetor[4] = false
      }

      if (diasDisponiveisString.indexOf("sex") !== -1) {
        diasDisponiveisVetor[5] = true
      } else {
        diasDisponiveisVetor[5] = false
      }

      if (diasDisponiveisString.indexOf("sab") !== -1 || diasDisponiveisString.indexOf("sáb") !== -1) {
        diasDisponiveisVetor[6] = true
      } else {
        diasDisponiveisVetor[6] = false
      }

      for (let j = 0; j < 7; j++) {
        if (dias[j] && diasDisponiveisVetor[j]) {
          flagDisponivel = true;
          break;
        }
      }
    } else {
      flagDisponivel = true
    }

    let precoDesejado = (preco !== "300" && professor.dataset.precoMin <= preco) || preco === "300"
    if (
      nomeProfessor.includes(pesquisa) &&
      (professor.dataset.semestre === semestre || semestre === "") &&
      (professor.dataset.horario === periodo || periodo === "") &&
      (professor.dataset.publico === publico || publico === "") &&
      flagDisponivel &&
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
  professores.forEach((professor) => {
      professor.classList.remove("hide")
  })
})

window.onload = function() {
  document.getElementById('preco').value = '300';
  output.innerHTML = document.getElementById('preco').value;
}