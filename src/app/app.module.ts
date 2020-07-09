import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { PhonegapLocalNotification} from '@ionic-native/phonegap-local-notification/ngx';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { Storage, IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,IonicStorageModule.forRoot()] ,
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Media,
    StreamingMedia,
    FileTransfer,  
    FileTransferObject,
    File,
    LocalNotifications,
    PhonegapLocalNotification,
    MusicControls,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
