import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientesComponent } from './cliente/clientes/clientes.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteService } from "./cliente/shared/cliente.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RoundupPipe } from './roundup.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    NavbarComponent,
    ClientesComponent,
    ClienteFormComponent,
    RoundupPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
