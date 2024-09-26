import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth.component.ts/auth.component';
import {FormsModule} from "@angular/forms";
import {SelectAccountComponent} from './components/select-account/select-account.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { BeneficiaryComponent } from './components/beneficiary/beneficiary.component';
import { TransferComponent } from './components/transfer/transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SelectAccountComponent,
    BeneficiaryComponent,
    TransferComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    RouterOutlet,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
