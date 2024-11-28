import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-transfer-result',
  templateUrl: './transfer-result.component.html',
  styleUrls: ['./transfer-result.component.css']
})
export class TransferResultComponent implements OnInit {
  isSuccess: boolean = false; // Determines if transfer was successful
  referenceNumber: string = ''; // Unique reference number for success
  errorMessage: string = ''; // Error message for failure

  constructor(private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Retrieve result data from navigation state
    const resultData = history.state as {
      isSuccess: boolean;
      referenceNumber: string;
      errorMessage: string;
    };

    console.log(resultData);
    if (resultData) {
      this.isSuccess = resultData['isSuccess'];
      this.referenceNumber = resultData['referenceNumber'] || '';
      this.errorMessage = resultData['errorMessage'] || '';
    }
  }

  goBack() {
    this.router.navigate(['/']).then(); // Redirect to the home page
  }
}
