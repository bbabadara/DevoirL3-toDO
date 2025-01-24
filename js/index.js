 const logoutBtn=document.getElementById("logoutBtn");
 const inputSearch = document.getElementById("searchInput");

 //verifier connexion
 const user=localStorage.getItem("utilisateurConnecte");
    if(user==null){
        window.location.href="../page/connexion.html";
    }
//deconnexion
logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("utilisateurConnecte");
    window.location.href="../page/connexion.html";
});
 // Gestion du mode sombre
 document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const root = document.documentElement;

    // Charger le thème initial depuis localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Ajouter un événement pour basculer le thème
    toggleDarkModeButton.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });

 // Gestion de l'affichage du modal
 const addTaskButton = document.getElementById("addTaskButton");
 const taskModal = document.getElementById("taskModal");
 const closeModalButton = document.getElementById("closeModalButton");

 addTaskButton.addEventListener("click", () => {
     taskModal.classList.remove("hidden");
 });

 closeModalButton.addEventListener("click", () => {
     taskModal.classList.add("hidden");
 });
/////////////////////// evenement///////////////////////
//chargement de la page
 window.addEventListener("DOMContentLoaded", () => {
    const taches = getTaches();
    console.log(taches);
    
    creerTbody(taches);
 });

//  recherche
inputSearch.addEventListener("input", function() {
    const taches = getTaches();
    const tasksToShow = taches.filter((task) => {
        const searchValue = inputSearch.value.toLowerCase();
        return (
          task.description.toLowerCase().includes(searchValue)
        );
      });
      creerTbody(tasksToShow); 
})

///////////////////////////fonction////////////////

function getId() {
    return getTaches().length + 1
}

function getTaches() {
    return JSON.parse(localStorage.getItem("taches"))
}

function updateTaches(tab) {
    localStorage.setItem("taches", JSON.stringify(tab))
}


function creerTr(task) {
    const taskRow = document.createElement("tr");
      taskRow.setAttribute("draggable", true);
      taskRow.classList.add("task", "hover:bg-gray-100", "dark:hover:bg-gray-600");
  
      taskRow.innerHTML = `
            <td class="px-4 py-2"><input type="checkbox" name="task"></td>
            <span>${task.description}</span>
             <input type="text" class="form-control" data-id="${task.id}"  value="${task.description}" hidden onchange="modifierTache(this)"  />
            </td>
            
            <td class="px-4 py-2">
    <div class="flex items-center justify-center">
    <button class="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400" onclick="btnModif(this)">
        <span class="material-symbols-outlined"> edit_note </span>
    </button>
    <button class="bg-red-500 text-white p-2 py rounded hover:bg-red-400" onclick="delTache(${task.id})">
        <span class="material-symbols-outlined"> delete </span>
    </button>
</div>
            </td>
        `;
    return taskRow;
  }

  // fonction generer tbody
    function creerTbody(tasks) {
        const tbody = document.querySelector("#listeTaches");
        tbody.innerHTML = "";
        // Parcourir les tâches et générer les tr
        tasks.forEach((task) => {
        tbody.appendChild(creerTr(task));
        });
        return tbody;
    }

    function btnModif(buttonElement) {
        // Sélectionner la ligne de la tâche (tr) parent du bouton
        const taskRow = buttonElement.closest("tr");
        taskRow.querySelector("span").setAttribute("hidden", true);
        // Sélectionner l'élément <input> caché de la tâche
        const descriptionInput = taskRow.querySelector("input[type='text']");
    
        // Enlever l'attribut 'hidden' pour rendre l'input visible
        descriptionInput.removeAttribute("hidden");
    
        // Facultatif: Mettre le champ de texte en mode édition (focus sur le champ)
        descriptionInput.focus();
    }
    
    //modifier tache
    function modifierTache(inputElement) {
        
        const taskId = parseInt(inputElement.dataset.id); // Récupérer l'ID de la tâche
        const newDescription = inputElement.value; // Nouvelle description
        const taches = getTaches();
        // Mettre à jour la tâche dans le tableau
        const task = taches.find(t => t.id === taskId);
        if (task) {
            task.description = newDescription;
    
            // Mettre à jour dans localStorage
            updateTaches(taches);
    
            // Mettre à jour l'affichage
            creerTbody(taches);
        }
    }
    //fonction supprimer la tâche
function delTache(taskId) {
    const taches= getTaches();
    // Supprimer la tâche du tableau `taches`
    const upTaches = taches.filter(task => task.id !== taskId);
    // Mettre à jour localStorage
    updateTaches(upTaches);
    //supprimer la tâche de l'affichage
    const taskRow = document.querySelector(`tr[data-id="${taskId}"]`);
    if (taskRow) {
        taskRow.remove();
    }
}
