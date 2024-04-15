// Page de connexion

function sendLogin(){
    const formulaireLogin = document.querySelector(".form_login")
    formulaireLogin.addEventListener("submit", (event) =>{
        event.preventDefault()

        // Récupération des valeurs saisies par l'utilisateur
        const email = event.target.querySelector("[name=email]").value
        const password = event.target.querySelector("[name=password]").value

        // Test si les données d'entrée son correct
        if(!email || ! password){
            console.error("Veuillez saisir un e-mail et un mot de passe valides.")
            return
        }

        // Création de l'objet à envoyer
        const login = {
            email: email,
            password: password
        }
        // Création de la charge utile au format Json
        const chargeUtile = JSON.stringify(login)

        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile
        })
        .then(reponse => {
            // Traiter les données de la réponse
            console.log(reponse)
            return reponse.json()
        })
        .then(data => {
            console.log(data)
            window.localStorage.setItem("token", data.token)
            console.log("ok")  
            window.location.href= "/FrontEnd"
            if (data.status === 404) {
                throw new Error("User not found.")
            }
            else if (data.status === 401) {
                throw new Error("Not Authorized.")
            }
        })
        .catch(error => {
            console.error(error);
        });
    })
}
sendLogin()