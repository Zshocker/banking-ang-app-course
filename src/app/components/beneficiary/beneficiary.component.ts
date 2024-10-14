import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";
import {Account, Beneficiary, Client, getValidAccounts} from "../../models/models";

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {
  currentUser?: Client;
  accounts: Account[] = [];
  externalIban = '';
  beneficiaryName = '';
  isFavorite = false;
  ibanError = '';

  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    const storedAccountId = localStorage.getItem('storedAccountId');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser) as Client;
      if (storedAccountId) {
        this.accounts = getValidAccounts(this.currentUser).filter(s => s.id !== parseInt(storedAccountId));
      }
    }

    if (!this.currentUser) {
      this.router.navigate(['/auth']).then(); // Redirect if not logged in
    }
  }

  selectInternalBeneficiary(account: any): void {
    const beneficiary = {
      id: Date.now(),
      accountNumber: account.accountNumber,
      name: 'Internal Account',
      isFavorite: false
    };
    this.saveBeneficiary(beneficiary);
  }

  addExternalBeneficiary(): void {
    if (this.validateIBAN(this.externalIban)) {
      const beneficiary = {
        id: Date.now(),
        iban: this.externalIban,
        name: this.beneficiaryName,
        isFavorite: this.isFavorite
      };
      this.saveBeneficiary(beneficiary);
    } else {
      this.ibanError = 'IBAN invalide.';
    }
  }

  validateIBAN(iban: string): boolean {
    const regex = /^([A-Z]{2}[0-9]{2})([A-Z0-9]{1,30})$/;
    return regex.test(iban);
  }

  saveBeneficiary(beneficiary: Beneficiary): void {
    if (beneficiary.isFavorite) {
      this.currentUser!.beneficiaries.push(beneficiary);
      this.localStorageService.saveClient(this.currentUser!);
    }

    this.router.navigate(['/transfer']).then();
  }
}
