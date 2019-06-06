import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataTableModule,ButtonModule,CalendarModule} from 'primeng/primeng'
//import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DropdownModule} from 'primeng/dropdown';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EventsComponent } from './admin/events/events.component';
import {InputTextModule} from 'primeng/inputtext';
import { EventEnrollmentComponent } from './event-enrollment/event-enrollment.component';
import { EventsAttendanceComponent } from './admin/events-attendance/events-attendance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EventsComponent,
    EventEnrollmentComponent,
    EventsAttendanceComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    DropdownModule,
   // TableModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    RouterModule.forRoot([
      {
        path:'home',
        component:LoginComponent
      },
      {
        path:'',
        component:LoginComponent
      },
      {
        path:'attendance',
        component:EventsAttendanceComponent
      },
      {
          path:'enrollement',
          component: EventEnrollmentComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'events',
        component: EventsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
