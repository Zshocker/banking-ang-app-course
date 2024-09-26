import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Account, Client, getValidAccounts} from "../../models/models";

@Component({
  selector: 'app-select-account',
  styleUrls: ['./select-account.component.css'],
  templateUrl: './select-account.component.html',
})
export class SelectAccountComponent implements OnInit {
  currentUser: Client | null = null;
  selectedAccount: Account | null = null;
  errorMessage = '';
  public accounts: Account[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem("currentUser");
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!this.currentUser) {
      this.router.navigate(['/auth']).then(); // Redirect if not logged in
    }

    this.accounts = getValidAccounts(this.currentUser!);
  }

  selectAccount(account: Account): void {
    if (account.isActive && account.balance > 0) {
      this.selectedAccount = account;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'This account is inactive or has insufficient funds.';
    }
  }

  confirmSelection(): void {
    if (this.selectedAccount) {
      localStorage.setItem('storedAccountId', String(this.selectedAccount.id))
      this.router.navigate(['/beneficiary']).then();
    } else {
      this.errorMessage = 'Please select a valid account.';
    }
  }
}
