document.addEventListener("DOMContentLoaded", function() {
    
    // Seleciona todos os elementos que devem "aparecer"
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible' quando o elemento entra na tela
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});