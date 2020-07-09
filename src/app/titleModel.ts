export class Title {
    constructor(
      public artiste: string,
      public titre: string,
      public album: string,
      public lien: string,
      public numero:string,
      public image:string,
      public nom:string,
      public idTitre: string
    ){
      this.artiste = artiste;
      this.titre = titre;
      this.lien = lien;
      this.album = album;
      this.numero = numero;
      this.nom = nom;
      this.image = image;
      this.idTitre = idTitre;
    }
  }
  