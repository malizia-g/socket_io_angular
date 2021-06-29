import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(private socket: Socket) {}

  //Qui viene emesso un nuovo messaggio con etichetta 'new-message'
  sendMessage(msg: string) {
    this.socket.emit('new-message', msg);
  }

  //Qui viene generato un Observable che sta in ascolto dei messaggi di tipo 'resp-message'
  getMessagesObservable() : Observable<string> {
    return this.socket.fromEvent('resp-message');
  }
}
