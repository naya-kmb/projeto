
        const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    // Alterna a classe 'active' para mostrar/esconder o menu
    navList.classList.toggle('active');
    
    // Opcional: Animação simples no botão hambúrguer
    mobileMenu.classList.toggle('is-active');
});
