/* document.getElementById('filtro').addEventListener('keyup', function() {
    let pesquisa = this.textContent.toLowerCase()
    let professores = document.querySelectorAll('.professor')

    for(let i in professores) {
        let nomeProfessor = i.querySelector('.prof-nome')
        console.log(nomeProfessor)
    }
}) */

function filterFunction() {
    var input, filter, ul, li, a, i, value;
    input = document.querySelector(".searchInput");
    filter = input.value.toUpperCase();
    ul = document.querySelector(".animalUL");
    ul2 = ul.querySelector(".single-animal");
    li = ul2.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       a = li[i].getElementsByTagName("span")[0];
       value = a.textContent || a.innerText;
       if (value.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
       } else {
          li[i].style.display = "none";
       }
    }
 }