document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Lógica do "Reveal" (Para seções) ---
    // Seleciona todos os elementos que devem "aparecer"
    const revealElements = document.querySelectorAll('.reveal');

    // Cria um "observador" que vai vigiar quando os elementos entram na tela
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível (intersecting)
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible' para fazê-lo aparecer (o CSS cuida da animação)
                entry.target.classList.add('visible');
                // Opcional: para de observar o elemento depois que ele já apareceu
                // revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do elemento estiver na tela
    });

    // Pede ao observador para vigiar cada um dos elementos 'reveal'
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    
    // --- 2. Lógica do "Ver Mais" (Para cards de projeto) ---
    // Seleciona todos os botões com a classe .read-more-btn
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    // Adiciona um "ouvinte" de clique para cada botão
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link (#) de pular a página
            event.preventDefault(); 

            // Encontra o .card pai mais próximo do botão que foi clicado
            const card = button.closest('.card');
            
            // Alterna (adiciona ou remove) a classe 'expanded' no card
            // O CSS vai usar essa classe para mostrar ou esconder o texto
            card.classList.toggle('expanded');

            // Muda o texto do botão com base na classe
            if (card.classList.contains('expanded')) {
                button.textContent = 'Ver Menos';
            } else {
                button.textContent = 'Ver Mais';
            }
        });
    });

});