# Car Metrics

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

## Overview

Car Metrics is an Angular application designed to display, filter, and manage a dataset of cars. The application provides functionalities for viewing car data in a table, searching through the dataset, filtering based on various fields, and uploading/downloading CSV files.

## Features

- **Data Table**: Displays car information in a Material table with pagination and sorting capabilities.
- **Search and Filters**: Allows for a unified search across all fields and individual filters for each field.
- **CSV Upload/Download**: Supports uploading CSV files to update the dataset and downloading the current data as a CSV file.
- **Loading Spinner**: Shows a loading spinner during data fetch and file upload operations.
- **Notifications**: Uses Angular Material's snack bars to show error messages and other notifications.

## Technologies Used

- **Angular**: For building the front-end application.
- **Angular Material**: For UI components like tables, forms, and buttons.
- **Reactive Forms**: For handling form inputs and validation.
- **RxJS**: For managing asynchronous data streams.
- **Express.js**: Backend server for handling API requests (in a separate setup).

## Setup and Installation

### Prerequisites

- Node.js
- Angular CLI

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd car-metrics
2. **Install Dependencies**

   ```bash
   npm install

3. **Run Application**

   ```bash
   ng serve

4. **Navigation**
   ```bash
   Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.


5. **Setting up Backend**
   ```bash
   Run Node Backend server side by side as well. You can clone that backend server from https://www.github.com/MuhammadSuleman97/cars-metrics-backend
## Build

Run ng build to build the project. The build artifacts will be stored in the dist/ directory.
1. **Proceed to Node Backend Readme for Angular Deployment**



