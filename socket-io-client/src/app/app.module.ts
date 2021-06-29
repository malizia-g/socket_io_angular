import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './chat-service.service';

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
    SocketIoModule.forRoot(config)
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
