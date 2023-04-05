// Receber o SELECTOR do formulário
const formPerguntaChat = document.getElementById('form-pergunta-chat');

// Chave da API do OPENAI
const OPENAI_API_KEY = "SUA API KEY";

// Verificar se tem a chave
if (OPENAI_API_KEY === "" || OPENAI_API_KEY == "SUA API KEY") {
    document.getElementById('pergunta').innerHTML = "<span style='color: #f00;'>Necessário colocar sua API.</span>";
}

// Acessa o IF quando tem o SELETOR na página HTML
if (formPerguntaChat) {

    // Aguardar o usuário clicar no botão Enviar
    formPerguntaChat.addEventListener("submit", async (e) => {

        // Bloquear o recarregamento da página
        e.preventDefault();

        // Substituir o texto do botão para "Pesquisando..."
        document.getElementById('btn-pergunta-chat').value = "Pesquisando...";

        // Receber o valor do campo pergunta
        let pergunta = document.getElementById('campo-pergunta').value;
        //console.log(pergunta);

        // Enviar o texto da pergunta para a página HTML
        document.getElementById('pergunta').innerHTML = pergunta;

        // Limpar a resposta
        document.getElementById('resposta').innerHTML = "<span></span>";

        // Requisição para chatgpt
        await fetch("https://api.openai.com/v1/completions", {

            // Método para enviar os dados
            method: "POST",

            // Dados ennviados no cabeçalho da requisição
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + OPENAI_API_KEY,
            },

            // Enviar os dados no corpo da requisição
            body: JSON.stringify({
                model: "text-davinci-003", //Modelo
                prompt: pergunta, // Texto da pergunta
                max_tokens: 2048, // Tamanho da resposta
                temperature: 0.7 // Criatividade na resposta
            }),
        })
            // Acessa o then quando obtiver resposta
            .then((resposta) => resposta.json())
            .then((dados) => {
                //console.log(dados);
                //console.log(dados.choices[0].text);

                // Enviar o texto da resposta para a página HTML
                let res = document.getElementById('resposta')
                res.classList.remove('invisible')
                let per = document.getElementById('pergunta')
                per.classList.remove('invisible')
                res.innerHTML = dados.choices[0].text;
            })
            // Retorna catch quando gerar erro
            .catch(() => {
                // Enviar o texto da resposta para a página HTML
                document.getElementById('resposta').innerHTML = "Sem resposta";
            });

        // Substituir o texto do botão para "Enviar"
        document.getElementById('btn-pergunta-chat').value = "Enviar";
    });
}
const reset = document.querySelector('#reset-btn');
reset.addEventListener('click', () => {
    let res = document.getElementById('resposta')
    res.classList.add('invisible')
    let per = document.getElementById('pergunta')
    per.classList.add('invisible')
});