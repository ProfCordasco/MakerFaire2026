document.addEventListener("DOMContentLoaded", function (){
    caricaCucce();
});

function caricacucce () {
    getJSON("../dati/cucce,json")
    .then(Function(cucce){
      mostraCucce(cucce);
    })
    .catch(function (errore){
        console.log("errore", errore);
    })
}


function mostraCucce(cucce){
    const lista = document.getElementById("lista-cucce");

    lista.innerHTML = "";

    cucce.forEach(function (cuccia) {
        let classeBadge = "badge-libera";

       if(cuccia.stato === "occupata") {
        classeBadge = "badge occupata";
       }

       lista.innerHTML += `
<div class="col-md-6 col-xl-4">
<div class="card card-custom h-100">
<div class="card-body">

<div class="d-flex justify-content-between">
<div>
<h5 class="card-title">${cuccia.nome}</h5>
<p class="text-muted mb-2">${cuccia.posizione}</p>
</div>

<span class="badge ${classeBadge}">
${cuccia.stato.toUpperCase()}
</span>
</div>

<p class="mb-1">🌡️ ${cuccia.temperatura} °C</p>
<p class="mb-1">💧 ${cuccia.umidita}%</p>
<p class="mb-3">🚪 Porta: ${cuccia.porta}</p>

<a href="cuccia.html?id=${cuccia.id}" class="btn btn-outline-primary btn-sm w-100">
Dettagli
</a>

</div>
</div>
</div>
`;

    });
}