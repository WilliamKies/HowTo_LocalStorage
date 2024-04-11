/**
 * Fonction pour sauvegarder les données dans le localStorage en utilisant « localStorage.setitem() »
 * ! La variable « donnees » utilise du ternaire, pour récupérer les données stockées en LocalStorage et 
 * @param {*} formId 
 */
function sauvegardeDonnees(formId) {
    const form = document.getElementById(formId);
    const nom = form.querySelector('#name').value;
    const prenom = form.querySelector('#firstname').value;
    const email = form.querySelector('#email').value;
    const mdp = form.querySelector('#password').value;
    let donnees = localStorage.getItem('DonnéesUtilisateurs') ? JSON.parse(localStorage.getItem('DonnéesUtilisateurs')) : [];

    donnees.push({ nom, prenom, email, mdp });
    localStorage.setItem('DonnéesUtilisateurs', JSON.stringify(donnees));
}

/**
 * Fonction pour afficher les données sauvegardées en localStorage en utilisant « localStorage.getItem() »
 */
function affichageDonnees() {
    const affichageDonnees = document.getElementById('affichageDonnees');
    affichageDonnees.innerHTML = ''; // Vide le contenu de la liste avant d'ajouter de nouveaux éléments
    
    const data = JSON.parse(localStorage.getItem('DonnéesUtilisateurs'));
    if (data) {
        data.forEach(item => {
            const p = document.createElement('p');
            p.innerHTML = (`<small><i>Nom&Prénom: ${item.nom} ${item.prenom}<br>Mail: ${item.email}<br>Mdp: ${item.mdp}</i></small>`);
            affichageDonnees.appendChild(p);
        });
    }
}

/**
 * Écouteur d'événement pour la soumission du formulaire et ainsi, lors de l'appel des fonctions présente, pouvoir sauvegarder et afficher les données
 */
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const formId = form.getAttribute('id');
        sauvegardeDonnees(formId);
        affichageDonnees();
        form.reset();
    });
});

/**
 * Écouteur d'événement pour le bouton de suppression des données en utilisant « localStorage.clear() ». Possibilité d'utiliser « localStorage.removeItem('Donnéesutilisateurs) ».
 */
document.querySelector('#btnSuppr').addEventListener('click', function() {
    // Suppression de toutes les données présentes dans le localStorage
    // localStorage.clear();

    // Suppression seulement de la donnée « DonnéesUtilisateurs » dans le localStorage
    localStorage.removeItem('DonnéesUtilisateurs'); 
    
    affichageDonnees();
});
  
/**
 * Afficher les données initiales
 */
affichageDonnees();