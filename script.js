/**
 * Lógica do Portal AgroSustentável
 */

document.addEventListener("DOMContentLoaded", () => {
    inicializarAgroApp();
});

function inicializarAgroApp() {
    console.log("🌱 Sistema AgroSustentável ativo.");
    gerenciarTema();
    gerenciarSimulador();
    gerenciarAnimacaoScroll();
}

// 1. Alternador de Temas (Claro / Escuro)
function gerenciarTema() {
    const botaoTema = document.getElementById("btn-tema");
    if (botaoTema) {
        botaoTema.addEventListener("click", () => {
            document.body.classList.toggle("modo-escuro");
        });
    }
}

// 2. Simulador Interativo Agro-Sustentável
function gerenciarSimulador() {
    const formulario = document.getElementById("form-simulador");
    const divResultado = document.getElementById("resultado-simulacao");

    if (!formulario || !divResultado) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const tecnologia = document.getElementById("tecnologia").value;
        const tamanhoHectares = parseFloat(document.getElementById("tamanho").value);
        
        if (isNaN(tamanhoHectares) || tamanhoHectares <= 0) {
            divResultado.style.backgroundColor = "rgba(229, 62, 62, 0.1)";
            divResultado.style.color = "#e53e3e";
            divResultado.style.border = "1px solid #e53e3e";
            divResultado.style.display = "block";
            divResultado.textContent = "❌ Por favor, insira um número válido de hectares.";
            return;
        }

        let mensagemResultado = "";
        let corSucesso = "#27ae60"; 

        switch (tecnologia) {
            case "irrigacao":
                const aguaEconomizada = tamanhoHectares * 15000;
                mensagemResultado = `💧 Excelente! Sua propriedade de ${tamanhoHectares} ha pode economizar cerca de ${aguaEconomizada.toLocaleString('pt-BR')} litros de água por ano com o gotejamento inteligente.`;
                break;

            case "ilpf":
                const co2Sequestrado = tamanhoHectares * 4.5;
                mensagemResultado = `🌳 Incrível! A integração Lavoura-Pecuária-Floresta nesta área pode mitigar aproximadamente ${co2Sequestrado.toFixed(1)} toneladas de CO₂ anualmente.`;
                break;

            case "solar":
                mensagemResultado = `☀️ Transição Energética: A implementação de painéis solares reduzará em até 85% a pegada de carbono elétrica da sua produção de ${tamanhoHectares} ha.`;
                corSucesso = "#e67e22"; 
                break;

            default:
                mensagemResultado = "Por favor, selecione uma tecnologia.";
        }

        // Exibe o resultado aplicando os estilos correspondentes
        divResultado.style.backgroundColor = `${corSucesso}15`; 
        divResultado.style.color = corSucesso;
        divResultado.style.border = `1px solid ${corSucesso}`;
        divResultado.style.display = "block";
        divResultado.textContent = mensagemResultado;
    });
}

// 3. Animação de Scroll via IntersectionObserver
function gerenciarAnimacaoScroll() {
    const elementosParaAnimar = document.querySelectorAll(".animar-scroll");
    
    const opcoes = {
        root: null,
        threshold: 0.15
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("scroll-ativo");
                observador.unobserve(entrada.target);
            }
        });
    }, opcoes);

    elementosParaAnimar.forEach(el => observador.observe(el));
}
