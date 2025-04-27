function alterarTema() {
    const tema = document.body.getAttribute("data-theme");
    const novoTema = tema === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", novoTema);
    localStorage.setItem("theme", novoTema);
}

document.addEventListener("DOMContentLoaded", () => {
    const temaSalvo = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", temaSalvo);
});

let idiomaAtual = localStorage.getItem("idioma") || "pt";

function alterarIdioma() {
    idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
    carregarIdioma(idiomaAtual);
    localStorage.setItem("idioma", idiomaAtual);
}

function carregarIdioma(idioma) {
    fetch(`json/${idioma}.json`)
        .then(response => response.json())
        .then(data => {
            traduzirPagina(data);
        })
        .catch(error => console.error("Erro ao carregar o arquivo de tradução:", error));
}

function traduzirPagina(linguagem) {
    document.querySelectorAll("[data-i18n]").forEach(elemento => {
        const chave = elemento.getAttribute("data-i18n");
        if (linguagem[chave]) {
            elemento.textContent = linguagem[chave];
        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(elemento => {
        const chave = elemento.getAttribute("data-i18n-alt");
        if (linguagem[chave]) {
            elemento.setAttribute("alt", linguagem[chave]);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    carregarIdioma(idiomaAtual);
    const botaoIdioma = document.getElementById("btAlterarIdioma");
    if (botaoIdioma) {
        botaoIdioma.addEventListener("click", alterarIdioma);
    }
});
