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

