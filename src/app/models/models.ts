export interface Client {
  loginAttempts: number;
  isBlocked: boolean;
  id: number;
  username: string;
  password: string;
  accounts: Account[];
  beneficiaries: Beneficiary[];
}

export interface Beneficiary {
  id: number;
  accountNumber?: string; // Optional for internal accounts
  accountBalance?: number; // Optional for internal accounts
  iban?: string; // Optional for external accounts
  name: string;
  isFavorite: boolean; // To mark as favorite
  isExternal : boolean
}

export interface TransferDetails {
  amount: number,
  label: string,
  beneficiary : Beneficiary
}

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  isActive: boolean;
  client?: Client;
}

export function getValidAccounts(client?: Client) {
  return client?.accounts.filter(s => s.accountNumber !== '' && s.isActive) ?? []
}

export interface Transfer {
    id : number,
    clientId : number,
    accountId : number,
    details : TransferDetails
    createdAt : Date
}
