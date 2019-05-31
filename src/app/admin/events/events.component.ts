import { Component, OnInit } from '@angular/core';
import { FMSserviceService } from '../../fmsservice.service';
import {FormsModule, FormGroup} from '@angular/forms';
import {Event} from './event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private objService: FMSserviceService){}

  EventName: string;
  EventDate: any;
  Location: string;
  Project: string;
  POCId: number;       
  POCName:string; 
  Events: any=[];
  delRow;

  showSucessMessage: boolean;
  serverErrorMessages: string;

ngOnInit() {  
   this.loadGrid();
 }

 loadGrid()
 {
  this.objService.GetAllEvents().subscribe((EventObj: Event[])=>{
    this.Events = EventObj;
    console.log(this.Events);
  }, 
  err => {
    if (err.status === 422) {
      this.serverErrorMessages = err.error.join('<br/>');
    }
    else
      this.serverErrorMessages = 'Something went wrong.Please contact admin.';
  }
  );
 }
 editRow(row) {
 this.Events.filter(row => row.isEditable).map(r => { r.isEditable = false; return r })
row.isEditable = true;
console.log(row);
}

save(row){
  console.log(row);
row.isEditable = false
}

addNew(){
this.Events.push({
  EventName: '',
  EventDate: '',
  Location: '',
  Project:'',
  POCId:'',
  POCName:''
})
this.Events[this.Events.length - 1].isEditable = true;
}

delete(row){
console.log(row);
this.delRow = this.Events.indexOf(row);
this.Events.splice(this.delRow,1);
console.log(this.Events);

}
  onSubmit()
  {
   var objEvent = new Event();
   objEvent.EventName = this.EventName;
   objEvent.EventDate = this.EventDate;
   objEvent.Location = this.Location;
   objEvent.Project = this.Project;
   objEvent.POCId = this.POCId;
   objEvent.POCName = this.POCName;
    this.objService.postEvent(objEvent).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        //this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
   
    //alert(objEvent.POCName);
    //var objEvent = new     
  }

}
