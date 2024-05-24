
# Nauli Pay

This is a fleet management web application built with React.js. The application allows users to register and log in to manage vehicle profiles and view reports on trips made and profit/loss.

## Features

- User registration with vehicle details.
- User login with vehicle registration number and password.
- Dashboard displaying vehicle profile and trip reports.
- Ability to update and delete vehicle profiles.
- Background Gif on the landing page for enhanced user experience.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- A backend server to handle API requests for vehicle and report data.

## Installation

To install and set up the application, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/fare-management-app.git
    cd fare-management-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file to store your environment variables (if needed).

4. Start the application:
    ```bash
    npm start
    ```

The app should now be running at `http://localhost:3000`.

## File Structure

Here's a brief overview of the project's file structure:

```
.
├── public
│   ├── index.html
│   ├── Test.mp4
│   └── ...
├── src
│   ├── components
│   │   ├── Dashboard.js
│   │   ├── Header.js
│   │   ├── LoginForm.js
│   │   ├── RegistrationForm.js
│   │   └── ...
│   ├── images
│   │   └── Test.mp4
│   ├── index.css
│   ├── index.js
│   └── App.js
├── .gitignore
├── package.json
└── README.md
```

## Components

### `Header.js`
The header component contains the navigation bar with links to the login and registration pages.

### `LoginForm.js`
The login form component allows users to log in using their vehicle registration number and password.

### `RegistrationForm.js`
The registration form component allows users to register by providing their vehicle registration number, fleet number, sacco name, and password.

### `Dashboard.js`
The dashboard component displays the vehicle profile, trip report, and buttons to update and delete the profile.

## CSS Styling

CSS files for styling components:

- `index.css`: Main CSS file for global styles.


## Backend Integration

For the purpose of demonstration, the data fetching functions in the `Dashboard.js` component use hardcoded values. In a real-world scenario, these functions should fetch data from your backend API.

Example of a fetch request to get vehicle data:

```jsx
const fetchVehicleData = async () => {
  try {
    const response = await fetch('/api/vehicle');
    if (!response.ok) {
      throw new Error('Failed to fetch vehicle data');
    }
    const data = await response.json();
    setVehicleProfile(data);
  } catch (error) {
    console.error('Error fetching vehicle data:', error.message);
  }
};
```

## Running Tests

To run tests, use the following command:

```bash
npm test
```

## Deployment

To deploy the application, follow these steps:

1. Build the application:
    ```bash
    npm run build
    ```

2. Deploy the contents of the `build` directory to your web server or hosting service.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)
- [React Router](https://reactrouter.com/)
