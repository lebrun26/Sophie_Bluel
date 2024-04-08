const reponse = await fetch("http://localhost:5678/api/works")
const projet = await reponse.json()
console.log(projet)

// Appel et mise en place des projets pour la page d'accueil
const gallery = document.querySelector(".gallery")

function genereProjet(projet){
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

//boutton "Tous"
const filter = document.createElement("div")
filter.classList = "container__filter"
const btnTous = document.createElement("button")
btnTous.classList = "btn__filter"
btnTous.textContent = "Tous"
filter.appendChild(btnTous)
btnTous.addEventListener("click", () =>{
    console.log("Vous avez cliqué sur le bouton Tous")
    // Faire verifier variable a pierre car elle n'est pas lu
    const tousfilter = projet.filter( (tous) =>{
        return projet
    
    })
    document.querySelector(".gallery").innerHTML = ""
    genereProjet(projet)
    console.log(projet)
})

//Boutton "Objets"
const btnObjets = document.createElement("button")
btnObjets.classList = "btn__filter"
btnObjets.textContent = "Objets"
filter.appendChild(btnObjets)
btnObjets.addEventListener("click", () =>{
    console.log("Vous avez cliqué sur le bouton Objets")
    const objetsfilter = projet.filter( (objets) =>{
        return objets.categoryId === 1
    
    })
    document.querySelector(".gallery").innerHTML = ""
    genereProjet(objetsfilter)
    console.log(objetsfilter)
})


// Boutton "Appartements"
const btnAppartements = document.createElement("button")
btnAppartements.classList = "btn__filter"
btnAppartements.textContent = "Appartements"
filter.appendChild(btnAppartements)
btnAppartements.addEventListener("click", () =>{
    console.log("Vous avez cliqué sur le bouton Appartement")
    const appartementsfilter = projet.filter( (appartements) =>{
        return appartements.categoryId === 2
    
    })
    document.querySelector(".gallery").innerHTML = ""
    genereProjet(appartementsfilter)
    console.log(appartementsfilter)
})

// Boutton "Hotel"
const btnHotel = document.createElement("button")
btnHotel.classList = "btn__filter"
btnHotel.textContent = "Hotel & restaurants"
filter.appendChild(btnHotel)
btnHotel.addEventListener("click", () =>{
    console.log("Vous avez cliqué sur le bouton Hotel")
    const hotelfilter = projet.filter( (hotel) =>{
        return hotel.categoryId === 3
    
    })
    document.querySelector(".gallery").innerHTML = ""
    genereProjet(hotelfilter)
    console.log(hotelfilter)
})

// Rattachement à son parent portfolio
const portfolio = document.querySelector("#portfolio")
portfolio.appendChild(filter)

// je met la div crée filter avant la div gallery
portfolio.insertBefore(filter, gallery)
