const reponse = await fetch("http://localhost:5678/api/works")
const projet = await reponse.json()
console.log(projet)

// Appel et mise en place des projets pour la page d'accueil
const gallery = document.querySelector(".gallery")

function genereProjet(){
    for(let i = 0; i < projet.length; i++){
        const projetAccueil = projet[i]
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src = projetAccueil.imageUrl
        figure.appendChild(img)
        const figcaption = document.createElement("figcaption")
        figcaption.textContent = projetAccueil.title
        figure.appendChild(figcaption)

        gallery.appendChild(figure)
    } 
}
genereProjet(projet)

// Filtre de la page

// création des boutons de filtre
// btn "Tous"
const filter = document.createElement("div")
filter.classList = "container__filter"
const btnTous = document.createElement("button")
btnTous.classList = "btn__filter"
btnTous.textContent = "Tous"


// btn "Objets"
const btnObjets = document.createElement("button")
btnObjets.classList = "btn__filter"
btnObjets.textContent = "Objets"

// btn "Appartements"
const btnAppartements = document.createElement("button")
btnAppartements.classList = "btn__filter"
btnAppartements.textContent = "Appartements"

// btn "Hotels & restaurants"

const btnHotel = document.createElement("button")
btnHotel.classList = "btn__filter"
btnHotel.textContent = "Hotel & restaurants"

// Je relie les btn a leurs parents div -> "container__filter"

filter.appendChild(btnTous)
filter.appendChild(btnObjets)
filter.appendChild(btnAppartements)
filter.appendChild(btnHotel)
console.log(filter)

// je relie filter a son parent portfolio
const portfolio = document.querySelector("#portfolio")
portfolio.appendChild(filter)
// je met la div crée filter avant la div gallery
portfolio.insertBefore(filter, gallery)