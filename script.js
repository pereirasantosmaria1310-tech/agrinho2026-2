/**
 * AgroSustentável - Inteligência e Dinamismo no Campo
 * Lógica base do site para interatividade, validações e animações.
 */

// Garante que o script só rode após o navegador carregar todo o HTML
document.addEventListener("DOMContentLoaded", () => {
    inicializarAgroApp();
});

/**
 * Função mestre que ativa os módulos do site
 */
function inicializarAgroApp() {
    console.log("🌱 Sistema AgroSustentável inicializado com sucesso.");
    
    gerenciarTema();
    gerenciarSimulador();
    gerenciarAnimacaoScroll();
}

/**
 * 1. INTERATIVIDADE: Controle de Tema (Claro / Escuro)
 * Permite ao usuário alternar a identidade visual do site de forma fluida.
 */
function gerenciarTema() {
    const botaoTema = document.getElementById("btn-tema");
    
    if (botaoTema) {
        botaoTema.addEventListener("click", () => {
            // Alterna a classe no body. O CSS se encarrega de mudar as variáveis de cor.
            document.body.classList.toggle("modo-escuro");
            
            // Feedback visual no console para monitoramento técnico
            const temaAtual = document.body.classList.contains("modo-escuro") ? "Escuro" : "Claro";
            console.log(`🌓 Interface alterada para o Modo ${temaAtual}.`);
        });
    }
}

/**
 * 2. LÓGICA INTELIGENTE: Simulador de Impacto Ambiental (Validação e Resposta)
 * Transforma o formulário estático em uma ferramenta educativa funcional.
 */
function gerenciarSimulador() {
    const formulario = document.getElementById("form-simulador");
    const divResultado = document.getElementById("resultado-simulacao");

    if (!formulario || !divResultado) return;

    formulario.addEventListener("submit", (evento) => {
        // Impede que a página recarregue ao enviar o formulário
        evento.preventDefault();

        // Captura dos dados inseridos pelo usuário
        const tecnologia = document.getElementById("tecnologia").value;
        const tamanhoHectares = parseFloat(document.getElementById("tamanho").value);
        
        // Validação de segurança básica para o input numérico
        if (isNaN(tamanhoHectares) || tamanhoHectares <= 0) {
            divResultado.style.backgroundColor = "rgba(229, 62, 62, 0.1)";
            divResultado.style.color = "#e53e3e";
            divResultado.style.border = "1px solid #e53e3e";
            divResultado.textContent = "❌ Por favor, insira um número válido de hectares.";
            return;
        }

        let mensagemResultado = "";
        let corSucesso = "#27ae60"; // Verde padrão para resultados positivos

        // Estrutura condicional para calcular o impacto com base na tecnologia escolhida
        switch (tecnologia) {
            case "irrigacao":
                // Cálculo simulado: média de 15.000 litros economizados por hectare/ano
                const aguaEconomizada = tamanhoHectares * 15000;
                mensagemResultado = `💧 Excelente! Sua propriedade de ${tamanhoHectares} ha pode economizar cerca de ${aguaEconomizada.toLocaleString('pt-BR')} litros de água por ano com o gotejamento inteligente.`;
                break;

            case "ilpf":
                // Cálculo simulado: média de 4.5 toneladas de CO2 mitigadas por hectare/ano
                const co2Sequestrado = tamanhoHectares * 4.5;
                mensagemResultado = `🌳 Incrível! A integração Lavoura-Pecuária-Floresta nesta área pode mitigar aproximadamente ${co2Sequestrado.toFixed(1)} toneladas de CO₂ anualmente.`;
                break;

            case "solar":
                mensagemResultado = `☀️ Transição Energética: A implementação de painéis solares reduzirá em até 85% a pegada de carbono elétrica da sua produção de ${tamanhoHectares} ha.`;
                corSucesso = "#e67e22"; // Laranja para destacar energia solar
                break;

            default:
                mensagemResultado = "Por favor, selecione uma tecnologia válida da lista.";
                corSucesso = "#2c3e50";
        }

        // Aplicação dinâmica dos resultados e estilos na tela
        divResultado.style.backgroundColor = `${corSucesso}15`; // Adiciona transparência em formato Hex
        divResultado.style.color = corSucesso;
        divResultado.style.border = `1px solid ${corSucesso}`;
        divResultado.style.display = "block";
        divResultado.textContent = mensagemResultado;

        console.log(`📊 Simulação computada: Tecnologia: ${tecnologia} | Área: ${tamanhoHectares} ha.`);
    });
}

/**
 * 3. COMPORTAMENTO DINÂMICO: Animação de Scroll (Fade-In)
 * Revela os elementos suavemente conforme o usuário rola a tela.
 */
function gerenciarAnimacaoScroll() {
    const elementosParaAnimar = document.querySelectorAll(".animar-scroll");
    
    // Configuração do Observador de Interseção do Navegador
    const opçõesOpacas = {
        root: null,         // Usa a janela de visualização atual (viewport)
        threshold: 0.15     // Dispara o efeito quando 15% do elemento estiver visível
    };

    const observadorDeScroll = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Injeta a classe CSS que dispara a animação de subida e opacidade
                entrada.target.classList.add("scroll-ativo");
                
                // Remove o elemento do monitoramento para que a animação ocorra apenas uma vez
                observador.unobserve(entrada.target);
            }
        });
    }, opçõesOpacas);

    // Vincula o observador a cada elemento configurado no HTML
    elementosParaAnimar.forEach(elemento => {
        observadorDeScroll.observe(elemento);
    });
}
