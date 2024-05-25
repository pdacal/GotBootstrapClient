// activacion de popover
document.addEventListener("DOMContentLoaded", function () {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
});

//coller as casas
async function getDataHouses() {
  await fetch("https://thronesapi.com/api/v2/Characters")
    .then((response) => response.json())
    .then((json) => {
      let i = 0;
      let casas = [];
      json.forEach((personaje) => {
        //recoller casas
        if(personaje.family.startsWith('House')){
          casas.push(personaje.family);
        }
         i++;
      });
      //Eliminar duplicados
      casas = [... new Set(casas)];
      //eliminar errata Lanister
      casas = casas.filter(casa => casa !== 'House Lanister');
      // establecer cards e engadir elementos no html
      let j = 1;
      casas.forEach(casa => {
        //col4
        const columna = document.createElement("div");
        columna.setAttribute(
          "class",
          "col-xxl-3 col-lg-4 col-md-6 col-sm-12 mt-4 d-flex justify-content-center"
        );
        //card
        const divCard = document.createElement("div");
        divCard.setAttribute("class", "card");
        divCard.setAttribute("style", "width: 18rem;"); //ou 33rem
        //imagen
        const image = document.createElement("img");
        image.setAttribute("class", "card-img-top cartas");
        image.setAttribute("src", 'img/House' + j + '.jpg');
        image.setAttribute("style", "width: 18rem; height: 18rem"); //ou 33rem
        //card-body
        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        //card-title
        const cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title text-center");
        cardTitle.innerText = casa;
        const contenedor = document.getElementsByClassName("casas")[0];
        //engadir ao cardBody
        cardBody.appendChild(cardTitle);
        //engadir divCard
        divCard.appendChild(image);
        divCard.appendChild(cardBody);
        //engadir a columna
        columna.appendChild(divCard);
        //engadir ao div principal
        contenedor.appendChild(columna);
        j++
      })
      
    })
    .catch((error) => console.error(error));
}
getDataHouses();
