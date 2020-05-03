import {Injectable} from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() {
  }

  add(msg: string) {
    this.messages.push(customFormatTime() + ': ' + msg);
  }

  clear() {
    this.messages = [];
  }
}

export function customFormatTime(): string {
  return formatDate(Date.now(), 'HH:mm:ss', 'en-US', 'CST');
}
