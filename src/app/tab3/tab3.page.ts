import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { MediaObject, Media } from '@ionic-native/media/ngx';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MusiqueService } from '../musique-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  





    musique: MediaObject = null;
    playAudio:string = "play";
    class:string= "norotating";
    idTitre:string="";
    imageURL:string="assets/image/blanc.jpg";
    titre:string="";
    artiste:string="";
    audioURL:string="";
    duree:number = 0;
    Observable: Observable<any>;
  
    constructor(private media:Media, private route: ActivatedRoute, private musiqueService: MusiqueService, private router: Router, public loadingCtrl: LoadingController,
      private storage: Storage) {
  
      console.log(this.musique);
      this.route.params
      .subscribe( params => this.idTitre = params.indice);
  
  
    }
  
    getTitle(){
      
      this.musiqueService.getTitle(this.idTitre)
      .subscribe(data=>{
        this.artiste =  data.artiste;
        this.titre =  data.titre;
        this.audioURL =  data.lien;
        
        this.musiqueService.getAlbum(data.album)
        .subscribe(data=>{
          this.artiste =  data.artiste;
          this.imageURL =  data.image;
          console.log(this.imageURL);

          this.play();
          this.class='rotating';
        });
      });
    }
    
    ngOnInit(){
      if(this.idTitre != ""){
        this.getTitle();
      }
      
    }
  
  
    play(){
      if(this.audioURL != null || this.audioURL != ""){
        if(this.musique == null)
         this.musique = this.media.create(this.audioURL);
        console.log(this.musique);
        this.musique.play()
        this.playAudio =  "pause";
      }
  
    }
    
  
    pause(){
      this.playAudio =  "play";
      this.musique.pause();
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
