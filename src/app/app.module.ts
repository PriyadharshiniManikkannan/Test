import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Input  } from '@angular/core';
import { AfterContentInit, AfterViewInit, ElementRef, QueryList, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataTableModule,ButtonModule,CalendarModule} from 'primeng/primeng'
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EventsComponent } from './admin/events/events.component';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EventsComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    TableModule,
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
