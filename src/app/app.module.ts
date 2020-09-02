//this is just text for git
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { QRScanner } from "@ionic-native/qr-scanner/ngx";

/*********** Angular fire */
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { IonicStorageModule } from "@ionic/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDlTYwr83_y8F-jNWEZEf1MOFfaYoeDXw8",
  authDomain: "keep-change.firebaseapp.com",
  databaseURL: "https://keep-change.firebaseio.com",
  projectId: "keep-change",
  storageBucket: "keep-change.appspot.com",
  messagingSenderId: "113686140962",
  appId: "1:113686140962:web:a0f09751b184e2e2d8527b",
  measurementId: "G-WJTVHXX0Y2",
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), // Add this
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
