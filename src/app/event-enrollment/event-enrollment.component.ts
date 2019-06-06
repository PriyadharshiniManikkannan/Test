import { Component, OnInit } from '@angular/core';
import { FMSserviceService } from 'src/app/fmsservice.service';
import { Enrollment } from 'src/app/event-enrollment/enrollment.model';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-event-enrollment',
  templateUrl: './event-enrollment.component.html',
  styleUrls: ['./event-enrollment.component.css']
})
export class EventEnrollmentComponent implements OnInit {

  EventId: number;
  EmployeeId: number;
  EmployeeName: string;       
  BusinessUnit: string;
  ContactNumber:number;        
  AttendanceStatus: any;       
  MailId:any 
  Enrollments: any[];
  Events: Event[];

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private objService: FMSserviceService) { }

  ngOnInit() {
    this.objService.GetAllEvents().subscribe((EventObj: Event[]) => {
      this.Events = EventObj;
     // console.log(this.Events);
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

  Register()
  {
    console.log(this.EventId);
    var objEnrollment = new Enrollment();   
    objEnrollment.EventId =this.EventId;
    objEnrollment.EmployeeId =this.EmployeeId;
    objEnrollment.EmployeeName =this.EmployeeName;
    objEnrollment.BusinessUnit =this.BusinessUnit;
    objEnrollment.ContactNumber =this.ContactNumber;
    objEnrollment.MailId =this.MailId;
console.log(objEnrollment);
    this.objService.postEnrollment(objEnrollment).subscribe(
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
  }

}
