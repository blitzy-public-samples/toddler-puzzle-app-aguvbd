/**
 * Pagination.tsx
 *
 * This file implements a pagination component for the admin interface,
 * allowing users to navigate through paginated data sets efficiently.
 * 
 * Requirements Addressed:
 * - Data Navigation (Technical Specification/User Interface/Components)
 *   Provides a user-friendly interface for navigating through large sets of data,
 *   enhancing usability and accessibility.
 */

import React from 'react';

/**
 * External Dependencies
 */
// styled-components@5.3.3 is used for styling the pagination component with CSS-in-JS
import styled from 'styled-components'; // Version 5.3.3

/**
 * Internal Dependencies
 */
// Used to fetch paginated data from the backend API
import { API_BASE_URL } from '../utils/Constants';
// Logs pagination-related actions and errors
import logger from '../utils/Logger';
// Validates pagination parameters before sending requests
import { validateInput } from '../utils/Validator';
// Applies consistent styling to the pagination component
import GlobalStyles from '../styles/GlobalStyles';
// Handles API requests for fetching paginated data
import apiClient from '../services/ApiService';

/**
 * Global Styles
 * 
 * Applies consistent styling to the pagination component.
 * (Defined in src/admin_interface/src/styles/GlobalStyles.ts)
 * 
 * Utilizes styled-components for CSS-in-JS styling.
 */
const PaginationStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

/**
 * Styled component for individual page numbers.
 */
const PageNumber = styled.button<{ isActive: boolean }>`
  background-color: ${props => (props.isActive ? '#007BFF' : '#FFFFFF')};
  color: ${props => (props.isActive ? '#FFFFFF' : '#007BFF')};
  border: 1px solid #007BFF;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
    color: #FFFFFF;
  }
`;

/**
 * Pagination Component
 *
 * A React component that renders pagination controls and manages page navigation.
 * 
 * Requirements Addressed:
 * - Data Navigation (Technical Specification/User Interface/Components)
 *   Provides a user-friendly interface for navigating through large sets of data,
 *   enhancing usability and accessibility.
 */

interface PaginationProps {
  totalPages: number;
  onPageChange?: (data: any) => void;
}

interface PaginationState {
  currentPage: number;
}

class Pagination extends React.Component<PaginationProps, PaginationState> {

  /**
   * Initializes the Pagination component with default state values.
   * @param props - component properties.
   */
  constructor(props: PaginationProps) {
    super(props);
    this.state = {
      currentPage: 1, // Initialize currentPage to 1.
    };

    // Bind methods
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchPageData = this.fetchPageData.bind(this);
    this.renderPageNumbers = this.renderPageNumbers.bind(this);
  }

  /**
   * Fetches data for a specific page from the backend API.
   * 
   * Requirements Addressed:
   * - Data Navigation (Technical Specification/User Interface/Components)
   *   Enables efficient retrieval of data for the requested page, enhancing user experience during navigation.
   * 
   * Steps:
   * 1. Validate the pageNumber using validateInput.
   * 2. Log the page fetch request using logger.
   * 3. Send a GET request using apiClient to fetch data for the specified page.
   * 4. Log the response or error using logger.
   * 5. Return the page data or throw an error.
   * 
   * @param pageNumber - The page number to fetch data for.
   * @returns A Promise that resolves with the page data or rejects with an error.
   */
  async fetchPageData(pageNumber: number): Promise<any> {
    try {
      // Validate the pageNumber using validateInput.
      validateInput('pageNumber', pageNumber);

      // Log the page fetch request using logger.
      logger.info(`Fetching data for page ${pageNumber}`);

      // Send a GET request using apiClient to fetch data for the specified page.
      const response = await apiClient.get(`${API_BASE_URL}/data?page=${pageNumber}`);

      // Log the response using logger.
      logger.info(`Data fetched for page ${pageNumber}:`, response.data);

      // Return the page data.
      return response.data;

    } catch (error) {
      // Log the error using logger.
      logger.error(`Error fetching data for page ${pageNumber}:`, error);

      // Rethrow the error.
      throw error;
    }
  }

  /**
   * Handles user interaction for changing pages.
   * 
   * Requirements Addressed:
   * - Data Navigation (Technical Specification/User Interface/Components)
   *   Provides seamless page navigation, improving usability and accessibility.
   * 
   * Steps:
   * 1. Validate the newPage using validateInput.
   * 2. Update the currentPage state.
   * 3. Fetch data for the new page using fetchPageData.
   * 
   * @param newPage - The new page number to navigate to.
   */
  async handlePageChange(newPage: number): Promise<void> {
    try {
      // Validate the newPage using validateInput.
      validateInput('newPage', newPage);

      // Update the currentPage state.
      this.setState({ currentPage: newPage });

      // Fetch data for the new page using fetchPageData.
      const data = await this.fetchPageData(newPage);

      // If there's an onPageChange prop, call it with the new data.
      if (this.props.onPageChange) {
        this.props.onPageChange(data);
      }

    } catch (error) {
      // Handle potential errors (e.g., display an error message to the user)
      logger.error('Error handling page change:', error);
    }
  }

  /**
   * Renders pagination buttons based on the total number of pages.
   * 
   * Requirements Addressed:
   * - Data Navigation (Technical Specification/User Interface/Components)
   *   Displays pagination controls, enabling users to navigate through data sets easily.
   * 
   * @returns An array of JSX elements representing page number buttons.
   */
  renderPageNumbers(): JSX.Element[] {
    const { totalPages } = this.props;
    const { currentPage } = this.state;
    const pageNumbers = [];

    // Generate page number buttons
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          isActive={i === currentPage}
          onClick={() => this.handlePageChange(i)}
        >
          {i}
        </PageNumber>
      );
    }

    return pageNumbers;
  }

  render() {
    return (
      <PaginationStyles>
        {this.renderPageNumbers()}
      </PaginationStyles>
    );
  }

}

export default Pagination;