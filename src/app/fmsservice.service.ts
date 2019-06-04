import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../src/environments/environment.prod';
import {Event} from '../../src/app/admin/events/event.model';
//import { Observable} from'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FMSserviceService {

  constructor(private httpClient: HttpClient) { }
 
  //Insert Event details 
  postEvent(objEvent: Event)
  {
    return this.httpClient.post(environment.apiBaseUrl+'/createEvent', objEvent);
  }
  editEvent(objEvent: Event)
  {
    return this.httpClient.put(environment.apiBaseUrl+'editEvent/'+objEvent.EventId+'',objEvent);
  }
  GetAllEvents()
  {
    return this.httpClient.get(environment.apiBaseUrl+'/ShowEvents');
  }

  DeleteEvent(EventId)
  {
    
    return this.httpClient.delete(environment.apiBaseUrl+'deleteEvent/'+EventId+'');
  }
}
