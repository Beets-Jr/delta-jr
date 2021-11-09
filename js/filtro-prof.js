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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
	  content.style.flexDirection = "column";
	  content.style.margin = "0 auto";
	  content.style.width = "300px";
	  content.style.gap = "10px";
    }
  });
}