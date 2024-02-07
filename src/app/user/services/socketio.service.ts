import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { IChat, IMessage } from '../../models/IChat';


@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: Socket;
  backendUrl = 'https://footies.online';

  private allMessagesSubject: Subject<[]> = new Subject<[]>();
  public allMessages$: Observable<[]> = this.allMessagesSubject.asObservable();

  private messageSubject: Subject<any> = new Subject<any>();
  public message$: Observable<any> = this.messageSubject.asObservable();

  constructor() {}

  setupSocketConnection(courseId: string) {
    this.socket = io(this.backendUrl);

    this.socket.on('connect', () => {
    });
    this.socket.emit('join-room', { courseId });

     this.socket.on('message-recieve', (message) => {
       this.messageSubject.next(message);
     });
  }

  getAllMessages(courseId: string): void {
    this.socket.emit('get-all-messages', { courseId });

    this.socket.on('get-course-response', (messages) => {
      this.allMessagesSubject.next(messages.messages);
      
    });
  }

  sendMessage(courseId: string, message: IMessage) {
    // const chatData ={ courseId, messageData}
    this.socket.emit('send-message', { courseId, message });
  }

  listenForReceivedMessages(): void {
   
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
