import { Component } from '@angular/core';
import { ChatService } from './chat-service.service';
import { CesarService } from './cesar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList: string[] = [];
  key: string = "";
  constructor(private socketService: ChatService, private cesarService: CesarService) {
  }

  //All'avvio il componente si sottoscrive al servizio che riceve messaggi
  ngOnInit() {
    this.socketService.getMessagesObservable()
      .subscribe((message: string) => {
        //Ogni volta che arriva un messaggio lo si aggiunge a una lista
        this.messageList.push(this.cesarService.decode(message,  Number(this.key)));
        console.log("messagereceived: " + message)
      });
  }

  setKey(key: HTMLInputElement) {
    this.key = key.value;
  }

  //il metodo gestisce l'invio di un messaggio chimando la funzione send message
  sendMessage(message: HTMLInputElement) {
    this.socketService.sendMessage(this.cesarService.encode(message.value, Number(this.key)));
    console.log("sent: " + message.value)
    message.value = "";
  }
}
