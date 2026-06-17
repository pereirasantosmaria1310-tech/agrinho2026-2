// Aguarda o DOM (HTML) carregar completamente antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

/**
 * Função principal que inicializa as funções do site
 */
function initApp() {
    console.log("JavaScript ativado: A página agora está viva e funcional!");
    
    configurarCliques();
    configurarValidacaoFormulario();
    configurarAnimacoes();
}

/**
 * 1. Resposta aos Cliques do Usuário e Interatividade
 */
function configurarCliques() {
    const botaoAlternar = document.getElementById("btn-tema");
    
    if (botaoAlternar) {
        botaoAlternar.addEventListener("click", () => {
            // Alterna uma classe no body para mudar o tema (Ex: claro/escuro)
            document.body.classList.toggle("modo-escuro");
            console.log("Tema da página alterado.");
        });
    }
}

/**
 * 2. Validação de Formulários
 */
function configurarValidacaoFormulario() {
    const formulario = document.getElementById("meu-formulario");
    
    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            // Impede o envio padrão (recarregar a página) antes de validar
            evento.preventDefault();
            
            const campoEmail = document.getElementById("email");
            const mensagemErro = document.getElementById("erro-mensagem");
            
            // Lógica de validação simples
            if (!campoEmail.value.includes("@")) {
                mensagemErro.textContent = "Por favor, insira um e-mail válido.";
                mensagemErro.style.color = "red";
                console.warn("Validação falhou: E-mail inválido.");
            } else {
                mensagemErro.textContent = "Formulário enviado com sucesso!";
                mensagemErro.style.color = "green";
                console.log("Formulário validado e enviado.");
                
                // Aqui você integraria o envio dos dados (Ex: usando fetch/API)
                formulario.reset(); 
            }
        });
    }
}

/**
 * 3. Definição de Ações e Animações Dinâmicas
 */
function configurarAnimacoes() {
    const elementosAnimados = document.querySelectorAll(".animar-ao-entrar");
    
    // Cria um observador para ativar animações quando o elemento aparece na tela
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Adiciona a classe CSS que executa a animação
                entrada.target.classList.add("fade-in-ativa");
                // Opcional: para de observar após animar uma vez
                observador.unobserve(entrada.target); 
            }
        });
    }, { threshold: 0.1 }); // Dispara quando 10% do elemento estiver visível

    elementosAnimados.forEach(elemento => observador.observe(elemento));
}
