const btnMobile = document.getElementById('btn-mobile')
const nav = document.getElementById('nav')

btnMobile.addEventListener('click', () => {
  nav.classList.toggle('ativo')
})