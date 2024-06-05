// Inicialize o Firebase com suas configurações
var firebaseConfig = {
    apiKey: "AIzaSyAH4eY4uyQYcxSTcKlbHRcUNrExx6cqPRs",
    authDomain: "barbearia23-cd41a.firebaseapp.com",
    projectId: "barbearia23-cd41a",
    storageBucket: "barbearia23-cd41a.appspot.com",
    messagingSenderId: "819673131054",
    appId: "1:819673131054:web:1ac942a1fa8a5923ed57bf"
};
firebase.initializeApp(firebaseConfig);

// Referência ao Firestore
var db = firebase.firestore();

// Referência ao formulário de cadastro
var cadastroForm = document.getElementById("cadastroForm");

// Evento de envio do formulário
// Evento de envio do formulário
cadastroForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar o comportamento padrão de envio do formulário

    // Pegar os valores dos campos do formulário
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Cadastrar o cliente no Firebase
    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Cadastro de cliente bem-sucedido
            var user = userCredential.user;
            // Adicionar os dados do cliente ao Firestore
            db.collection("clientes").doc(user.uid).set({
                nome: nome,
                email: email,
                senha: senha
            })
            .then(() => {
                console.log("Cliente cadastrado com sucesso:", user.uid);
                // Redirecionar para a página de sucesso ou outra página desejada
                window.location.href = "sucesso.html";
            })
            .catch((error) => {
                console.error("Erro ao cadastrar cliente no Firestore:", error);
            });
        })
        .catch((error) => {
            // Lidar com erros de cadastro
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Erro ao cadastrar cliente:", errorMessage);
        });
});

