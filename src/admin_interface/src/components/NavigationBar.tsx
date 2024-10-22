// Import necessary modules and components.

// External dependencies
import React from 'react'; // React version 17.0.2 - Provides the base library for building the NavigationBar component.
import styled from 'styled-components'; // styled-components version 5.3.3 - Provides utilities for defining and managing CSS-in-JS styles.
import { Link, useLocation } from 'react-router-dom'; // react-router-dom version 5.2.0 - Handles routing and navigation within the admin interface.

// Internal dependencies
import GlobalStyles from '../styles/GlobalStyles'; // Ensures consistent styling across the navigation bar.
import AuthService from '../services/AuthService'; // Handles authentication checks for navigation items that require user authentication.
import logger from '../utils/Logger'; // Logs navigation events and errors.

// Technical Specification Reference:
// - Requirements Addressed: Navigation Management
//   - Location: Technical Specification/User Interface/Components
//   - Description: Facilitates navigation within the admin interface, allowing users to access different sections of the dashboard efficiently.

/**
 * NavigationBar Component
 *
 * Renders the navigation bar with links to different sections of the admin dashboard.
 * Addresses requirements for Navigation Management as specified in the Technical Specification/User Interface/Components.
 * Enables administrators to navigate efficiently between dashboard sections.
 *
 * Returns:
 *   - JSX.Element: The rendered navigation bar component.
 */
const NavigationBar: React.FC = () => {
    // Define state for the active navigation item based on current location.
    const location = useLocation();

    // Check user authentication status using AuthService.
    // This ensures that certain navigation items are only accessible to authenticated users.
    const isAuthenticated = AuthService.isAuthenticated();

    // Log navigation events using logger.
    React.useEffect(() => {
        logger.info('NavigationBar mounted');
        return () => {
            logger.info('NavigationBar unmounted');
        };
    }, []);

    // Define navigation items.
    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Content Management', path: '/content-management' },
        { name: 'Audit Logs', path: '/audit-logs' },
    ];

    // Apply global styles using GlobalStyles.
    // Ensures consistent styling across the navigation bar according to project guidelines.
    return (
        <>
            <GlobalStyles />
            <NavBarContainer>
                {navItems.map((item, index) => (
                    <NavItem key={index} active={location.pathname === item.path}>
                        <StyledLink to={item.path}>{item.name}</StyledLink>
                    </NavItem>
                ))}
                {isAuthenticated && (
                    <NavItem>
                        <LogoutButton
                            onClick={() => {
                                AuthService.logout();
                                logger.info('User logged out');
                            }}
                        >
                            Logout
                        </LogoutButton>
                    </NavItem>
                )}
            </NavBarContainer>
        </>
    );
};

export default NavigationBar;

// Styled components for styling the navigation bar.

// NavBarContainer styles the container of the navigation bar.
const NavBarContainer = styled.nav`
    display: flex;
    background-color: #2c3e50;
    padding: 10px;
`;

// NavItem styles each navigation item.
interface NavItemProps {
    active?: boolean;
}

const NavItem = styled.div<NavItemProps>`
    margin-right: 20px;
    a {
        color: ${(props) => (props.active ? '#ecf0f1' : '#bdc3c7')};
        text-decoration: none;
        font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
        &:hover {
            color: #ecf0f1;
        }
    }
`;

// StyledLink wraps the React Router Link component for consistent styling.
const StyledLink = styled(Link)`
    font-size: 16px;
`;

// LogoutButton styles the logout button.
const LogoutButton = styled.button`
    background: none;
    border: none;
    color: #bdc3c7;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        color: #ecf0f1;
    }
`;

/**
 * Notes:
 * - This component facilitates navigation within the admin interface, addressing the "Navigation Management" requirement.
 * - Location in documentation: Technical Specification/User Interface/Components.
 * - It allows users to access different sections of the dashboard efficiently.
 * - The component uses React Router's Link component to render navigation links.
 * - AuthService is used to check authentication status for displaying secure navigation items.
 * - Logger logs navigation events and errors for monitoring and debugging purposes.
 * - GlobalStyles ensures consistent styling across the navigation bar, as per project standards.
 */