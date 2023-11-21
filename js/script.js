//podemos investigar os atributos de cada json para sacar nas cards
fetch("https://thronesapi.com/api/v2/Characters")
.then(response => response.json())
//.then(json => console.log(json))
    .then(json => {
      //engadir imaxes a web
      console.log(json)
      let i = 0;
      json.forEach(personaje => {
        const image = document.createElement("img")
        image.setAttribute("src", json[i].imageUrl)
        image.setAttribute("class", "cartas")
        const contenedor2 = document.getElementsByClassName("container2")[0]
        contenedor2.appendChild(image)
        i++;
      });
    })

.catch(error => console.error(error))

