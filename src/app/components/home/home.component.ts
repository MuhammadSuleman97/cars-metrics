import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications
import { NgIf } from '@angular/common';

export interface Car {
  name: string;
  mpg: number;
  cylinders: number;
  displacement: number;
  horsepower: number;
  weight: number;
  acceleration: number;
  model_year: number;
  origin: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    NavbarComponent, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'mpg', 'cylinders', 'displacement', 'horsepower', 'weight', 'acceleration', 'model_year', 'origin'];
  dataSource = new MatTableDataSource<Car>([]);
  filterForm: FormGroup;
  isLoading: boolean = false; 

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private carService: CarService, private router: Router, private snackBar: MatSnackBar) {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      mpg: new FormControl(''),
      cylinders: new FormControl(''),
      displacement: new FormControl(''),
      horsepower: new FormControl(''),
      weight: new FormControl(''),
      acceleration: new FormControl(''),
      model_year: new FormControl(''),
      origin: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadCars();
    
    this.dataSource.filterPredicate = (data: Car, filter: string) => {
      const filterValues = JSON.parse(filter);
      
      return Object.keys(filterValues).every(key => {
        const value = data[key as keyof Car];
        const filterValue = filterValues[key];
        if (typeof value === 'number') {
          return filterValue ? value.toString().includes(filterValue) : true;
        }
        return value.toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    };

    if (this.isBrowser()) {
      const savedFilter = localStorage.getItem('carFilter');
      if (savedFilter) {
        this.filterForm.setValue(JSON.parse(savedFilter), { emitEvent: false });
        this.applyFilter();
      }
    }

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
      
      const sortState = this.isBrowser() ? JSON.parse(localStorage.getItem('sortState') || '{}') : {};
      if (sortState.active && sortState.direction) {
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.dataSource.sort = this.sort;
      }

      this.sort.sortChange.subscribe(() => {
        this.saveSortState();
      });

    }
  }

  applyFilter(): void {
    const filterValues = this.filterForm.value;
    this.dataSource.filter = JSON.stringify(filterValues);
    localStorage.setItem('carFilter', JSON.stringify(filterValues));
  }

  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.dataSource.data = cars;
      },
      error: (err) => {
        this.handleError('Error fetching car data', err);
      }
    });
  }

  downloadCsv(): void {
    this.carService.downloadCsv().subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cars.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.handleError('Error downloading CSV', err);
      }
    });
  }

  saveSortState(): void {
    if (this.sort) {
      const sortState = {
        active: this.sort.active,
        direction: this.sort.direction
      };
      localStorage.setItem('sortState', JSON.stringify(sortState));
    }
  }

  navigateToForm(): void {
    this.router.navigate(['/car-form']);
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;
      this.carService.uploadCarCSV(file).subscribe({
        next: () => {
          this.loadCars();
          this.isLoading = false;
        },
        error: (err) => {
          this.handleError('Error uploading file', err);
          this.isLoading = false;
        }
      });
    }
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
