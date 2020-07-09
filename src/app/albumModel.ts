export class Album {
    constructor(
      public artiste: string,
      public description: string,
      public image: string,
      public sortie: string,
      public nombre:string,
      public titres:string,
      public nom:string,
      public idAlbum:string
    ){
      this.artiste = artiste;
      this.description = description;
      this.sortie = sortie;
      this.image = image;
      this.nombre = nombre;
      this.nom = nom;
      this.titres = titres;
      this.idAlbum = idAlbum;
    }
  }
  