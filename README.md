# Clinic Search Task

This is a simple web application built with Express and Axios, which allows users to search for clinics based on the state and availability time.

## Installation

To install and run the application, follow these steps:

1. Clone the repository: `git clone https://github.com/JMGonzalezR/Clinic-Search-Task.git`
2. Install dependencies: `npm install`
3. Build the TypeScript code: `npm run build`
4. Start the server: `npm run dev`

The server will be running at http://localhost:3000.

## Usage

To use the application, make a GET request to `/clinics` with the following query parameters:

-   `name` (optional): The name of the clinic to search for.
-   `state` (optional): the name of the state to search for clinics in.
-   `from` (optional): the start time of the availability range, in the format HH:mm.
-   `to` (optional): the end time of the availability range, in the format HH:mm.

The application will return a JSON response containing an array of clinics that match the search criteria.

## Testing

To run the tests, run `npm test`. This will run the Jest test suite and output the results to the console.

To generate a code coverage report, run `npm run test:coverage`. This will generate an HTML report in the `coverage` directory.
