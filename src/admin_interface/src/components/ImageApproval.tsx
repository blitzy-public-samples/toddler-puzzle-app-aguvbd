// File: ImageApproval.tsx
// Description: This component provides the interface for administrators to approve or delete AI-generated images.
// It integrates various services and utilities to facilitate image management operations.

// External Dependencies
import React, { useEffect, useState } from 'react'; // React library for building the component. (Version: 17.0.2)
import styled from 'styled-components'; // Provides utilities for defining and managing CSS-in-JS styles. (Version: 5.3.3)

// Internal Dependencies
import { API_BASE_URL } from '../utils/Constants'; // Defines the base URL for constructing API requests.
import logger from '../utils/Logger'; // Logs image approval operations and errors.
import { validateInput } from '../utils/Validator'; // Validates data before processing image-related operations.
import apiClient from '../services/ApiService'; // Handles HTTP requests to the backend server for image operations.
import { fetchImages, approveImage, deleteImage } from '../services/ImageService'; // Image management operations.
import GlobalStyles from '../styles/GlobalStyles'; // Ensures consistent styling across the component.

/**
 * Interface for Image Data
 */
interface ImageData {
  id: number;
  url: string;
  // Additional properties can be added here.
}

/**
 * Styled-components for styling the ImageApproval component.
 * Applying GlobalStyles to ensure consistent styling across the component.
 */
const Container = styled.div`
  ${GlobalStyles}
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageCard = styled.div`
  width: 250px;
  margin: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const ApproveButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #e53935;
  }
`;

/**
 * ImageApproval Component
 * 
 * Renders the image approval interface, displaying a list of images and providing actions to approve or delete them.
 * 
 * Requirements Addressed:
 * - Image Management (Technical Specification/System Components/Image Management)
 *   - Facilitates the management of AI-generated images, including reviewing, approving, and deleting images within the admin interface.
 */
const ImageApproval: React.FC = () => {
  // State variables for managing image data and loading states.
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  /**
   * Fetch pending images using fetchImages on component mount.
   * Logs actions and errors using logger.
   */
  useEffect(() => {
    const getPendingImages = async () => {
      try {
        logger.info('Fetching pending images for approval.');
        const response = await fetchImages();
        setImages(response);
        logger.info('Fetched pending images successfully.');
      } catch (err) {
        logger.error('Error fetching pending images:', err);
        setError('Failed to load images.');
      } finally {
        setLoading(false);
      }
    };

    getPendingImages();
  }, []);

  /**
   * Handles the approval of an image.
   * Calls approveImage from ImageService and updates state accordingly.
   * Validates input using validateInput before processing image-related operations.
   * Logs actions and errors using logger.
   * 
   * @param imageId - The ID of the image to approve.
   */
  const handleApprove = async (imageId: number) => {
    try {
      validateInput(imageId);
      logger.info(`Approving image with ID: ${imageId}`);
      await approveImage(imageId);
      setImages(images.filter((image) => image.id !== imageId));
      logger.info(`Image with ID: ${imageId} approved successfully.`);
    } catch (err) {
      logger.error(`Error approving image with ID: ${imageId}`, err);
      setError(`Failed to approve image with ID: ${imageId}.`);
    }
  };

  /**
   * Handles the deletion of an image.
   * Calls deleteImage from ImageService and updates state accordingly.
   * Validates input using validateInput before processing image-related operations.
   * Logs actions and errors using logger.
   * 
   * @param imageId - The ID of the image to delete.
   */
  const handleDelete = async (imageId: number) => {
    try {
      validateInput(imageId);
      logger.info(`Deleting image with ID: ${imageId}`);
      await deleteImage(imageId);
      setImages(images.filter((image) => image.id !== imageId));
      logger.info(`Image with ID: ${imageId} deleted successfully.`);
    } catch (err) {
      logger.error(`Error deleting image with ID: ${imageId}`, err);
      setError(`Failed to delete image with ID: ${imageId}.`);
    }
  };

  /**
   * Returns the rendered component.
   * Applies GlobalStyles for consistent styling.
   */
  return (
    <Container>
      <Title>Image Approval</Title>
      {loading && <p>Loading images...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ImageList>
        {images.map((image) => (
          <ImageCard key={image.id}>
            <Image src={image.url} alt={`AI-generated image ${image.id}`} />
            <ButtonGroup>
              <ApproveButton onClick={() => handleApprove(image.id)}>Approve</ApproveButton>
              <DeleteButton onClick={() => handleDelete(image.id)}>Delete</DeleteButton>
            </ButtonGroup>
          </ImageCard>
        ))}
      </ImageList>
    </Container>
  );
};

export default ImageApproval;