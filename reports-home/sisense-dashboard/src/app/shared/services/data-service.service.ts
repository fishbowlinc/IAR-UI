import { Injectable } from '@angular/core';
import { Report } from '../../core/models/reports';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = Report;  
  
 setOption(value) {      
    this.data = value;  
  }  
  
  getOption() {  
    return this.data;  
  }  
}
