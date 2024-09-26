import {Injectable} from '@angular/core';
import {Client} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private clientsKey = 'clients';

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
