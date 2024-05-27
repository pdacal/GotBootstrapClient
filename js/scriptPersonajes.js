// recolller os datos na api e transformalos a obxetos para introducilos na bootstrap-table
async function getDataCharacters() {
  try {
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    const characters = await response.json();
    // Preparar datos para introducilos como data na bootstrap-table(plugin)
    const data = characters.map((character) => ({
      image: `<img src="${character.imageUrl}" class="rounded" alt="${character.fullName}" style="width: 8rem; height: 8rem; object-fit: cover;">`,
      id: character.id,
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

