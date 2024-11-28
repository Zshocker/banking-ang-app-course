import {Injectable} from '@angular/core';
import {Client, Transfer} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private clientsKey = 'clients';
  private transfersKey = 'transfers';

  constructor() {
  }

  getClients(): Client[] {
    const clients = localStorage.getItem(this.clientsKey);
    return clients ? JSON.parse(clients) : [];
  }

  saveClients(clients: Client[]): void {
    localStorage.setItem(this.clientsKey, JSON.stringify(clients));
  }

  saveClient(client: Client): void {
    let clients = this.getClients();

    let find = clients.find(x => x.id == client.id);

    if (find) {
      find.loginAttempts = client.loginAttempts;
      find.isBlocked = client.isBlocked;
      find.password = client.password;
      find.username = client.username;
      find.accounts = client.accounts;
      find.beneficiaries = client.beneficiaries;
    } else {
      clients.push(client);
    }

    localStorage.setItem(this.clientsKey, JSON.stringify(clients));
  }

  getTransfers(): Transfer[] {
    const transfers = localStorage.getItem(this.transfersKey);
    return transfers ? JSON.parse(transfers) : [];
  }

  saveTransfers(transfers: Transfer[]): void {
    localStorage.setItem(this.transfersKey, JSON.stringify(transfers));
  }

  saveTransfer(transfer: Transfer): void {
    let transfers = this.getTransfers();
    let client = this.getClients().find(cli => transfer.clientId == cli.id);

    if (client) {
      let account = client.accounts.find(acc => acc.id == transfer.accountId);
      const otherAccount = !transfer.details.beneficiary.isExternal ? client.accounts.find(acc => acc.accountNumber == transfer.details.beneficiary.accountNumber) : undefined;
      if (account) {
        account.balance = account.balance - transfer.details.amount;
        if (otherAccount)
          otherAccount.balance = otherAccount.balance + transfer.details.amount;
        this.saveClient(client);
        transfers.push(transfer);
        this.saveTransfers(transfers);
      }
    }
  }

  getClientsTransfers(clientId: number) {
    return this.getTransfers().filter(x => x.clientId === clientId);
  }

  authenticate(username: string, password: string): { client?: Client, isBlocked: boolean } {
    const clients = this.getClients();
    const client = clients.find(client => client.username === username) || undefined;

    if (client) {
      console.log(client)
      if (client.isBlocked) {
        return {client: undefined, isBlocked: true}; // Account is blocked, return null
      }

      if (client.password === password) {
        client.loginAttempts = 0; // Reset login attempts on successful login
        this.saveClients(clients);
        return {client: client, isBlocked: false};
      } else {
        client.loginAttempts += 1; // Increment failed login attempts
        this.saveClients(clients);
        if (client.loginAttempts >= 3) {
          client.isBlocked = true; // Block the user after 3 failed attempts
          this.saveClients(clients);
          return {client: undefined, isBlocked: true};
        }
      }
    }

    return {client: undefined, isBlocked: false};
  }

  addClient(client: Client): void {
    const clients = this.getClients();
    clients.push(client);
    this.saveClients(clients);
  }
}
