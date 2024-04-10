const reponse = await fetch("http://localhost:5678/api/works")
const projet = await reponse.json()
const reponsecategory = await fetch("http://localhost:5678/api/categories")
const categories = await reponsecategory.json()
console.log(projet)
console.log(categories)

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


const filter = document.createElement("div");
filter.classList = "container__filter";

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

categories.forEach(category => {
    const btnFilter = document.createElement("button");
    btnFilter.classList = "btn__filter";
    btnFilter.textContent = category.name;
    filter.appendChild(btnFilter);

    // Ajout événements pour chaque bouton
    btnFilter.addEventListener("click", () => {
        console.log("Vous avez cliqué sur le bouton " + category.name);
        const filterProjects = projet.filter(project => project.categoryId === category.id);
        document.querySelector(".gallery").innerHTML = "";
        genereProjet(filterProjects);
        console.log(filterProjects);
    });
});


// Rattachement à son parent portfolio
const portfolio = document.querySelector("#portfolio")
portfolio.appendChild(filter)

// je met la div crée filter avant la div gallery
portfolio.insertBefore(filter, gallery)

