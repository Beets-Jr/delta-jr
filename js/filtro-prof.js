document.getElementById('filtro').addEventListener('keyup', function() {
    let pesquisa = this.textContent.toLowerCase()
    let professores = document.querySelectorAll('.professor')

    for(let i in professores) {
        let nomeProfessor = i.querySelector('.prof-nome')
        console.log(nomeProfessor)
    }
})