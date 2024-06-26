
let imageWorks
// Appel et mise en place des projets pour la page d'accueil
const gallery = document.querySelector(".gallery")

// Appel de l'api
async function callApi(){
    const reponse = await fetch("http://localhost:5678/api/works")
    const projet = await reponse.json()
    imageWorks = projet
}
callApi()

async function callApiAndGenerateProjets(){
    await callApi()
    genereProjet()
}
callApiAndGenerateProjets()

// fonction pour généré les projets

async function genereProjet(projets = imageWorks){
    if (!projets){
        return
    }
    gallery.innerHTML = ""
    for(let i = 0; i < projets.length; i++){
        const projetAccueil = projets[i]
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src = projetAccueil.imageUrl
        figure.appendChild(img)
        const figcaption = document.createElement("figcaption")
        figcaption.textContent = projetAccueil.title
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    }
    modaleProjet()
}
genereProjet()

const reponsecategory = await fetch("http://localhost:5678/api/categories")
const categories = await reponsecategory.json()

// Filtre de la page


const filter = document.createElement("div");
filter.classList = "container__filter";

const btnTous = document.createElement("button")
btnTous.classList = "btn__filter"
btnTous.textContent = "Tous"
filter.appendChild(btnTous)
btnTous.addEventListener("click", () =>{
    gallery.innerHTML = ""
    genereProjet()
})

categories.forEach(category => {
    const btnFilter = document.createElement("button")
    btnFilter.classList = "btn__filter"
    btnFilter.textContent = category.name
    filter.appendChild(btnFilter)

    // Ajout événements pour chaque bouton
    btnFilter.addEventListener("click", () => {
        const filterProjects = imageWorks.filter(project => project.categoryId === category.id);
        gallery.innerHTML = ""
        genereProjet(filterProjects);
    });
});


// Rattachement à son parent portfolio
const portfolio = document.querySelector("#portfolio")
portfolio.appendChild(filter)

// je met la div crée filter avant la div gallery
portfolio.insertBefore(filter, gallery)

// Ajout ou suppression du mode admin
const token = window.localStorage.getItem("token")
function adminMode(){
    const headBandAdmin = document.querySelector(".admin_mode")
    const modifAdmin = document.querySelector("#btn_modif")
    const header = document.querySelector("header")
    const containerFilter = document.querySelector(".container__filter")
    const isAdmin = token !== null && token !== undefined
    if(isAdmin){
        headBandAdmin.classList.remove("admin_mode_disabled")
        modifAdmin.classList.remove("admin_mode_disabled")
        containerFilter.style.display = "none"
    }
    else{
        headBandAdmin.classList.add("admin_mode_disabled")
        modifAdmin.classList.add("admin_mode_disabled")
        header.classList.add("header_origin_margin")
        containerFilter.style.display = "flex"
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
function modaleProjet(){
    containerModaleProjet.innerHTML = ""
    for(let i = 0; i < imageWorks.length; i++){
        const projetAccueil = imageWorks[i]
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src = projetAccueil.imageUrl
        figure.appendChild(img)
        // Poubelle
        const trash = document.createElement("i")
        trash.classList.add("fa-solid", "fa-trash-can")
        trash.setAttribute("projet-id", projetAccueil.id)
        figure.appendChild(trash)

        containerModaleProjet.appendChild(figure)
    }
    const trash = document.querySelectorAll(".fa-trash-can")
    trash.forEach(trash => {
    trash.addEventListener("click", async (event) =>{
        const projetId = trash.getAttribute("projet-id")
        await deleteWork(projetId, token)
    })
})

}


// Ouvrir/Fermer modale

const btnModif = document.querySelector("#btn_modif")
const backgroundModale = document.querySelector(".background__modale")
const containerModale = document.querySelector(".modale__container")
const close = document.querySelector(".fa-xmark")
function openModale(){
    btnModif.addEventListener("click", () =>{
        backgroundModale.classList.remove("modale_admin")
        containerModale.classList.remove("modale_admin")
    })
}
openModale()

// fonction pour fermer la modale

function closeModale() {
    backgroundModale.classList.add("modale_admin")
    containerModale.classList.add("modale_admin")
    modale1.style.display = "flex"
    modale2.style.display = "none"
    btnModale.style.display = "flex"
    btnAdd.style.display = "none"
    backArrow.style.display = "none"
    containerCloseModale.style.justifyContent = "end"
    containerCloseModale.style.margin ="25px 25px 0 0"
    previewImage.src = ""
    previewImage.style["min-width"] = ""
    previewImage.style["min-height"] = ""
}

backgroundModale.addEventListener("click", () =>{
    closeModale()
})
close.addEventListener("click", () =>{
    closeModale()
})



// Passer de la modale 1 à la modale 2

const btnModale = document.querySelector(".btn__modale")
const modale1 = document.querySelector(".preview_projet")
const modale2 = document.querySelector(".add_projet")
const btnAdd = document.querySelector(".btn__modale__add")
const backArrow = document.querySelector(".fa-arrow-left")
const containerCloseModale = document.querySelector(".close_modale")
const lineModale1 = document.querySelector(".line__modale1")
function addPicture(){
    btnModale.addEventListener("click", () =>{
        modale1.style.display = "none"
        modale2.style.display = "flex"
        btnModale.style.display = "none"
        btnAdd.style.display = "flex"
        backArrow.style.display = "block"
        containerCloseModale.style.justifyContent = "space-between"
        containerCloseModale.style.margin = "25px 25px 0 25px"
        lineModale1.style.display = "none"

        // Déclenchement manuel de l'événement "input" pour le champ de titre
        titleFormAdd.dispatchEvent(new Event('input'))
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
        previewImage.src = ""
        lineModale1.style.display = "flex"
    })
}
comeBack()

// Preview de l'image ajouter dans le input type file

const upload = document.querySelector("#picture")
const previewImage = document.querySelector("#preview")
function previewUpload(){
    upload.addEventListener("change", async () =>{
        const file = await upload.files[0]
        if(file){
        const isValidFile = checkFile(file)
            if (isValidFile) {
                previewImage.src = URL.createObjectURL(file)
                previewImage.style["min-width"] = "176px"
                previewImage.style["min-height"] = "168px"
            } else {
                // Affichage d'un message d'erreur si le fichier n'est pas valide
                alert("Le fichier doit être un JPG ou un PNG et ne doit pas dépasser 4 Mo.")
                upload.value = ""; // Efface la sélection du fichier
                previewImage.src = "";
            }
        } else{
            previewImage.src = ""
        }
    })
}
previewUpload()

// Ajout des option select
const categoriesAdd = document.querySelector("#categories_add")

categories.forEach(category => {
    const option = document.createElement("option");
    option.textContent = category.name;
    categoriesAdd.appendChild(option);
})

// Delete projet


async function deleteWork(id, token){
    try {
        await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`
            }
        })
        callApiAndGenerateProjets()
    }
    catch(error){
        console.log(error)
    }
}

// Checking du format de l'image et de la taille max 4mo
function checkFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png']
    const maxSize = 4 * 1024 * 1024; // 4 Mo en octets

    // Vérification du type de fichier
    return (allowedTypes.includes(file.type) && file.size < maxSize) 
}


// Envoie d'une nouvelle photo

const formulaireAddPicture = document.querySelector("#formulaire_add_picture")
formulaireAddPicture.addEventListener("submit", async (event) =>{
    event.preventDefault()
    
    // Récupération de la saisie utilisateur
    const pictureAdd = event.target.querySelector("[name=picture]").files[0]
    const titleAdd = event.target.querySelector("[name=title_add_img]").value
    const categoriesAdd = event.target.querySelector("[name=categories_add]").value
    if(!pictureAdd || !titleAdd || !categoriesAdd){
    }
    // Condition pour mettre le bon id sur le choix de category
    let categoryId

    if(categoriesAdd === "Objets" ){
        categoryId = 1
    }
    else if (categoriesAdd === "Appartements"){
        categoryId = 2
    }
    else if (categoriesAdd === "Hotels & restaurants"){
        categoryId = 3
    }

    // construction et preparation du formdata
    const formulaireAdd = new FormData()
    formulaireAdd.append("image", pictureAdd)
    formulaireAdd.append("title", titleAdd)
    formulaireAdd.append("category", categoryId)


    // Envoie des données a l'API
    try {
        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST", 
            headers: {"Authorization": `Bearer ${token}`},
            body: formulaireAdd
        })
        if (reponse.ok){
            callApiAndGenerateProjets()
            closeModale()
        }
        else {
            console.error("Erreur lors de l'envoie des données à l'API")
        }
    }
    catch (error){
        console.error("Error", error)
    }
})

// Activer deactiver boutton valider en fonction de la saisi des champs "ajout photo"

const titleFormAdd = document.getElementById("title_add_img")
const pictureFormAdd = document.getElementById("picture")
const categoryFormAdd = document.getElementById("categories_add")
const btnFormAdd = document.querySelector(".btn__modale__add")

// Ecoute de chaque champs du formulaire

titleFormAdd.addEventListener("input", validateForm)
pictureFormAdd.addEventListener("change", validateForm)
categoryFormAdd.addEventListener("change", validateForm)

// Fonction pour valider le formulaire

function validateForm() {
    // Verification du contenue présent ou non dans les différentes sections du formulaire.
    const titleFilled = titleFormAdd.value.trim() != ""
    const pictureSelected = pictureFormAdd.files.length > 0
    const categorySelected = categoryFormAdd.value != ""

    // Activer/ Désactiver le bouton submit en fonction des champs remplis ou non 
    if (titleFilled && pictureSelected && categorySelected){
        btnFormAdd.removeAttribute("disabled")
        btnFormAdd.style.backgroundColor = "#1D6154"
    }
    else {
        btnFormAdd.setAttribute("disabled", "disabled")
        btnFormAdd.style.backgroundColor = "grey"
    }
}
