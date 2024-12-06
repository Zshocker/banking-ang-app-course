import { Component } from '@angular/core';
import {Client} from "./models/models";
import {LocalStorageService} from "./services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    if (this.localStorageService.getClients().length == 0) {
      const initialClients: Client[] = [
        {
          id: 1,
          username: 'john',
          password: '1234',
          accounts: [
            { "id": 1, "accountNumber": "'001'", "balance": 1000, "isActive": true },
            { "id": 2, "accountNumber": "'002'", "balance": 500, "isActive": true },
            { "id": 5, "accountNumber": "'005'", "balance": 7000, "isActive": true },
            { "id": 7, "accountNumber": "'007'", "balance": 8000, "isActive": true },
            { "id": 4, "accountNumber": "", "balance": 0, "isActive": true },
            { "id": 3, "accountNumber": "'003'", "balance": 500, "isActive": false }
          ],
          isBlocked: false,
          loginAttempts: 0,
          beneficiaries : []
        },
        {
          id: 2,
          username: 'jane',
          password: '5678',
          accounts: [
            { id: 3, accountNumber: '003', balance: 1500, isActive: true },
            { id: 4, accountNumber: '004', balance: 1300, isActive: false },
            { id: 4, accountNumber: '', balance: 0, isActive: true },
          ],
          isBlocked: false,
          loginAttempts: 0,
          beneficiaries : []
        },
      ];

      this.localStorageService.saveClients(initialClients);
    }
  }
}
