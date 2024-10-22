// External dependencies
import React, { FC } from 'react'; // React version 17.0.2
import { Route, Redirect, RouteProps } from 'react-router-dom'; // react-router-dom version 5.2.0

// Internal dependencies
import AuthService from '../services/AuthService'; // Handles authentication checks to determine if a user is authenticated.
import logger from '../utils/Logger'; // Logs access attempts and authentication-related events.
import validateInput from '../utils/Validator'; // Validates route parameters and authentication data.
import NavigationBar from '../components/NavigationBar'; // Provides navigation controls for authenticated routes.

/**
 * PrivateRoute Component
 *
 * Renders a route that is accessible only to authenticated users.
 * Redirects unauthenticated users to the login page.
 *
 * Requirements Addressed:
 * - Authentication Management
 *   - Location: Technical Specification > System Components > Security Management
 *   - Description: Ensures secure access control by restricting access to certain routes based on user authentication status.
 */
const PrivateRoute: FC<RouteProps> = (props) => {
  // Step 1: Validate route parameters and authentication data
  // - Uses the validateInput function from Validator utility to ensure props are valid
  // - Assists in preventing invalid data from causing runtime errors
  validateInput(props);

  // Step 2: Check if the user is authenticated
  // - Utilizes AuthService to determine authentication status
  const isAuthenticated = AuthService.isAuthenticated();

  // Step 3: Log the access attempt
  // - Logs the authentication status for monitoring and audit purposes
  //   - Fulfills logging requirements specified in the technical documentation (TR-7.3)
  logger.info('Access attempt to a private route', { isAuthenticated });

  if (isAuthenticated) {
    // Step 4: User is authenticated, render the requested component
    // - Wraps the component with NavigationBar for consistent UI
    return (
      <>
        <NavigationBar />
        <Route {...props} />
      </>
    );
  } else {
    // Step 5: User is not authenticated, redirect to login page
    // - Uses Redirect from react-router-dom to navigate unauthenticated users to login
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;