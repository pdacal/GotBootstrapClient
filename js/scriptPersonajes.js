fetch("https://thronesapi.com/api/v2/Characters")
.then(response => response.json())
//.then(json => console.log(json))
    .then(json => {
      let i = 0;
      json.forEach(personaje => {
        //col4
        const columna = document.createElement("div")
        columna.setAttribute("class", "col-xxl-3 col-lg-4 col-md-6 col-sm-12 mt-4")
        //card
        const divCard = document.createElement("div")
        divCard.setAttribute("class", "card")
        divCard.setAttribute("style", "width: 18rem; height: auto") //ou 33rem
        //imagen
        const image = document.createElement("img")
        image.setAttribute("class", "card-img-top cartas")
        image.setAttribute("src", json[i].imageUrl)
        image.setAttribute("alt", json[i].firstName)
        //card-body
        const cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        //card-title
        const cardTitle = document.createElement("h5")
        cardTitle.setAttribute("class", "card-title text-center")
        cardTitle.innerText = json[i].fullName
        //card-text
        const cardText = document.createElement("p")
        cardText.setAttribute("class", "card-text text-center")
        cardText.innerText= json[i].title
        //footer card
        const cardFooter = document.createElement("div")
        cardFooter.setAttribute("class", "card-footer text-center")
        cardFooter.innerText = json[i].family
        //coller contenedor no que se vai introducir
        const contenedor3 = document.getElementsByClassName("carta-personaje")[0]
        //engadir ao cardBody
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardText)

        //engadir divCard
        divCard.appendChild(image)
        divCard.appendChild(cardBody)
        divCard.appendChild(cardFooter)
        //engadir a columna
        columna.appendChild(divCard)
        //engadir ao div principal
        contenedor3.appendChild(columna)
        i++;
      });
    })

.catch(error => console.error(error))


// activacion de popover
document.addEventListener('DOMContentLoaded', function () {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

