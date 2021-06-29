import { Component } from '@angular/core';
import { ChatService } from './chat-service.service';
import { CesarService } from './cesar.service';
import { FormData } from './formData.model';
import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList: string[] = [];
  key: string = "";
  message: string = "";
  constructor(private socketService: ChatService, private cesarService: CesarService, private cryptoService: CryptoService) {
  }

  //All'avvio il componente si sottoscrive al servizio che riceve messaggi
  ngOnInit() {
    this.socketService.getMessagesObservable().subscribe(this.decodeData);
  }

  setKey(key: HTMLInputElement) {
    this.key = key.value;
  }

  //il metodo gestisce l'invio di un messaggio chimando la funzione send message
  sendMessage(formData: FormData) {
    console.log("form input: " + JSON.stringify(formData));

    let encoded: FormData = formData; //Preparo una variabile da criptare
    switch (formData.messageType) {
      //Se il tipo di messaggio è cesar allora cripto con cesarService
      case "cesar":
        encoded.message = this.cesarService.encode(formData.message, Number(this.key));
        break;
      //Se il tipo di messaggio è t-des allora cripto con cryptoService.encodeDes
      case "t-des":
        encoded.message = this.cryptoService.encodeDes(formData.message, this.key);
        break;
    }
    //Invio il messaggio cifrato
    this.socketService.sendMessage(JSON.stringify(encoded));

    this.message = "";

  }

  decodeData = (messageData: string) => {
    let received: FormData = JSON.parse(messageData);
    console.log("messagereceived: " + JSON.stringify(received))

    switch (received.messageType) {
      case "cesar":
        received.message = this.cesarService.decode(received.message, Number(this.key));
        break;

      case "t-des":
        received.message = this.cryptoService.decodeDes(received.message, this.key);
        break;
    }

    this.messageList.push("messaggio cifrato: " + messageData + " messaggio decifrato " + JSON.stringify(received));

  }

}


