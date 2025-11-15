document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Lógica do "Reveal" (Para seções) ---
    const revealElements = document.querySelectorAll('.reveal');

    // Cria um "observador" 
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do elemento estiver na tela
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    
    // --- 2. Lógica do "Ver Mais" (Para cards de projeto) ---
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link (#) de pular a página
            event.preventDefault(); 

            // Encontra o .card pai mais próximo do botão que foi clicado
            const card = button.closest('.card');

            card.classList.toggle('expanded');

            if (card.classList.contains('expanded')) {
                button.textContent = 'Ver Menos';
            } else {
                button.textContent = 'Ver Mais';
            }
        });
    });

});