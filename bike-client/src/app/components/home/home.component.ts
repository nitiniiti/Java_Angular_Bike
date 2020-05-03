import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  models: String[] = [
    'Globo MTB 29 Full Suspension',
    'Globo Carbon Fiber Race Series',
    'Globo Time Trial Blade',
  ];
  bikeform: FormGroup;
  validMessage: string = '';

  constructor(private bikeService: BikeService) {}

  ngOnInit(): void {
    this.bikeform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      serialNumber: new FormControl(),
      purchasePrice: new FormControl(),
      purchaseDate: new FormControl(),
      contact: new FormControl(),
    });
  }

  submitRegistration() {
    if (this.bikeform.valid) {
      this.validMessage =
        'Your bike registration has been submitted. Thank You !!';

      this.bikeService.createBikeRegistration(this.bikeform.value).subscribe(
        (data) => {
          this.bikeform.reset();
          return true;
        },
        (error) => {
          return Observable.throw(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the form before submitting !!';
    }
  }
}
