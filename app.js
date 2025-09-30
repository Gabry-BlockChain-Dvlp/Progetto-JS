let main = 0; 
let contatoreDIV; 
let numeroSpan;


function creaContatore() {
   // Wrapper per la riga centrale
   const row = document.createElement("div");
   row.className = "row-flex";

   // Bottone diminuisci
   const decreaseBtn = document.createElement("button");
   decreaseBtn.id = "diminuisci";
   decreaseBtn.textContent = "- 1";

   // Numero
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

