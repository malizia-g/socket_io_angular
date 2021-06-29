import { Component } from '@angular/core';
import { ChatService } from './chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];

  constructor(private socketService: ChatService) {
  }

  //All'avvio il componente si sottoscrive al servizio che riceve messaggi
  ngOnInit() {
    this.socketService.getMessagesObservable()
      .subscribe((message: string) => {
        //Ogni volta che arriva un messaggio lo si aggiunge a una lista
        this.messageList.push(message);
        console.log("messagereceived: " + message)
      });
  }

  //il metodo gestisce l'invio di un messaggio chimando la funzione send message
  sendMessage(message: HTMLInputElement) {
    this.socketService.sendMessage(message.value);
    console.log("sent: " + message.value)
    message.value="";
  }
}
