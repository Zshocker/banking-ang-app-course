import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";


@Component({
  selector: 'app-auth',
  styleUrls : ['auth.component.css'],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage = '';

  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  login(): void {
    this.errorMessage = '';
    const client = this.localStorageService.authenticate(this.username, this.password);
    console.log(client)
    if (client.client) {
      localStorage.setItem('currentUser', JSON.stringify(client.client)); // Save authenticated user in local storage
      this.router.navigate(['/select-account']).then(() => {
      });
    } else {
      if (!client.isBlocked)
        this.errorMessage = 'Invalid username or password';
      else
        alert(`Account is blocked`);
    }
  }
}
