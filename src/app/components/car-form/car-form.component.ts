import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule],
})
export class CarFormComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      mpg: ['', Validators.required],
      cylinders: ['', Validators.required],
      displacement: ['', Validators.required],
      horsepower: ['', Validators.required],
      weight: ['', Validators.required],
      acceleration: ['', Validators.required],
      model_year: ['', Validators.required],
      origin: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.carService.createCar(this.carForm.value).subscribe({
        next: () => {
          // Redirect to home after successful creation
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating car:', err);
        }
      });
    }
  }
}
