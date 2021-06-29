import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './chat-service.service';
import { CesarService } from './cesar.service';
import { CryptoService } from './crypto.service';
import { FormsModule } from '@angular/forms';

//Qui si dichiara la configurazione di Socket.io
const config: SocketIoConfig = {
  url: 'https://3000-purple-buzzard-fxtm6ont.ws-eu08.gitpod.io',
  options: {},
  /*options: { transports: ['websocket', 'polling', 'flashsocket'] } <- da provare nel caso dia problemi CORS */
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config), //Aggiungi SocketIo tra le librerie
    FormsModule
  ],
  providers: [ChatService, CesarService, CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
