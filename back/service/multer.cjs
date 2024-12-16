// Module pour gérer les opérations sur les fichiers
const fs = require('fs')
// Module pour gérer l'upload de fichiers
const multer = require('multer')
// Module pour gérer les chemins de fichiers
const path = require('path')
// Définir le chemin du dossier où seront stockés les fichiers uploadés
const uploadFolder = path.join(__dirname, '../uploads');

// On vérifie si le dossier "uploads" existe, sinon on le créer.
if(!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
    console.log("Le dossier 'uploads' a bien été créé.")
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //Définition de la destination des fichiers uploadés.
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => { // Définition du nom des fichiers uploadés.
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

// On créer l'instance Multer avec la configuration de stockage
const upload = multer({storage: storage})

// On exporte maintenant le middleware multer configuré :
module.exports = upload;