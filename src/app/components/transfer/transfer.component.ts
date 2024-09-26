import {Component, OnInit} from '@angular/core';
import {Account, Client} from "../../models/models";

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

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    const storedAccountId = localStorage.getItem('storedAccountId');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser) as Client;
      if (storedAccountId) {
        this.account = this.currentUser.accounts.filter(s => s.id === parseInt(storedAccountId))[0];
      }
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

    if (valid)
      alert('Transfer in progress...');
  }

  validateAmount(): boolean {
    const numericValue = this.amount;
    return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 5500;
  }

  validateLabel(): boolean {
    const regex = /^[A-Za-z0-9\s]{0,50}$/;
    return regex.test(this.label);
  }

  private accountVerify() {
    return this.amount <= (this.account?.balance ?? 0);
  }
}
