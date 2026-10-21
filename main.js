import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://lista1-af4a9-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyAqhA7199e56q8L19IGZ8iHel_WmRyEOng",
  authDomain: "lista1-af4a9.firebaseapp.com",
  projectId: "lista1-af4a9",
  storageBucket: "lista1-af4a9.firebasestorage.app",
  messagingSenderId: "38558823929",
  appId: "1:38558823929:web:fc0e973da9961cda46b928",
  measurementId: "G-2HHDJK23ZR",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const coisas = ref(db, "coisas")

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const form = document.getElementById("form-tarefa");
const titulo = document.getElementById("titulo");
const lista = document.getElementById("lista-tarefas");
const mensagens = document.getElementById("mensagens");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await push(coisas, {
    titulo: titulo.value
  });
  form.reset();
  mensagens.textContent = "Adicionado!";
});

onValue(coisas, (dados) => {
    lista.innerHTML = "";

    dados.forEach((item) => {
        const coisa = item.val();
        const id = item.key;
        const li = document.createElement("li");
        li.textContent = coisa.titulo + " ";

        // UPDATE: editar
const editar = document.createElement("button");
editar.textContent = "Editar"; 

editar.onclick = async () => {
    const novo = prompt("editar:", coisa.titulo);

if (novo && novo.trim ()) {
    await update(ref(db, "coisas/" + id), {
        titulo: novo.trim()
    });
  } 
};
      // DELETE: remover
const excluir = document.createElement("button");
excluir.textContent = "Excluir";

excluir.onclick = async () => {
    if (confirm("Excluir esta coisa?")){
    await remove(ref(db, "coisas/" + id));
    }
};

li.append(editar, excluir);
lista.append(li);
    });
});

