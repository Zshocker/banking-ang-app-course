import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnCheckerService {

  constructor(private http: HttpClient) {
  }

  checkInternetConnectivity(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get('https://banking-ang-app-course.vercel.app/auth', {responseType: 'text'}).subscribe({
        next: () => resolve(), // Internet connection is working
        error: () => reject() // Internet connection failed
      });
    });
  }
}
