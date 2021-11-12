// Constante do preço máximo da aula cobrado pelos professores
const PRECO_MAX = 300

// Filtro
// armazenamento das escolhas de filtro pelo usuário
const busca = document.getElementById("busca")
const inputSemestre = document.getElementById("semestre")
const inputPeriodoDia = document.getElementById("periodo-dia")
const inputPublicoAula = document.getElementById("publico-aula")
const inputPreco = document.getElementById("preco")
const inputDiaSemana = document.getElementsByClassName("dia-check")
const professores = document.querySelectorAll(".professor")

// Função de filtragem, invocada ao clicar em "Aplicar filtros"
function filtrar(event) {
  event.preventDefault()
  let professoresExibidos = 0               // conta a quantidade de professores exibidos após a filtragem
  let pesquisa = busca.value.toLowerCase()
  let semestre = inputSemestre.value
  let periodo = inputPeriodoDia.value
  let publico = inputPublicoAula.value
  let preco = inputPreco.value
  let dias = Array.apply(false, Array(7))   // vetor de booleanos que mapeia quais dias da semana foram marcados nas checkboxes
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
    let flagDisponivel = false        // flag que indica se o professor está disponível em pelo menos um dos dias marcados nos checkboxes

    // caso algum dia da semana tenha sido marcado: (se não houver nenhum, não é necessário fazer toda a verificação)
    if (contadorDiasFiltrados != 0) {
      let diasDisponiveisVetor = Array.apply(false, Array(7))       // vetor de dias em que o professor está disponível
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

      // caso haja algum dia em comum entre os dias exigidos (filtro) e os dias que o professor está disponível:
      for (let j = 0; j < 7; j++) {
        if (dias[j] && diasDisponiveisVetor[j]) {
          flagDisponivel = true;
          break;
        }
      }
    // se nenhum dia específico foi exigido, o professor está disponível
    } else {
      flagDisponivel = true
    }
    
    let precoDesejado = (preco !== PRECO_MAX.toString() && parseInt(professor.dataset.precomin) <= parseInt(preco)) || preco === PRECO_MAX.toString()
    if (
      nomeProfessor.includes(pesquisa) &&
      (professor.dataset.semestre === semestre || semestre === "") &&
      (professor.dataset.horario === periodo || periodo === "") &&
      (professor.dataset.publico === publico || publico === "") &&
      flagDisponivel &&
      precoDesejado
    ) {
      professor.classList.remove("hide")
      professoresExibidos++
    } else {
      professor.classList.add("hide")
    }
  })

  // caso nenhum professor seja exibido com as esolhas de filtros feitas, insere um parágrafo com mensagem específica
  if (professoresExibidos === 0) {
    const paragrafo = document.createElement("p")
    paragrafo.setAttribute("id", "filtro-sem-resultados")
    const node = document.createTextNode("Nenhum(a) professor(a) encontrado(a)")
    paragrafo.appendChild(node)

    const div = document.getElementById("filtro")
    div.appendChild(paragrafo)
  } else {
    p = document.getElementById("filtro-sem-resultados")
    if (p) {
      p.remove()
    }
  }
}

// Implementação do Collapsible (lista oculta ou toggle list)
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
      content.style.maxWidth = "400px"
      content.style.gap = "10px"
    }
  })
}

// Animação do slider - preço máximo da aula
var output = document.getElementById("demo")
output.innerHTML = inputPreco.value

inputPreco.oninput = function () {
  output.innerHTML = this.value
}

// Definição do slider de preço da aula para seu valor máximo quando se clica em "Limpar filtros"
const reset = document.getElementById("reset-button")
reset.addEventListener("click", () => {
  slider = document.getElementById("preco");
  slider.value = PRECO_MAX.toString()
  output.innerHTML = slider.value;
  professores.forEach((professor) => {
      professor.classList.remove("hide")
  })

  // ao se limpar os filtros, é preciso remover o parágrafo de frase específica, caso ele estiver sendo mostrado
  p = document.getElementById("filtro-sem-resultados")
  if (p) {
    p.remove()
  }
})

// Definição do slider de preço da aula para seu valor máximo quando a página é recarregada
window.onload = function() {
  document.getElementById('preco').value = PRECO_MAX.toString();
  output.innerHTML = document.getElementById('preco').value;
}