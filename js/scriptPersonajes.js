// CARD
// async function getDataCharacters() {
//   //asincrono
//   await fetch("https://thronesapi.com/api/v2/Characters")
//     .then((response) => response.json())
//     //.then(json => console.log(json))
//     .then((json) => {
//       let i = 0;
//       json.forEach((personaje) => {
//         //col4
//         const columna = document.createElement("div");
//         columna.setAttribute(
//           "class",
//           "col-xxl-3 col-lg-4 col-md-6 col-sm-12 mt-4 d-flex justify-content-center"
//         );
//         //card
//         const divCard = document.createElement("div");
//         divCard.setAttribute("id", `divCard${i}`)
//         divCard.setAttribute("class", "card");
//         divCard.setAttribute("style", "width: 18rem; height: auto; cursor:pointer"); //ou 33rem
//         //imagen
//         const image = document.createElement("img");
//         image.setAttribute("class", "card-img-top cartas");
//         image.setAttribute("src", json[i].imageUrl);
//         image.setAttribute("alt", json[i].firstName);
//         //card-body
//         const cardBody = document.createElement("div");
//         cardBody.setAttribute("class", "card-body");
//         //card-title
//         const cardTitle = document.createElement("h5");
//         cardTitle.setAttribute("class", "card-title text-center");
//         cardTitle.innerText = json[i].fullName;
//         //card-text
//         const cardText = document.createElement("p");
//         cardText.setAttribute("class", "card-text text-center");
//         cardText.innerText = json[i].title;
//         //footer card
//         const cardFooter = document.createElement("div");
//         cardFooter.setAttribute("class", "card-footer text-center");
//         cardFooter.innerText = json[i].family;
//         //coller contenedor no que se vai introducir
//         const contenedor3 =
//           document.getElementsByClassName("carta-personaje")[0];
//         //engadir ao cardBody
//         cardBody.appendChild(cardTitle);
//         cardBody.appendChild(cardText);

//         //engadir divCard
//         divCard.appendChild(image);
//         divCard.appendChild(cardBody);
//         divCard.appendChild(cardFooter);
//         //engadir a columna
//         columna.appendChild(divCard);
//         //engadir ao div principal
//         contenedor3.appendChild(columna);
//         //ao clikar redirixir a vista detalle
//         document.getElementById(`divCard${i}`).onclick = function(){
//           //recoller personaje, convertir a JSON e codificar
//           const personaje = encodeURIComponent(JSON.stringify(json[i]))
//           //redirixir
//           window.location.href = `detallePersonaje.html?personaje=${personaje}`;
//         }
//         i++;
//       });
//     })

//     .catch((error) => console.error(error));
// }

// TABOA
// async function getDataCharacters() {
//   //asincrono
//   await fetch("https://thronesapi.com/api/v2/Characters")
//     .then((response) => response.json())
//     .then((json) => {
//       let i = 0;
//       json.forEach((personaje) => {
//         const table = document.getElementById("table");
//         const tbody = document.createElement("tbody");
//         // tr
//         const tr = document.createElement("tr");
//         // tds:
//         //foto
//         const tdFoto = document.createElement("td");
//         const img = document.createElement("img");
//         img.setAttribute("src", json[i].imageUrl);
//         img.setAttribute("class", "rounded m-2");
//         img.setAttribute("alt", json[i].fullName);
//         img.setAttribute(
//           "style",
//           "width: 15rem; height: 15rem;object-fit: cover;"
//         );
//         // nome
//         const tdNome = document.createElement("td");
//         tdNome.innerText = json[i].fullName;
//         // boton
//         const tdBoton = document.createElement("td");
//         const buttonDetails = document.createElement("button");
//         buttonDetails.setAttribute("id", "buttonDetails");
//         buttonDetails.setAttribute("type", "button");
//         buttonDetails.setAttribute("class", "btn btn-info");
//         const id = json[i].id;
//         buttonDetails.addEventListener('click', () => popUpDetails(id))
//         buttonDetails.innerText = "Detalles";
//         // encadear -> td + contido
//         tdFoto.appendChild(img);
//         tdBoton.appendChild(buttonDetails);
//         // tr + tds
//         tr.appendChild(tdFoto);
//         tr.appendChild(tdNome);
//         tr.appendChild(tdBoton);
//         // tbody +tr
//         tbody.appendChild(tr);
//         table.appendChild(tbody);
//         i++;
//       });
//     })

//     .catch((error) => console.error(error));
// }

async function getDataCharacters() {
  try {
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    const characters = await response.json();
    // Preparar datos para introducilos como data na bootstrap-table(plugin)
    const data = characters.map((character) => ({
      image: `<img src="${character.imageUrl}" class="rounded" alt="${character.fullName}" style="width: 8rem; height: 8rem; object-fit: cover;">`,
      name: character.fullName,
      details: `<button type="button" class="btn btn-info" data-toggle="modal" data-target="#details" onclick="popUpDetails(${character.id})">Detalles</button>`,
    }));
    // ponher os datos na data da taboa
    $("#table").bootstrapTable({
      data: data,
    });
    // que cargue os datos
    $("#table").bootstrapTable("load", data);
  } catch (error) {
    console.error(error);
  }
}

getDataCharacters();

async function popUpDetails(id) {
  // recoller persoaxe da api + crear modal + introducir datos personaje en modal
  await fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
    .then((response) => response.json())
    .then((pers) => {
      const div = document.getElementById("details");
      div.innerHTML = `
    <div class="modal fade" id="modalDetails" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Detalles de <b class="text-primary">${pers.fullName}</b></h3>
          </div>
          <div class="modal-body">
          <!--Corpo do modal -->
          <div class="col text-center">
          <img src="${pers.imageUrl}" class="rounded m-3" alt="${pers.fullName}" style="width: 15rem">
          </div>
          <div class="col">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
              <div class="fw-bold">Nombre</div>
                ${pers.firstName}
              </div>
              </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
              <div class="fw-bold">Apellido</div>
              ${pers.lastName}
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
              <div class="fw-bold">Nombre Completo</div>
              ${pers.fullName}
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
              <div class="fw-bold">Título</div>
              ${pers.title}
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
              <div class="fw-bold">Id</div>
              ${pers.id}
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
              <div class="fw-bold " >URL Imagen</div>
              <p class="break-all">${pers.imageUrl}</p>
              </div>
            </li>
          </ul>
          </div>            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-close" data-bs-dismiss="modal"></button>
          </div>
        </div>
      </div>
    </div>
  `;
    });

  // activar modal
  const modalElement = document.getElementById("modalDetails");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

// activacion de popover
document.addEventListener("DOMContentLoaded", function () {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
});

