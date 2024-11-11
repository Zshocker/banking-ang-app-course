import {Component, OnInit} from '@angular/core';
import {Account, Client, TransferDetails} from "../../models/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  amount: number = 0;
  label = '';
  amountError = '';
  labelError = '';
  currentUser?: Client;
  account?: Account;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    const storedAccountId = localStorage.getItem('storedAccountId');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser) as Client;
      if (storedAccountId) {
        this.account = this.currentUser.accounts.filter(s => s.id === parseInt(storedAccountId))[0];
      }
    }
    if (!this.currentUser) {
      this.router.navigate(['/auth']).then(); // Redirect if not logged in
    }
  }


  submitTransfer(): void {
    this.amountError = '';
    this.labelError = '';
    let valid = true;

    if (!this.validateAmount()) {
      this.amountError = 'Le montant est invalide. Il doit être numérique et entre 1€ et 5000€.';
      valid = false;
    }

    if (!this.validateLabel()) {
      this.labelError = 'Le libellé doit être de 50 caractères maximum et sans caractères spéciaux.';
      valid = false;
    }

    if (valid && !this.accountVerify()) {
      this.amountError = `Le montant doit etre inférieur ou égal à ${this.account?.balance}€.`;
      valid = false;
    }

    if (valid) {
      const transferDetails: TransferDetails = {
        amount: this.amount,
        label: this.label,
        beneficiary: this.currentUser!.beneficiaries[this.currentUser!.beneficiaries.length - 1]
      }
      localStorage.setItem("transferDetails", JSON.stringify(transferDetails));
      this.router.navigate(['/transferConfirm']).then();
    }
  }

  validateAmount(): boolean {
    const numericValue = this.amount;
    return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 5000;
  }

  validateLabel(): boolean {
    const regex = /^[A-Za-z0-9\s]{0,50}$/;
    return regex.test(this.label);
  }

  private accountVerify() {
    return this.amount <= (this.account?.balance ?? 0);
  }
}
