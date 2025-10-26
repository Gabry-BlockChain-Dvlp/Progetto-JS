let main = 0; 
let contatoreDIV; 
let numeroSpan;
const grigio = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
const blu = "linear-gradient(135deg, #3b24bfff, #6dd5ed)";
const verde = "linear-gradient(135deg, #1bb82dff, #bdc3c7)";

function creaSettingsBtn() {
   const settingsBtn = document.createElement("button");
   settingsBtn.id = "settingsBtn";
   settingsBtn.classList.add("btn", "btn-secondary");
   
   const settingsPanel = document.createElement("div");
   settingsPanel.id = "settingsPanel";
   settingsPanel.className = "settings-panel";
   settingsPanel.innerHTML = `
      <div class="settings-content">
         <h3>Impostazioni</h3>
         <label for="impostaValore">Imposta valore iniziale:</label>
         <input type="number" id="impostaValore" class="form-control" placeholder="Imposta valore">
         <button id="setValoreBtn" class="btn btn-primary mt-2">Imposta Valore</button>

         <button id="closeSettings" class="btn btn-danger">Chiudi</button>
      </div>
      <div class="settings-content">
         <button id="grey" class="btn btn-secondary">Sfondo Grigio</button>
         <button id="blue" class="btn btn-secondary">Sfondo Blu</button>
         <button id="green" class="btn btn-secondary">Sfondo Verde</button>
      </div>
   `;
   settingsPanel.style.display = "none";
   
   document.querySelector(".container").appendChild(settingsBtn);
   document.body.appendChild(settingsPanel);
   
   settingsBtn.addEventListener("click", () => {
      settingsPanel.style.display = "flex";
   });

   document.getElementById("grey").addEventListener("click", () => {
      document.body.style.background = grigio;
   });
   document.getElementById("blue").addEventListener("click", () => {
      document.body.style.background = blu;
   });
   document.getElementById("green").addEventListener("click", () => {
      document.body.style.background = verde;
   });

   document.getElementById("setValoreBtn").addEventListener("click", () => {
      const nuovoValore = parseInt(document.getElementById("impostaValore").value, 10);
      if (!isNaN(nuovoValore) && nuovoValore >= 0) {
         main = nuovoValore;
      }
      aggiornaContatore(true);
      settingsPanel.style.display = "none";
   });
   document.getElementById("closeSettings").addEventListener("click", () => {
      settingsPanel.style.display = "none";
   });
}
function creaContatore() {
   const row = document.createElement("div");
   row.className = "row-flex";


   const decreaseBtn = document.createElement("button");
   decreaseBtn.id = "diminuisci";
   decreaseBtn.textContent = "- 1";

   contatoreDIV = document.createElement("div");
   numeroSpan = document.createElement("span");
   numeroSpan.textContent = main;
   numeroSpan.id = "numero";
   numeroSpan.classList.add("fw-bold");
   contatoreDIV.appendChild(numeroSpan);

   // Bottone aggiungi
   const addBtn = document.createElement("button");
   addBtn.id = "aggiungi";
   addBtn.textContent = "+ 1";

   // Aggiungi tutto alla riga
   row.appendChild(decreaseBtn);
   row.appendChild(contatoreDIV);
   row.appendChild(addBtn);

   document.querySelector(".container").appendChild(row);
}


function creaResetBtn() {
   const resetContainer = document.createElement("div");
   resetContainer.id = "resetContainer";
   resetContainer.style.display = "flex";
   resetContainer.style.justifyContent = "center";
   const resetBtn = document.createElement("button");
   resetBtn.classList.add("btn", "btn-warning");
   resetBtn.id = "reset";
   resetBtn.textContent = "Reset";
   resetContainer.append(resetBtn);
   document.querySelector(".container").appendChild(resetContainer);
}

function inizializzaPagina() {
   creaSettingsBtn();
   creaContatore();
   creaResetBtn();

   document.getElementById("aggiungi").addEventListener("click", function() {
      main++;
      aggiornaContatore(); 
      playAnim(numeroSpan, "animate-pop");
   });

   document.getElementById("diminuisci").addEventListener("click", function () {
      if (main > 0) {
         main--;
         aggiornaContatore(); 
      } else {
         playAnim(numeroSpan, "shake");
      }
   });

   document.getElementById("reset").addEventListener("click", function () {
      main = 0;
      aggiornaContatore(true);
      playAnim(numeroSpan, "fade-in");
   });
}

inizializzaPagina();
/* playAnim: rimuove la classe, forza reflow e la ri-aggiunge. 
   Inoltre pulisce la classe a animationend così non rimane attaccata */
function playAnim(el, cls) {
  if (!el) return;
  el.classList.remove(cls);
  // forza reflow per poter riattivare l'animazione
  void el.offsetWidth;
  el.classList.add(cls);

  // pulizia automatica al termine dell'animazione
  function onEnd() {
    el.classList.remove(cls);
    el.removeEventListener('animationend', onEnd);
  }
  el.addEventListener('animationend', onEnd);
}

function aggiornaContatore(skipPop = false) {
   numeroSpan.textContent = main;
   if (!skipPop) playAnim(numeroSpan, "animate-pop");
}

