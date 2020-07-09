import { Component, OnInit } from '@angular/core';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { MediaObject, Media } from '@ionic-native/media/ngx';
import { NavController } from '@ionic/angular';
import { MusiqueService } from '../musique-service.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page  {

  file: MediaObject;
  class:string= "rotating";
  playAudio:string = "pause";
  idTitre:string;
  artiste:string;
  titre:string;
  audioURL:string;
  imageURL:string;



  constructor(public musicControls: MusicControls, public media: Media, public navCtrl: NavController, private musiqueService: MusiqueService,
    private route: ActivatedRoute, private storage: Storage) {
      
  }

  ionViewWillEnter(){
    console.log("Initialisation");
    this.storage.get('change').then((val) => {
      console.log(this.file)
      if(this.file != null){
        this.file.stop();
        this.musicControls.destroy();
        this.playAudio = "pause";
        this.class = "rotating";
        this.file = null;
      }

      this.storage.get('idTitre').then((value) => {
      this.idTitre = value;
      this.getTitle();

      });
    });

  }

  getTitle(){
    console.log("--- --- --- --- --- --- --- --- --- --- ---");  
    console.log("Récupération du Titre dans fireBase ("+ this.idTitre +")"); 
    this.musiqueService.getTitle(this.idTitre)
    .subscribe(data=>{
      console.log("--- --- --- --- --- --- --- --- --- --- ---");  
      console.log(data);
      //this.artiste =  data.artiste;
      this.titre =  data.titre;
      this.audioURL =  data.lien;

      this.musiqueService.getAlbum(data.album)
      .subscribe(data=>{
        console.log("--- --- --- --- --- --- --- --- --- --- ---");  
        console.log("Récupération de l'album dans fireBase");  
        this.artiste =  data.artiste;
        this.imageURL =  data.image;
        console.log(this.imageURL);
        this.play();
      })
    })
  }

  settingMusicControl(){
    this.musicControls.create({
      track       : this.titre,        
      artist      : this.artiste,                    
      cover : this.imageURL,      
      isPlaying   : true,                         
      dismissable : true,                         

      hasPrev   : false,      
      hasNext   : false,      
      hasClose  : true,     
      hasSkipForward : false,  
      hasSkipBackward : false,
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0

      ticker    : 'Musique en cours'

     });
     this.musicControls.subscribe().subscribe((action) => {
      console.log('action', action);
          const message = JSON.parse(action).message;
          console.log('message', message);
          switch(message) {
            case 'music-controls-next':
               // Do something
               break;
            case 'music-controls-previous':
               // Do something
               break;
            case 'music-controls-pause':

               console.log('music pause');
               this.pause();
               this.musicControls.listen(); 
               this.musicControls.updateIsPlaying(false);
               break;
            case 'music-controls-play':
               // Do something
               console.log('music play');
               this.play();
               this.musicControls.listen(); 
               this.musicControls.updateIsPlaying(true);
               break;
            case 'music-controls-destroy':
               // Do something
               break;
            // External controls (iOS only)
            case 'music-controls-toggle-play-pause' :
              // Do something
              break;
            case 'music-controls-seek-to':
              // Do something
              break;
            case 'music-controls-skip-forward':
              // Do something
              break;
            case 'music-controls-skip-backward':
              // Do something
              break;

              // Headset events (Android only)
              // All media button events are listed below
            case 'music-controls-media-button' :
                // Do something
                break;
            case 'music-controls-headset-unplugged':
                // Do something
                break;
            case 'music-controls-headset-plugged':
                // Do something
                break;
            default:
                break;
          }
    });
    this.musicControls.listen(); // activates the observable above
    this.musicControls.updateIsPlaying(true);
  }

  play(){
    console.log("--- --- --- --- --- --- --- --- --- --- ---");  
    console.log("Lancement de la musique");  
    if(this.file == null)
      this.file = this.media.create(this.audioURL);
    this.file.play();
    this.settingMusicControl();
    this.playAudio =  "pause";
  }

  pause(){
    console.log("--- --- --- --- --- --- --- --- --- --- ---");  
    console.log("Pause de la musique");  
    this.file.pause();
    this.musicControls.listen();
    this.musicControls.updateIsPlaying(false);
    this.playAudio =  "play";
}

AudioClick(type:string){
  if(type=="pause"){
    this.pause();
    this.class='norotating';
  }
  else{
    this.play();
    this.class='rotating';
  }
}

}
