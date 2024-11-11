import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "../components/auth.component.ts/auth.component";
import {SelectAccountComponent} from "../components/select-account/select-account.component";
import {BeneficiaryComponent} from "../components/beneficiary/beneficiary.component";
import {TransferComponent} from "../components/transfer/transfer.component";
import {TransferConfirmationComponent} from "../components/transfer-confirmation/transfer-confirmation.component";


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'select-account', component: SelectAccountComponent },
  { path: 'beneficiary', component: BeneficiaryComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transferConfirm', component: TransferConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
