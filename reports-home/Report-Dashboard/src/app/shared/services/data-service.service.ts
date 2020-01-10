import { Injectable } from '@angular/core';
import { Report } from '../../core/models/reports';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class DataService {
  private data = Report;  
  private sessionCheck = new BehaviorSubject('False');
  currentSession = this.sessionCheck.asObservable();
  constructor() { }

  toggleSession(message: string) {
    this.sessionCheck.next(message)
  }

  
 setOption(value) {      
    this.data = value;  
  }  
  
  getOption() {  
    return this.data;  
  }  
}
