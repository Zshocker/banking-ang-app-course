import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Account, Client, getValidAccounts, TransferDetails} from "../../models/models";

@Component({
  selector: 'app-transfer-confirmation',
  templateUrl: './transfer-confirmation.component.html',
  styleUrls: ['./transfer-confirmation.component.css']
})
export class TransferConfirmationComponent implements OnInit {
  errorMessage: string = '';
  currentUser?: Client;
  account: Account | undefined;
  transferDetails?: TransferDetails;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    const storedAccountId = localStorage.getItem('storedAccountId');
    const transferDetails = localStorage.getItem('transferDetails');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser) as Client;
      if (storedAccountId) {
        this.account = getValidAccounts(this.currentUser).find(s => s.id == parseInt(storedAccountId));
      }
      if (transferDetails) {
        this.transferDetails = JSON.parse(transferDetails) as TransferDetails;
      }
    }

    if (!this.currentUser || !this.account || !this.transferDetails) {
      this.router.navigate(['/auth']).then(); // Redirect if not logged in
    }


  }

  // Validate transfer details (e.g., sufficient balance)
  validateTransferDetails() {
    if (this.transferDetails!.amount > this.account!.balance) {
      this.errorMessage = `Insufficient balance. Your current balance is €${this.account!.balance}.`;
      alert(this.errorMessage);
      return false;
    } else {
      this.errorMessage = '';
      return true;
    }
  }

  // Confirm transfer
  confirmTransfer() {
    if (!this.validateTransferDetails()) {
      return;
    }
    console.log('Transfer confirmed:', this.transferDetails);
    alert('Transfer successfully confirmed!');
  }

  // Cancel transfer
  cancelTransfer() {
    this.router.navigate(['/transfer']);
  }
}
