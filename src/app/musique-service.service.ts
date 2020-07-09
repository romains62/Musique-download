import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Artist } from './artistModel';
import { Album } from './albumModel';
import { Title } from './titleModel';
import { filter } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class MusiqueService {

  av = [];
  constructor(private http: HttpClient) { }

  getAllArtists():Observable<Artist[]>{
    return this.http.get<Artist[]>('https://musique-945af.firebaseio.com/musique/artiste.json')
      .pipe(
        map(data => {   
          return data;
      })
      );
  }

  getAllAlbums():Observable<Album[]>{
    return this.http.get<Album[]>('https://musique-945af.firebaseio.com/musique/album.json')
      .pipe(
        map(data=>data)
      );
  }

  getAllAlbumsFromArtist(key):Observable<Album[]>{
    return this.http.get<Album[]>('https://musique-945af.firebaseio.com/musique/artiste/'+ key+'/album.json')
      .pipe(
        map(data=>data)
      );
  }

  getAllTitlesFromAlbum(key):Observable<Title[]>{
    return this.http.get<Title[]>('https://musique-945af.firebaseio.com/musique/album/'+ key+'/titre.json')
      .pipe(
        map(data=>data)
      );
  }

  getAllTitles():Observable<Title[]>{
    return this.http.get<Title[]>('https://musique-945af.firebaseio.com/musique/titre.json')
      .pipe(
        map(data=>data)
      );
  }

  getTitle(key):Observable<Title>{
    return this.http.get<Title>('https://musique-945af.firebaseio.com/musique/titre/'+key+'.json')
      .pipe(
        map(data=>data)
      );
  }

  getAlbum(key):Observable<Album>{
    return this.http.get<Album>('https://musique-945af.firebaseio.com/musique/album/'+key+'.json')
      .pipe(
        map(data=>data)
      );
  }
}
