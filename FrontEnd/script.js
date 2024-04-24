const reponse = await fetch("http://localhost:5678/api/works")
const projet = await reponse.json()
const reponsecategory = await fetch("http://localhost:5678/api/categories")
const categories = await reponsecategory.json()

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
    const tousfilter = projet.filter( (tous) =>{
        return projet
    
    })
    document.querySelector(".gallery").innerHTML = ""
    genereProjet(projet)
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

// Ajout ou suppression du mode admin
const token = window.localStorage.getItem("token")
console.log(token)
function adminMode(){
    const headBandAdmin = document.querySelector(".admin_mode")
    const modifAdmin = document.querySelector("#btn_modif")
    const header = document.querySelector("header")
    const isAdmin = token !== null && token !== undefined
    if(isAdmin){
        headBandAdmin.classList.remove("admin_mode_disabled")
        modifAdmin.classList.remove("admin_mode_disabled")
    }
    else{
        headBandAdmin.classList.add("admin_mode_disabled")
        modifAdmin.classList.add("admin_mode_disabled")
        header.classList.add("header_origin_margin")
    }
}
adminMode()

// Système de logout

function logInOut(){
    const btnLogin = document.querySelector(".login") 
    const storedToken = window.localStorage.getItem("token")

    btnLogin.addEventListener("click", () => {
        if(storedToken){
            window.localStorage.removeItem("token")
            btnLogin.textContent = "login"
            window.location.reload()
        }
        else{
            window.location.href = "assets/pages/page_connexion.html"
        }
    })
    // Mettre a jour le boutton login ou logout
    if(storedToken){
        btnLogin.textContent = "Logout"
    }
    else{
        btnLogin.textContent = "login"
    }
}
logInOut()

// Modale génération des projets avec petite poubelle.
const containerModaleProjet = document.querySelector(".preview_projet")
function modaleProjet(container){
    for(let i = 0; i < projet.length; i++){
        const projetAccueil = projet[i]
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src = projetAccueil.imageUrl
        figure.appendChild(img)
        // Poubelle
        const trash = document.createElement("i")
        trash.classList.add("fa-solid", "fa-trash-can")
        figure.appendChild(trash)

        containerModaleProjet.appendChild(figure)
    } 
}
modaleProjet(projet)

// Ouvrir/Fermer modale

const btnModif = document.querySelector("#btn_modif")
const backgroundModale = document.querySelector(".background__modale")
const containerModale = document.querySelector(".modale__container")
function openModale(){
    btnModif.addEventListener("click", () =>{
        backgroundModale.classList.remove("modale_admin")
        containerModale.classList.remove("modale_admin")
    })
}
openModale()

function closeModale(){
    const close = document.querySelector(".fa-xmark")
    close.addEventListener("click", () =>{
        backgroundModale.classList.add("modale_admin")
        containerModale.classList.add("modale_admin")
        modale1.style.display = "flex"
        modale2.style.display = "none"
        btnModale.style.display = "flex"
        btnAdd.style.display = "none"
        backArrow.style.display = "none"
        containerCloseModale.style.justifyContent = "end"
        containerCloseModale.style.margin ="25px 25px 0 0"
    })
}
closeModale()

// Passer de la modale 1 à la modale 2

const btnModale = document.querySelector(".btn__modale")
const modale1 = document.querySelector(".preview_projet")
const modale2 = document.querySelector(".add_projet")
const btnAdd = document.querySelector(".btn__modale__add")
const backArrow = document.querySelector(".fa-arrow-left")
const containerCloseModale = document.querySelector(".close_modale")
function addPicture(){
    btnModale.addEventListener("click", () =>{
        modale1.style.display = "none"
        modale2.style.display = "flex"
        btnModale.style.display = "none"
        btnAdd.style.display = "flex"
        backArrow.style.display = "block"
        containerCloseModale.style.justifyContent = "space-between"
        containerCloseModale.style.margin = "25px 25px 0 25px"
    })
}
addPicture()

// Passer de la modale 2 a la modale 1
function comeBack(){
    backArrow.addEventListener("click", () =>{
        modale1.style.display = "flex"
        modale2.style.display = "none"
        btnModale.style.display = "flex"
        btnAdd.style.display = "none"
        backArrow.style.display = "none"
        containerCloseModale.style.justifyContent = "end"
        containerCloseModale.style.margin ="25px 25px 0 0"
    })
}
comeBack()
