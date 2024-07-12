import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class GatewaySocket implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('receivedMessage')
  onReceivedMessage(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('receivedMessage', {
      msg: 'New message',
      content: data,
    });
  }

  @SubscribeMessage('newMessage')
  onMessage(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('newMessage', {
      msg: 'New message',
      content: data,
    });
  }
}
