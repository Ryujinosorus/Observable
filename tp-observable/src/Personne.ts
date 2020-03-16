export class Personne {
    nom: string;
    prenom: string;
    genre: string;
    adresse: string;
    codePostal: string;
    ville: string;
    telephone: string;
    email: string;
    ddn: string;

    constructor(obj?: any) {
        this.nom = obj && obj.nom || null;
        this.prenom = obj && obj.prenom || null;
        this.genre = obj && obj.genre || null;
        this.adresse = obj && obj.adresse || null;
        this.codePostal = obj && obj.codePostal || null;
        this.ville = obj && obj.ville || null;
        this.telephone = obj && obj.telephone || null;
        this.email = obj && obj.email || null;
        this.ddn = obj && obj.ddn || null;
    }

    toString() {
        return this.prenom + " " + this.nom;
    }
}
