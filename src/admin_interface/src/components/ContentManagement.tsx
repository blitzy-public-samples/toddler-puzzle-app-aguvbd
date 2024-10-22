import React, { useEffect, useState } from 'react'; // Version 17.0.2
import styled from 'styled-components'; // Version 5.3.3

// Internal dependencies
import { API_BASE_URL } from '../utils/Constants'; // Defines the base URL for constructing API requests.
import logger from '../utils/Logger'; // Logs content management operations and errors.
import validateInput from '../utils/Validator'; // Validates data before processing content-related operations.

import apiClient from '../services/ApiService'; // Handles HTTP requests to the backend server for content operations.
import { fetchImages, approveImage, deleteImage } from '../services/ImageService'; // Manages image-related operations.

// Components
import GlobalStyles from '../styles/GlobalStyles'; // Ensures consistent styling across the component.
import NavigationBar from './NavigationBar'; // Provides navigation controls for accessing different sections of the admin dashboard.
import Pagination from './Pagination'; // Provides pagination controls for navigating through lists of data.
import SearchFilter from './SearchFilter'; // Provides search and filter capabilities for managing content.
import ImageApproval from './ImageApproval'; // Allows administrators to review, approve, or delete AI-generated images.

/**
 * ContentManagement Component
 * 
 * Renders the content management interface, integrating various components
 * and services to facilitate content management operations.
 * 
 * Requirements Addressed:
 * - Feature 7: Admin Controls (TR-7.2)
 *   - Implements functionalities to review, approve, or delete AI-generated images.
 *   - Location: Technical Specification/System Components/Image Management
 */
const ContentManagement: React.FC = () => {
    // State variables for managing content data and loading states
    const [images, setImages] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filters, setFilters] = useState<any>({});
    const ITEMS_PER_PAGE = 10;

    // Fetch initial data using ApiService on component mount and when dependencies change
    useEffect(() => {
        /**
         * useEffect Hook
         * 
         * Fetches pending AI-generated images from the backend server when the component is mounted or when
         * currentPage, searchQuery, or filters change.
         * 
         * Requirements Addressed:
         * - Fetches data to facilitate content management operations.
         * - Utilizes fetchImages function from ImageService.
         */
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    search: searchQuery,
                    filters: filters,
                };
                
                // Validate input parameters before sending request
                if (!validateInput(params)) {
                    throw new Error('Invalid input parameters');
                }

                const response = await fetchImages(params);
                setImages(response.images);
                setTotalPages(response.totalPages);
            } catch (error) {
                logger.error('Error fetching images', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage, searchQuery, filters]);

    // Handle content management actions such as approving or deleting images
    const handleApprove = async (imageId: string) => {
        /**
         * handleApprove Function
         * 
         * Approves a specific AI-generated image.
         * 
         * Requirements Addressed:
         * - Implements approveImage functionality as per TR-7.2.
         */
        try {
            await approveImage(imageId);
            logger.info(`Image ${imageId} approved successfully.`);
            // Update the images state to remove the approved image
            setImages(prevImages => prevImages.filter(image => image.id !== imageId));
        } catch (error) {
            logger.error(`Error approving image ${imageId}`, error);
        }
    };

    const handleDelete = async (imageId: string) => {
        /**
         * handleDelete Function
         * 
         * Deletes a specific AI-generated image.
         * 
         * Requirements Addressed:
         * - Implements deleteImage functionality as per TR-7.2.
         */
        try {
            await deleteImage(imageId);
            logger.info(`Image ${imageId} deleted successfully.`);
            // Update the images state to remove the deleted image
            setImages(prevImages => prevImages.filter(image => image.id !== imageId));
        } catch (error) {
            logger.error(`Error deleting image ${imageId}`, error);
        }
    };

    const handleSearch = (query: string) => {
        /**
         * handleSearch Function
         * 
         * Updates the searchQuery state based on user input.
         */
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilters: any) => {
        /**
         * handleFilterChange Function
         * 
         * Updates the filters state based on selected filters.
         */
        setFilters(newFilters);
    };

    const handlePageChange = (pageNumber: number) => {
        /**
         * handlePageChange Function
         * 
         * Updates the currentPage state to paginate the list of images.
         */
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {/* Apply global styles for consistent styling */}
            <GlobalStyles />

            {/* Render the NavigationBar */}
            <NavigationBar />

            {/* Main Content Container */}
            <ContentContainer>
                {/* Render the SearchFilter component */}
                <SearchFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />

                {/* Render the ImageApproval component */}
                <ImageApproval
                    images={images}
                    isLoading={isLoading}
                    onApprove={handleApprove}
                    onDelete={handleDelete}
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

export default ContentManagement;

// Styled Components
const ContentContainer = styled.div`
    /**
     * ContentContainer Styled Component
     * 
     * Provides styling for the main content area of the ContentManagement component.
     * Ensures consistent styling as per GlobalStyles.
     * 
     * Requirements Addressed:
     * - Applies global styles using GlobalStyles.
     */
    padding: 20px;
`;