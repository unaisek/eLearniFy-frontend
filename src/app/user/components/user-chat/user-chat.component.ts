import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { Subscription, map } from 'rxjs';
import { IMessage } from 'src/app/models/IChat';
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css'],
})
export class UserChatComponent implements OnInit,OnDestroy {

  @Input() courseId:string

  allMessages = [];
  private _allMessageSubscription:Subscription | undefined;
  private  _messageSubscription: Subscription | undefined
  text:string = '';
  userData:IUser;
  userId:string;

  constructor(
    private _socketService:SocketioService,
    private _userService:UserService
  ) {}

  ngOnInit(): void {
    this.userId  = localStorage.getItem("user")
    this._socketService.setupSocketConnection(this.courseId);
    this._socketService.getAllMessages(this.courseId);
    this._allMessageSubscription = this._socketService.allMessages$.subscribe({
      next:(messages)=>{
       this.allMessages = messages           
      }
    })
    this._messageSubscription =  this._socketService.message$.subscribe((message)=>{
      this.allMessages.push(message);
    })
    
  }
  onSubmitMessage(){
    const senderId = localStorage.getItem('user');
    this._userService.getUserData(senderId).subscribe({
      next:(data)=>{
        this.userData = data;
        if(!(this.text.trim() == "")){
          const messageData:IMessage = {
            userName:this.userData.name,
            senderId,
            message:this.text,
            createdAt: new Date()
          }
          this._socketService.sendMessage(this.courseId,messageData);          
          this.text = "";
        }
        
      }
    })
  }
  ngOnDestroy(): void {
    this._socketService.disconnect()
    if(this._allMessageSubscription){
      this._allMessageSubscription.unsubscribe();
    }
    if(this._messageSubscription){
      this._messageSubscription.unsubscribe();
    }
  }
}
