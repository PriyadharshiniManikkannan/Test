import { Component, OnInit } from '@angular/core';
import { FMSserviceService } from 'src/app/fmsservice.service';
import { Enrollment } from 'src/app/event-enrollment/enrollment.model';

@Component({
  selector: 'app-events-attendance',
  templateUrl: './events-attendance.component.html',
  styleUrls: ['./events-attendance.component.css']
})
export class EventsAttendanceComponent implements OnInit {

  EventId: number;
  EmployeeId: number;
  EmployeeName: string;       
  BusinessUnit: string;
  ContactNumber:number;        
  AttendanceStatus: any;       
  MailId:any  ;  
  Enrollments: any[];
  delRow;
  isNew:boolean;

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private objService: FMSserviceService) { }


  ngOnInit() {
    this.loadGrid();
  }

  loadGrid()
  {
    this.objService.GetEnrollments().subscribe((EnrollmentObj: Enrollment[]) => {
      this.Enrollments = EnrollmentObj;
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

  addNew() {
    this.isNew=true;
    this.Enrollments.push({
      EventId: '',
      EmployeeId: '',
      EmployeeName: '',
      BusinessUnit: '',
      ContactNumber: '',
      AttendanceStatus:  '',
      MailId: ''
    })
    this.Enrollments[this.Enrollments.length - 1].isEditable = true;
  }



  editRow(row) {
    this.isNew=false;
    this.Enrollments.filter(row => row.isEditable).map(r => { r.isEditable = false; return r })
    row.isEditable = true;
    }
    
  cancelRow(row) {
    this.Enrollments.filter(row => row.isEditable).map(r => { r.isEditable = true; return r })
    row.isEditable = false;
  }

  save(row) {
    console.log(row);
    var objEnrollment = new Enrollment();
    objEnrollment.EventId = row.EventId;
    objEnrollment.EmployeeId = row.EmployeeId;
    objEnrollment.EmployeeName = row.EmployeeName;
    objEnrollment.BusinessUnit = row.BusinessUnit;
    objEnrollment.AttendanceStatus=row.AttendanceStatus;
    objEnrollment.ContactNumber = row.ContactNumber;
    objEnrollment.MailId = row.MailId;
    //objEnrollment.EventId = row.EventId;

    if (this.isNew == true) {
      this.objService.postEnrollment(objEnrollment).subscribe(
        res => {
          this.showSucessMessage = true;
          this.loadGrid();
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
    else if (objEnrollment.EventId != undefined) {
      this.objService.EditEnrollments(objEnrollment).subscribe(
        res => {
          this.showSucessMessage = true;
          this.loadGrid();
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
    row.isEditable = false;

  }

  delete(row) {
    console.log(row);
    this.delRow = this.Enrollments.indexOf(row);
    this.Enrollments.splice(this.delRow, 1);
    this.objService.DeleteEnrollments(row.EventId, row.EmployeeId).subscribe(
      res => {
        this.showSucessMessage = true;
        this.loadGrid();
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
