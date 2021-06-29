import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './chat-service.service';

//Qui si dichiara la configurazione di Socket.io
const config: SocketIoConfig = {
  url: 'TUO_URL',
  options: {},
  /*options: { transports: ['websocket', 'polling', 'flashsocket'] } <- da provare nel caso dia problemi CORS */
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config) //Aggiungi SocketIo tra le librerie
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
