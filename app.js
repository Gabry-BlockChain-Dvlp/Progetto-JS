let main = 0; 
let contatoreDIV; 
let numeroSpan;

function creaContatore() {
   contatoreDIV = document.createElement("div");
   numeroSpan = document.createElement("span");
   numeroSpan.textContent = main;
   numeroSpan.id = "numero";
   numeroSpan.classList.add("fw-bold");

   contatoreDIV.appendChild(numeroSpan);
   document.body.appendChild(contatoreDIV);
}

function creaResetBtn() {
   const resetContainer = document.createElement("div");
   resetContainer.id = "resetContainer";
   const resetBtn = document.createElement("button");
   resetBtn.classList.add("btn", "btn-warning");
   resetBtn.id = "reset";
   resetBtn.textContent = "Reset";

   document.body.appendChild(resetContainer);
   resetContainer.append(resetBtn);
}

function creaBottoni() {
   const addContainer = document.createElement("div");
   addContainer.id = "addContainer";
   const addBtn = document.createElement("button");
   addBtn.id = "aggiungi";
   addBtn.textContent = "+ 1";

   const decreaseContainer = document.createElement("div");
   decreaseContainer.id = "decreaseContainer";
   const decreaseBtn = document.createElement("button");
   decreaseBtn.id = "diminuisci";
   decreaseBtn.textContent = "- 1";

   contatoreDIV.appendChild(addContainer);
   contatoreDIV.appendChild(decreaseContainer);
   addContainer.append(addBtn);
   decreaseContainer.append(decreaseBtn);
}

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

creaContatore();
creaBottoni();
creaResetBtn();

document.getElementById("aggiungi").addEventListener("click", function() {
   main++;
   aggiornaContatore(); 
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
