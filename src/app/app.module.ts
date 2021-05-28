import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';   // не потрібно для CoreModule, потрібно для AppRoutingModule
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { CoreModule } from './core/core.module';        // потрібно для CoreModule,не потрібно для AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
    ,AppRoutingModule                    // не потрібно для CoreModule, потрібно для AppRoutingModule
    // ,CoreModule                       // потрібно для CoreModule,не потрібно для AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
