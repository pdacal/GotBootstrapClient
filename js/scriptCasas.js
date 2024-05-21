// activacion de popover
document.addEventListener('DOMContentLoaded', function () {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  });


  //coller as casas
  fetch("https://thronesapi.com/api/v2/Characters")
.then(response => response.json())
.then(json => {
  let i = 0;
  // adapatar aos personajes, sacnado family, e recollendo as que hai sen repetirse
  //logo sacalas no html
  json.forEach(personaje => {
    const contenedor = document.getElementsByClassName("continentes")[0]
    contenedor.innerHTML = json.map((continente) =>
    `<div class="col-xxl-3 col-lg-4 col-md-6 col-sm-12 mt-4">
      <div class="card" style="width: 18rem; height: auto">
        <img class="card-img-top continenteFotos" src="/img/continente${continente.id}.jpg"/>
        <div class="card-body">
          <h5 class="card-title">${continente.name}</h5>
        </div>
      </div>
    </div>
    `
    ).join(' ')

    i++
  })
})
.catch(error => console.error(error))