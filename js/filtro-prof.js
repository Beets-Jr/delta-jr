document.getElementById('busca').addEventListener('keyup', function() {
  let pesquisa = this.value.toLowerCase()
  let nomesProfessores = document.querySelectorAll('.prof-nome')

  nomesProfessores.forEach((nomeProfessor) => {
    let nomeProfessorTexto =  nomeProfessor.textContent.toLowerCase()
    if (nomeProfessorTexto.includes(pesquisa)) {
      nomeProfessor.closest('.professor').classList.remove('hide')
    } else {
	    nomeProfessor.closest('.professor').classList.add('hide')
    }
  })
})