var input = document.getElementById("msg");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        enviarMSG();
    }
});

//Botao enviarMSG
var botao = document.getElementById("botao1");
botao.addEventListener("click", function() {
    enviarMSG();
})

//CONTENT DELIVERY NETWORK - CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

var firebaseConfig = {
    apiKey: "AIzaSyAQ8kWC_aOjwONPiFUmVqSRvxIQTWU5_x0",
    authDomain: "chat-balta.firebaseapp.com",
    databaseURL: "https://chat-balta-default-rtdb.firebaseio.com",
    projectId: "chat-balta",
    storageBucket: "chat-balta.appspot.com",
    messagingSenderId: "973840611745",
    appId: "1:973840611745:web:bc7b5fe4b5febb6c4833e0",
    measurementId: "G-20K1D3W2BV"

};

const app = initializeApp(firebaseConfig);

var db = getDatabase(app);
const dbRef = ref(db, 'exemplo');
const dbTurma2 = ref(db, 'turma4');


var meuhtml = "";

var nomeUsuario = prompt("Digite seu nome");

onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    meuhtml = "";
    snapshot.forEach(function (childSnapshot) {
        //utilizar a key pra deletar mensagem
        let key = childSnapshot.key;
        // console.log("CHAVE" + key);
        // console.log("NOME" + childSnapshot.val().nome);
        // console.log("MSG" + childSnapshot.val().mensagem);

        if(nomeUsuario == childSnapshot.val().nome){
            meuhtml += '<div class="msg"><div class="self"><div class="eu"><b>' + childSnapshot.val().nome +  '</i></b></i> <span><p class="texto">'
            + childSnapshot.val().mensagem+'</p><input type="submit" class="deletar" value="Deletar" id="'+`${key}`+'" />'  
            +"<br>"+ childSnapshot.val().horario + '</span></div></div></div></div>';
            atualizarHTML();
            console.log(childSnapshot.key)
            setTimeout(() => {
                document.getElementById(key).onclick = (() => {
                    removerDb(key)
                })
            }, 500)
        }else{
            meuhtml += '<div class="msg"><div class="conteudo"><div class="outros"><b>' + childSnapshot.val().nome +  
            '</i></b></i> <span>'+"<br>"+'<div class="mensagem"><p class="texto2">' + childSnapshot.val().mensagem +'</p></div>'+ "<br>"
            + '<div class="hora">'+ childSnapshot.val().horario + '</div>' + '</span></div></div></div></div>';
            atualizarHTML();
        }


    });
});

function remover(key){

    document.getElementById("key").value = key;
    removerDb();
}

function removerDb(key) {
    var itemKey = document.getElementById("key").value;
    remove(ref(db, 'exemplo/' + key));
}

function enviarMSG() {

    var datahj = new Date();
    var hora = datahj.getHours() + ":" + datahj.getMinutes() + ":" + datahj.getSeconds()

    push(ref(db, 'exemplo'), {
        nome: nomeUsuario,
        horario: hora,
        data: datahj,
        mensagem: document.getElementById("msg").value
    });
    
    push(ref(db, 'turma4'), {
        nome: nomeUsuario,
        horario: hora,
        data: datahj,
        mensagem: document.getElementById("msg").value
    });

    document.getElementById("msg").value = "";
}

function atualizarHTML() {
    document.getElementById("conteudo").innerHTML = meuhtml
    ajustarScroll();
}

function ajustarScroll() {
    // console.log("corrirgir scroll");
    var divConteudo = document.getElementById("conteudo");
    divConteudo.scrollTop = divConteudo.scrollHeight;
}       