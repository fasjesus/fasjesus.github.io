// Função para alternar entre a visão geral e a descrição do card
function toggleCard(cardElement) {
    // Permite que o clique no link funcione e não ative o flip
    if (event.target.tagName === 'A' || event.target.closest('.card-links')) {
        return;
    }

    // Alterna a classe 'is-flipped' no card clicado
    cardElement.classList.toggle('is-flipped');
}


function toggleAboutContent() {
    const moreContent = document.getElementById('more-about');
    const button = document.getElementById('toggle-about-btn');

    // Verifica se o conteúdo está oculto (classe 'hidden')
    if (moreContent.classList.contains('hidden')) {
        // Mostra o conteúdo
        moreContent.classList.remove('hidden');
        moreContent.classList.add('block'); 
        
        // Atualiza o texto do botão
        button.textContent = 'Ver menos...';
    } else {
        // Oculta o conteúdo
        moreContent.classList.remove('block');
        moreContent.classList.add('hidden');
        
        // Atualiza o texto do botão
        button.textContent = 'Ver mais...';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // --- Lógica do Carrossel "Center Stage" com Loop Infinito ---
    const track = document.querySelector(".carousel-track");
    const wrapper = document.querySelector(".carousel-wrapper");

    if (track && wrapper) {
        let cards = Array.from(track.children);
        const nextButton = document.querySelector(".next-btn");
        const prevButton = document.querySelector(".prev-btn");

        if (!nextButton || !prevButton || cards.length === 0) {
            console.warn("Carrossel não iniciado: botões ou trilho não encontrados.");
            return;
        }

        // --- Configuração do Loop Infinito ---
        const firstCardClone = cards[0].cloneNode(true);
        firstCardClone.dataset.clone = "true";
        
        const lastCardClone = cards[cards.length - 1].cloneNode(true);
        lastCardClone.dataset.clone = "true";

        track.appendChild(firstCardClone);
        track.insertBefore(lastCardClone, cards[0]);

        cards = Array.from(track.children);
        
        let currentIndex = 1; 
        let isAnimating = false; 

        // Função para centralizar e aplicar estilos
        const updateCarousel = (targetIndex, animate = true) => {
            if (isAnimating && animate) return; 
            if (!cards[targetIndex]) return; 

            isAnimating = animate;

            const targetCard = cards[targetIndex];
            
            const wrapperWidth = wrapper.offsetWidth;
            const wrapperCenter = wrapperWidth / 2;
            const cardWidth = targetCard.offsetWidth;
            const cardLeft = targetCard.offsetLeft;
            const cardCenter = cardLeft + (cardWidth / 2);
            const offset = cardCenter - wrapperCenter;

            if (animate) {
                track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            } else {
                track.style.transition = 'none'; 
            }

            track.style.transform = `translateX(-${offset}px)`;

            // Atualiza as classes de destaque
            cards.forEach((card, index) => {
                index === targetIndex
                    ? card.classList.add("is-active")
                    : card.classList.remove("is-active");
            });

            currentIndex = targetIndex;

            if (animate) {
                setTimeout(() => {
                    isAnimating = false;
                }, 500); 
            }
        };

        // Lógica para ir para o próximo card
        const goToNext = () => {
            if (isAnimating) return;
            currentIndex++;
            updateCarousel(currentIndex);
        };

        // Lógica para ir para o card anterior
        const goToPrev = () => {
            if (isAnimating) return;
            currentIndex--;
            updateCarousel(currentIndex);
        };

        // Ouvinte para "pular" de volta ao original após a transição
        track.addEventListener('transitionend', () => {
            isAnimating = false; 

            if (cards[currentIndex] && cards[currentIndex].dataset.clone === "true") {
                currentIndex =
                    currentIndex === cards.length - 1 ? 1 : cards.length - 2;
                updateCarousel(currentIndex, false);
            }
        });

        // Adiciona os "ouvintes" de clique
        nextButton.addEventListener('click', goToNext);
        prevButton.addEventListener('click', goToPrev);
        
        // Atualiza o carrossel se a tela for redimensionada
        window.addEventListener('resize', () => {
            updateCarousel(currentIndex, false);
        });

        // Define o estado inicial (centraliza o primeiro card *real*)
        setTimeout(() => {
            updateCarousel(currentIndex, false);
        }, 100);
    }
});