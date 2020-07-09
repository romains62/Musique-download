import { Component, Pipe, PipeTransform } from '@angular/core';
import { MusiqueService } from '../musique-service.service';
import { Observable } from 'rxjs';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {
  constructor(private musiqueService : MusiqueService, private file: File, private transfer : FileTransfer, private localNotifications : LocalNotifications,
              private toastCtrl : ToastController,private storage : Storage, private router: Router  ){}

  artists = [];
  artistsAZ = [];
  albums = [];
  albumsAZ = [];
  titles = [];
  titlesAZ = [];
  classArtist = "list";
  classAlbum = "";
  classTitle = "";
  pourcentage = 0;
  type = "artists";
  segment = "artist";


  ngOnInit(){
    this.getAllArtists()
  }


  getAllArtists(){
    this.segment = "artist";
    this.musiqueService.getAllArtists()
      .subscribe(data => {
        
        for (let i = 0; i < Object.keys(data).length; i++) {
          this.artists.push({ 'key': Object.keys(data)[i], 'artiste': Object.values(data)[i].artiste });
          this.artists.sort((a,b) => a.artiste < b.artiste ? -1 : 1);
        }
        this.groupArtists(this.artists);
      });
  }

  getAllAlbums(artist?){
    this.segment = "album";
    if(artist == ""){
      this.musiqueService.getAllAlbums()
      .subscribe(data => {
        for (let i = 0; i < Object.keys(data).length; i++) {
  
          this.albums.push({ 'key': Object.keys(data)[i], 'cover': Object.values(data)[i].image, 
          'nom': Object.values(data)[i].nom })
          this.albums.sort((a,b) => a.nom < b.nom ? -1 : 1);
        }
        this.groupAlbums(this.albums);
      });
    }
    else{
      this.musiqueService.getAllAlbumsFromArtist(artist)
      .subscribe(data => {
        for (let i = 0; i < Object.keys(data).length; i++) {
          console.log(Object.values(data)[i].image);
          this.albums.push({ 'key': Object.values(data)[i].idAlbum, 'cover': Object.values(data)[i].image, 
          'nom': Object.values(data)[i].nom })
          this.albums.sort((a,b) => a.nom < b.nom ? -1 : 1);
        }
        this.groupAlbums(this.albums);
      }); 
    }

  }

  getAllTitles(album?){
    this.segment = "title";
    if(album == ""){
      this.musiqueService.getAllTitles()
      .subscribe(data => {
        for (let i = 0; i < Object.keys(data).length; i++) {
          var key = Object.keys(data)[i];
          var titre = Object.values(data)[i].titre;
          var url = Object.values(data)[i].lien;
          var num = Object.values(data)[i].numero;
          this.titles.push({ 'key': key, 'titre': titre, 'url': url, 'num':num  });
        }
        this.titles.sort((a,b) => a.titre < b.titre ? -1 : 1);
        this.groupTitles(this.titles);
      });
    }
    else{
      this.musiqueService.getAllTitlesFromAlbum(album)
      .subscribe(data => {
        for (let i = 0; i < Object.keys(data).length; i++) {
          var key = Object.values(data)[i].idTitre;
          var titre = Object.values(data)[i].titre;
          var url = Object.values(data)[i].lien;
          var num = Object.values(data)[i].numero;
          this.titles.push({ 'key': key, 'titre': titre, 'url': url , 'num':num });
        }
        this.titles.sort((a,b) => a.titre < b.titre ? -1 : 1);
        this.groupTitles(this.titles);
      });
    }

  }


  groupArtists(artists){

    let sortedArtists = artists.sort();
    let currentLetter = false;
    let currentArtists = [];
    
    sortedArtists.forEach((value, index) => {

        if(value.artiste.charAt(0) != currentLetter){

            currentLetter = value.artiste.charAt(0);

            let newGroup = {
                letter: currentLetter,
                artistes : []
            };

            currentArtists = newGroup.artistes;
            this.artistsAZ.push(newGroup);
        } 
        
        currentArtists.push(value);

    });
  }

  groupAlbums(albums){

  let sortedAlbums = albums.sort();
  let currentLetter = false;
  let currentAlbums = [];
  
  sortedAlbums.forEach((value, index) => {

      if(value.nom.charAt(0) != currentLetter){

          currentLetter = value.nom.charAt(0);

          let newGroup = {
              letter: currentLetter,
              albums : []
          };

          currentAlbums = newGroup.albums;
          this.albumsAZ.push(newGroup);
      } 
      
      currentAlbums.push(value);

  });
  }
  
  groupTitles(titles){
  let sortedTitles = titles.sort();
  let currentLetter = false;
  let currentTitles = [];

  sortedTitles.forEach((value, index) => {
      if(value.titre.charAt(0) != currentLetter){

          currentLetter = value.titre.charAt(0);

          let newGroup = {
              letter: currentLetter,
              titles : []
          };

          currentTitles = newGroup.titles;
          this.titlesAZ.push(newGroup);
      } 
      
      currentTitles.push(value);

  });
  }


  titlesFromAlbum(album){
    this.reinitializeListe();
    this.getAllTitles(album);
  }

  albumsFromArtist(artist){
    this.reinitializeListe();
    this.getAllAlbums(artist);
  }

  reinitializeListe(){
    this.albums = [];
    this.albumsAZ = [];
    this.artists = [];
    this.artistsAZ = [];
    this.titles = [];
    this.titlesAZ = [];
    this.classArtist = "";
    this.classAlbum = "";
    this.classTitle = "";
  }

  segmentChanged(ev: any) {
    this.reinitializeListe();
    this.segment = ev;
    if(ev== "artist"){
      this.classArtist = "list";
      this.getAllArtists();
    }
    else
    if(ev == "album"){
      this.classAlbum = "list";
      this.getAllAlbums("");
    }
    else
    if(ev == "title"){
      this.classTitle = "list";
      this.getAllTitles("");
    }
  }


  async presentToastSuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Téléchargé avec succés !',
      duration: 2000
    });
    toast.present();
  }

  async presentToastBegin() {
    const toast = await this.toastCtrl.create({
      message: 'Téléchargement ...',
      duration: 2000
    });
    toast.present();
  }

  changeTitle(key: string){
    this.storage.get('idTitre').then((val) => {
      if(val != null){
        if(val == key){
          this.storage.set('change', false)
        }
        else{
          this.storage.set('idTitre', key)
          this.storage.set('change', true)
        }
      }
      else{
        this.storage.set('idTitre', key)
        this.storage.set('change', true)
      }
    });
    this.router.navigate(['tabs/tab2'])
  }

  download(key:string){
    this.musiqueService.getTitle(key).subscribe(data =>{
      const nom = data.titre+'.mp3';
      const url = data.lien;
      const fileTransfer: FileTransferObject = this.transfer.create();
      this.localNotifications.schedule({
        sticky: true,
        clock: false, 
        vibrate: false, 
        id: 5,
        title: "Téléchargement de "+ nom,
        text: "0%",
        progressBar: {value: 0}
     });
      this.presentToastBegin();
     
      fileTransfer.download(url, this.file.externalRootDirectory+'Music/'+nom,true).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        console.log(entry);
        this.presentToastSuccess();
        this.localNotifications.schedule({
          id:1,
          text: nom +' téléchargé avec succés',
          led: 'FF0000',
          sound: null
       });
  
       var i;
       while(1){
          if(this.pourcentage == 100){
            this.pourcentage = 0;
            this.localNotifications.cancel(5);
            break;
          }
       }
        
  
      }, (error) => {
        console.log('error :/');
        console.log(error);
        
      });
  
  
      fileTransfer.onProgress((progressEvent) => {
        console.log(this.pourcentage);
  
  
        if (this.pourcentage < 100) {
          this.pourcentage = Math.floor(progressEvent.loaded / progressEvent.total * 100);  
          this.localNotifications.update({
            id: 5,
            text: this.pourcentage +"%",
            progressBar: {value: this.pourcentage}
         });
        } else {
          if (this.pourcentage  == 0) {
            console.log("Loading");
          } else {
            console.log(".");
          }
        }
      });
   
    });
  } 
  
 

}
