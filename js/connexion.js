// data
const taches = [
    {
        id: 1,
        description: "Faire la vaisselle",
        completed: false,
    },
    {
        id: 2,
        description: "Faire le ménage",
        completed: false,
    },
    {
        id: 3,
        description: "Réparer le moteur",
        completed: true,
    },
    {
        id: 4,
        description: "Nettoyer la salle",
        completed: false,
    },
    {
        id: 5,
        description: "Faire la cuisine",
        completed: true,
    },
    {
        id: 6,
        description: "Faire le lit",
        completed: false,
    },
    {
        id: 7,
        description: "Faire le repassage",
        completed: true,
    },
    {
        id: 8,
        description: "Faire les courses",
        completed: false,
    },
    {
        id: 9,
        description: "Faire le jardin",
        completed: true,
    },
    {
        id: 10,
        description: "Faire le ménage",
        completed: false,
    }

];

//tableau d'utilisateur
const users = [
    {
        id: 1,
        name: "Badara Ba",
        image: "logo4.jpg",
        login: "badara",
        mdp: "1234",
    },
    {
        id: 2,
        name: "Moussa Fall",
        image: "logo3.jpg",
        login: "moussa",
        mdp: "1234",
    },
    {
        id: 3,
        name: "Awa Sene",
        image: "logo.png",
        login: "awa",
        mdp: "1234",
    },
    {
        id: 4,
        name: "Abssatou Faye",
        image: "logo2.jpg",
        login: "abssatou",
        mdp: "1234",
    },
    {
        id: 5,
        name: "Samba Diop",
        image: "logo1.jpg",
        login: "samba",
        mdp: "1234",
    }
];
if (!localStorage.getItem("taches")) {
    localStorage.setItem("taches", JSON.stringify(taches));
}
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

const btnLogin = document.getElementById('btnlogin');

btnLogin.addEventListener('click', async function () {
    const login = document.getElementById('login').value.trim();
    const pwd = document.getElementById('pwd').value.trim();

    const loginError = document.getElementById('loginError');
    const passwordError = document.getElementById('passwordError');

    loginError.textContent = "";
    passwordError.textContent = "";

    let hasError = false;

    // Validation des champs
    if (login === "") {
        loginError.textContent = "Login est requis.";
        hasError = true;
    }

    if (pwd === "") {
        passwordError.textContent = "Mot de passe est requis.";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    // Vérification de l'utilisateur
  const utilisateurs = JSON.parse(localStorage.getItem('users'));
  
    const utilisateur = utilisateurs.find(user => user.login === login && user.mdp === pwd);

    
    if (utilisateur) {
        console.log('Connexion réussie', utilisateur);
        localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateur));
        window.location.href = "../page/index.html";
      
    } else {
        document.getElementById('alertConnex').innerHTML = `<div  class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-300" role="alert">Login ou mot de passe incorrect.</div>`; 
        document.getElementById('pwd').value = ''; // Réinitialiser le mot de passe
    }
    
   
});

