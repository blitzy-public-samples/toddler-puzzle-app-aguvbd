// Importing React and its components (React v17.0.2)
import React from 'react';

// Importing React Router DOM for routing (React Router v5.2.0)
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Importing styled-components for CSS-in-JS styling (styled-components v5.3.3)
import { ThemeProvider } from 'styled-components';

// Importing internal components and services
import NavigationBar from './components/NavigationBar';
import DashboardPage from './pages/DashboardPage';
import ContentManagementPage from './pages/ContentManagementPage';
import AuditLogsPage from './pages/AuditLogsPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './routes/PrivateRoute';
import AuthService from './services/AuthService';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme'; // Assuming there's a theme file for ThemeProvider

// Importing Logger utility for logging events
import Logger from './utils/Logger';

/**
 * App Component
 *
 * Description:
 * Renders the main application component, integrating various pages and services to provide a cohesive admin interface.
 *
 * Requirements Addressed:
 * - Admin Interface Integration (Technical Specification/User Interface/Integration):
 *   Integrates various components and services to provide a comprehensive and cohesive user interface for administrators.
 *
 * Steps:
 * 1. Import necessary modules and components.
 * 2. Apply global styles using GlobalStyles.
 * 3. Define routes using React Router for different pages such as DashboardPage, ContentManagementPage, AuditLogsPage, and LoginPage.
 * 4. Use PrivateRoute to protect routes that require authentication.
 * 5. Render the NavigationBar component for consistent navigation across pages.
 * 6. Integrate AuthService to manage user authentication and session state.
 * 7. Log application initialization and routing events using Logger.
 *
 * @returns {JSX.Element} The rendered application component.
 */
const App: React.FC = (): JSX.Element => {
  // Step 6: Integrate AuthService to manage user authentication and session state.
  const authService = AuthService.getInstance();

  // Step 7: Log application initialization and routing events using Logger.
  Logger.info('Admin Interface Application initialized.');

  return (
    // Step 2: Apply global styles using GlobalStyles.
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {/* Step 3: Define routes using React Router */}
      <Router>
        {/* Step 5: Render the NavigationBar component for consistent navigation across pages. */}
        <NavigationBar />

        <Switch>
          {/* Step 3: Define routes for different pages */}

          {/* Public route for LoginPage */}
          <Route path="/login" component={LoginPage} />

          {/* Step 4: Use PrivateRoute to protect routes that require authentication. */}
          <PrivateRoute path="/dashboard" component={DashboardPage} authService={authService} />
          <PrivateRoute path="/content-management" component={ContentManagementPage} authService={authService} />
          <PrivateRoute path="/audit-logs" component={AuditLogsPage} authService={authService} />

          {/* Default route redirects to DashboardPage */}
          <PrivateRoute path="/" component={DashboardPage} authService={authService} exact />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;