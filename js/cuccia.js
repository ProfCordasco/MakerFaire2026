document.addEventListener("DOMContentLoaded", function (){
    const parametri = new URLSearchParams(window.location.search);
    const idCuccia = parametri.get("id");

    caricaCuccia(idCuccia);
});

function caricaCuccia(id){
     getJSON("../dati/cucce.json")
     .then(function(cucce){
        
        const cuccia = cucce.find(function(elemento){
            return elemento.id == id;
        });

        if(cuccia){
            mostraCuccia(cuccia);
         }
         else {
            document.getElementById("dettaglio-cuccia").innerHTML = `
                <div class="alert alert-danger">
                    Cuccia non trovata
                </div>
            `;
         }
     });
 
}


function mostraCuccia(cuccia){
    const contenitore = document.getElementById("dettaglio-cuccia");
    let badgeAnimale = `
    <span class="cuccia-badge badge badge-libera">
        LIBERA
    </span>
   `;

   if (cuccia.stato_animale == 1) {
    badgeAnimale = `
    <span class="cuccia-badge badge badge-occupata">
        OCCUPATA
    </span>
    `;
    }
    
    let statoPorta = "APERTA";

    if(cuccia.stato_porta == 1){
        statoPorta = "CHIUSA";
    }

    contenitore.innerHTML = `

<div class="mb-3">

<a href="dashboard.html" class="btn btn-outline-secondary">
← Torna alla dashboard
</a>

</div>

<div class="card card-custom">

<div class="card-body">

<div class="d-flex justify-content-between align-items-start mb-4">

<div>

<h2 class="card-title">
${cuccia.nome}
</h2>

<p class="text-muted">
${cuccia.zona}
</p>

</div>

${badgeAnimale}

</div>

<div class="row g-3">

<div class="col-md-6">

<div class="border rounded p-3">

<h6>🌡️ Temperatura</h6>

<h3>
${cuccia.temperatura} °C
</h3>

</div>

</div>

<div class="col-md-6">

<div class="border rounded p-3">

<h6>💧 Umidità</h6>

<h3>
${cuccia.umidita}%
</h3>

</div>

</div>

<div class="col-md-6">

<div class="border rounded p-3">

<h6>🚪 Stato porta</h6>

<h3>
${statoPorta}
</h3>

</div>

</div>

<div class="col-md-6">

<div class="border rounded p-3">

<h6>🕒 Ultimo aggiornamento</h6>

<p class="mb-0">
${cuccia.ultimo_aggiornamento}
</p>

</div>

</div>

</div>

<div class="mt-4 d-flex gap-2">

<button
class="btn btn-success"
onclick="apriPorta(${cuccia.id})">

Apri porta

</button>

<button
class="btn btn-danger"
onclick="chiudiPorta(${cuccia.id})">

Chiudi porta

</button>

</div>

</div>

</div>

`;


}