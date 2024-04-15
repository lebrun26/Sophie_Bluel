// Page de connexion

function sendLogin(){
    const formulaireLogin = document.querySelector(".form_login")
    formulaireLogin.addEventListener("submit", async (event) =>{
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
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile
        })
       if(reponse.status === 200){
            const data = await reponse.json()
            const token = data.token
            window.localStorage.setItem("token", token)
            window.location.href = "../../index.html"
       }
       else{
            const loginError = document.querySelector(".loginError")
            const p = document.createElement("p")
            p.textContent = "Email et/ou Mot de passe incorrect"
            loginError.appendChild(p)
       }
    })
}
sendLogin()