// Import necessary modules and components

// External dependencies
import React, { useState, useEffect } from 'react'; // React version 17.0.2
import styled from 'styled-components'; // styled-components version 5.3.3

// Internal dependencies
import NavigationBar from '../components/NavigationBar'; // Provides navigation controls for accessing different sections of the admin dashboard.
import Pagination from '../components/Pagination'; // Provides pagination controls for navigating through lists of data.
import SearchFilter from '../components/SearchFilter'; // Provides search and filter capabilities for managing content.
import ImageApproval from '../components/ImageApproval'; // Allows administrators to review, approve, or delete AI-generated images.
import GlobalStyles from '../styles/GlobalStyles'; // Ensures consistent styling across the component.
import { API_BASE_URL } from '../utils/Constants'; // Defines the base URL for constructing API requests.
import logger from '../utils/Logger'; // Logs content management operations and errors.
import { validateInput } from '../utils/Validator'; // Validates data before processing content-related operations.
import apiClient from '../services/ApiService'; // Handles HTTP requests to the backend server for content operations.
import {
  fetchImages,
  approveImage,
  deleteImage,
} from '../services/ImageService'; // Fetches images pending approval and handles approve/delete actions.

// ContentManagementPage Component
/**
 * Renders the content management page, integrating various components and services to facilitate content management operations.
 * 
 * Addresses:
 * - Content Management: Facilitates the management of AI-generated content, including reviewing, approving, and deleting images within the admin interface.
 *   - Location: Technical Specification > System Components > Image Management
 *   - Requirements: TR-7.1, TR-7.2, TR-7.3, TR-7.4, TR-7.6
 */
const ContentManagementPage: React.FC = () => {
  // State variables for managing content data and loading states
  const [images, setImages] = useState<any[]>([]); // Holds the list of AI-generated images pending approval
  const [currentPage, setCurrentPage] = useState<number>(1); // Manages the current page for pagination
  const [totalPages, setTotalPages] = useState<number>(1); // Stores the total number of pages available
  const [loading, setLoading] = useState<boolean>(false); // Indicates if the data is currently being loaded
  const [error, setError] = useState<string | null>(null); // Holds any error messages
  const [searchQuery, setSearchQuery] = useState<string>(''); // Stores the current search query for filtering images

  // Fetch initial data using ImageService on component mount
  useEffect(() => {
    /**
     * Loads images pending approval from the backend.
     * Validates inputs and handles loading state.
     * Logs operations and errors using the logger utility.
     * 
     * Addresses:
     * - TR-7.2: Implement functionalities to review, approve, or delete AI-generated images.
     * - TR-7.3: Ensure that all administrative actions are logged for auditing purposes.
     */
    const loadImages = async () => {
      setLoading(true);
      try {
        // Validate the current page number before making the request
        validateInput({ page: currentPage });

        // Fetch images from the backend server
        const response = await fetchImages(currentPage, searchQuery);

        // Update state with fetched images and total pages
        setImages(response.images);
        setTotalPages(response.totalPages);

        // Log the successful fetch operation
        logger.info(
          'ContentManagementPage',
          'Fetched images successfully.',
          'Technical Requirement TR-7.2'
        );
      } catch (err) {
        // Log the error encountered during fetch operation
        logger.error(
          'ContentManagementPage',
          'Error fetching images.',
          'Technical Requirement TR-7.3',
          err
        );
        setError('Failed to load images.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [currentPage, searchQuery]);

  // Handle content management actions such as approving images
  /**
   * Approves a specific AI-generated image.
   * Updates the UI to reflect the change.
   * 
   * Addresses:
   * - TR-7.2: Implement functionalities to approve AI-generated images.
   * - TR-7.3: Log administrative actions for auditing purposes.
   */
  const handleApprove = async (imageId: string) => {
    try {
      // Approve the image using the ImageService
      await approveImage(imageId);

      // Remove the approved image from the list
      setImages(images.filter((image) => image.id !== imageId));

      // Log the approval action
      logger.info(
        'ContentManagementPage',
        `Approved image ID: ${imageId}.`,
        'Technical Requirement TR-7.3'
      );
    } catch (err) {
      // Log the error encountered during approval
      logger.error(
        'ContentManagementPage',
        `Error approving image ID: ${imageId}.`,
        'Technical Requirement TR-7.3',
        err
      );
      setError('Failed to approve image.');
    }
  };

  // Handle content management actions such as deleting images
  /**
   * Deletes a specific AI-generated image.
   * Updates the UI to reflect the deletion.
   * 
   * Addresses:
   * - TR-7.2: Implement functionalities to delete AI-generated images.
   * - TR-7.3: Log administrative actions for auditing purposes.
   */
  const handleDelete = async (imageId: string) => {
    try {
      // Delete the image using the ImageService
      await deleteImage(imageId);

      // Remove the deleted image from the list
      setImages(images.filter((image) => image.id !== imageId));

      // Log the deletion action
      logger.info(
        'ContentManagementPage',
        `Deleted image ID: ${imageId}.`,
        'Technical Requirement TR-7.3'
      );
    } catch (err) {
      // Log the error encountered during deletion
      logger.error(
        'ContentManagementPage',
        `Error deleting image ID: ${imageId}.`,
        'Technical Requirement TR-7.3',
        err
      );
      setError('Failed to delete image.');
    }
  };

  // Handle changes in pagination
  /**
   * Updates the current page state when the user navigates through pagination controls.
   * 
   * Addresses:
   * - Enhances user experience by providing pagination controls.
   */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle search and filter functionality
  /**
   * Updates the search query state based on user input to filter images.
   * 
   * Addresses:
   * - TR-7.4: Provide search and filter capabilities to streamline content management.
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* Apply global styles */}
      <GlobalStyles />

      {/* Render the NavigationBar component */}
      <NavigationBar />

      {/* Main content area */}
      <ContentContainer>
        {/* Render the SearchFilter component */}
        <SearchFilter onSearch={handleSearch} />

        {/* Render the ImageApproval component */}
        <ImageApproval
          images={images}
          onApprove={handleApprove}
          onDelete={handleDelete}
          loading={loading}
          error={error}
        />

        {/* Render the Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </ContentContainer>
    </>
  );
};

// Styled component for the main content container
const ContentContainer = styled.div`
  padding: 20px;
`;

// Export the ContentManagementPage component
export default ContentManagementPage;