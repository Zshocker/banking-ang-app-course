import {Component} from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  amount : number = 0;
  label = '';
  amountError = '';
  labelError = '';

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

    if(valid)
      alert('Transfer in progress...');
  }

  validateAmount(): boolean {
    const numericValue = this.amount;
    return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 5000;
  }

  validateLabel(): boolean {
    const regex = /^[A-Za-z0-9\s]{0,50}$/;
    return regex.test(this.label);
  }
}
