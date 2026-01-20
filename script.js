document.addEventListener('DOMContentLoaded', () => {

    // --- 1. EFEITO DE DESLOCAMENTO AO ROLAR (REVEAL) ---
    // Faz com que as seções "subam" e ganhem opacidade ao entrar na tela
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150; // Sensibilidade: quanto o elemento aparece antes de subir

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    // Escuta o evento de scroll para disparar o Reveal
    window.addEventListener('scroll', reveal);
    // Dispara uma vez ao carregar para mostrar o que já está no topo da página
    reveal();

    // --- 2. TODOS OS BOTÕES "COMEÇAR AGORA" (SCROLL SUAVE) ---
    const linksPlanos = document.querySelectorAll('a[href="#planos"]');
    
    linksPlanos.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evita o pulo seco
            
            const secaoPlanos = document.getElementById('planos');
            
            if (secaoPlanos) {
                const offset = 90; // Espaço para o menu não cobrir o título
                const topoSecao = secaoPlanos.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: topoSecao,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. CONTADORES DE ESTATÍSTICAS (1 SEGUNDO) ---
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1000; // Tempo total da animação
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(target * progress);
            
            const sufixo = el.innerText.includes('%') ? '%' : '+';
            el.innerText = currentValue + sufixo;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.innerText = target + sufixo;
            }
        }
        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.counter').forEach(counter => observer.observe(counter));

    // --- 4. HEADER FIXO E BOTÃO VOLTAR AO TOPO ---
    const btnVoltar = document.getElementById('backToTop');
    const navBar = document.querySelector('.top-nav');

    window.addEventListener('scroll', () => {
        const scrollAtivo = window.pageYOffset;

        // Mostrar/Esconder botão de voltar
        if (btnVoltar) {
            btnVoltar.style.display = scrollAtivo > 400 ? 'flex' : 'none';
        }

        // Fixar o menu no topo
        if (navBar) {
            if (scrollAtivo > 50) {
                navBar.style.position = 'fixed';
                navBar.style.top = '0';
                navBar.style.width = '100%';
                navBar.style.zIndex = '1000';
                navBar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            } else {
                navBar.style.position = 'relative';
                navBar.style.boxShadow = 'none';
            }
        }
    });

    // Clique do botão Voltar ao Topo
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});