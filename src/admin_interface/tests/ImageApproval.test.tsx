// React version: 17.0.2
// Provides the React library for rendering components in tests.
import React from 'react';

// @testing-library/react version: 12.1.2
// Provides utilities for testing React components.
import { render, fireEvent, waitFor } from '@testing-library/react';

// Importing the ImageApproval component under test.
// Location: src/admin_interface/src/components/ImageApproval.tsx
// Purpose: The component under test, providing the interface for image approval.
// Requirements Addressed: Image Management Testing
// Location in Documentation: Technical Specification/System Components/Image Management
import ImageApproval from '../src/components/ImageApproval';

// Importing mocked service functions.
// Location: src/admin_interface/src/services/ImageService.ts
// Purpose: Mocked service functions to fetch, approve, and delete images.
import * as ImageService from '../src/services/ImageService';

// Importing mocked logger.
// Location: src/admin_interface/src/utils/Logger.ts
// Purpose: Mocked logger to verify logging during tests.
import logger from '../src/utils/Logger';

// Importing mocked validator.
// Location: src/admin_interface/src/utils/Validator.ts
// Purpose: Mocked validator to ensure input validation in tests.
import validateInput from '../src/utils/Validator';

// Importing constants.
// Location: src/admin_interface/src/utils/Constants.ts
// Purpose: Used to construct API request URLs in tests.
import { API_BASE_URL } from '../src/utils/Constants';

// jest version: 27.0.6
// Testing framework used to write and run the tests.

// Mocking external dependencies using jest.
jest.mock('../src/services/ImageService');
jest.mock('../src/utils/Logger');
jest.mock('../src/utils/Validator');

/**
 * Test suite for the ImageApproval component.
 * Requirements Addressed: Image Management Testing
 * Location in Documentation: Technical Specification/System Components/Image Management
 */
describe('ImageApproval Component Tests', () => {
  // Resetting mocks before each test to ensure test isolation.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Function: testImageApproval
   * Description: Tests the image approval functionality of the ImageApproval component.
   * Requirements Addressed: Image Management Testing
   * Location in Documentation: Technical Specification/System Components/Image Management
   * Parameters: None
   * Returns: void
   * Steps:
   *   1. Mock the fetchImages, approveImage, and deleteImage service functions.
   *   2. Render the ImageApproval component using React Testing Library.
   *   3. Simulate user interactions for approving an image.
   *   4. Verify that approveImage is called with the correct parameters.
   *   5. Check that the logger logs the approval action.
   *   6. Assert that the UI updates to reflect the approved image.
   */
  test('testImageApproval: Tests the image approval functionality of the ImageApproval component.', async () => {
    // Step 1: Mocking the fetchImages service function to return a list of pending images.
    const mockImages = [
      {
        id: 'image1',
        url: 'http://example.com/image1.png',
        description: 'An AI-generated image',
      },
    ];
    ImageService.fetchImages.mockResolvedValueOnce(mockImages);

    // Step 2: Rendering the ImageApproval component.
    const { getByText, queryByText } = render(<ImageApproval />);

    // Waiting for images to load and verifying fetchImages is called.
    await waitFor(() => {
      expect(ImageService.fetchImages).toHaveBeenCalledTimes(1);
    });

    // Step 3: Simulating user interaction for approving an image.
    const approveButton = getByText('Approve');
    fireEvent.click(approveButton);

    // Step 4: Verifying approveImage is called with the correct parameters.
    expect(ImageService.approveImage).toHaveBeenCalledWith('image1');

    // Step 5: Checking that the logger logs the approval action.
    expect(logger.info).toHaveBeenCalledWith('Image approved: image1');

    // Step 6: Asserting that the UI updates to reflect the approved image.
    await waitFor(() => {
      expect(queryByText('Approve')).toBeNull();
      expect(getByText('No pending images')).toBeInTheDocument();
    });
  });

  /**
   * Function: testImageDeletion
   * Description: Tests the image deletion functionality of the ImageApproval component.
   * Requirements Addressed: Image Management Testing
   * Location in Documentation: Technical Specification/System Components/Image Management
   * Parameters: None
   * Returns: void
   * Steps:
   *   1. Mock the fetchImages, approveImage, and deleteImage service functions.
   *   2. Render the ImageApproval component using React Testing Library.
   *   3. Simulate user interactions for deleting an image.
   *   4. Verify that deleteImage is called with the correct parameters.
   *   5. Check that the logger logs the deletion action.
   *   6. Assert that the UI updates to reflect the deleted image.
   */
  test('testImageDeletion: Tests the image deletion functionality of the ImageApproval component.', async () => {
    // Step 1: Mocking the fetchImages service function to return a list of pending images.
    const mockImages = [
      {
        id: 'image2',
        url: 'http://example.com/image2.png',
        description: 'Another AI-generated image',
      },
    ];
    ImageService.fetchImages.mockResolvedValueOnce(mockImages);

    // Step 2: Rendering the ImageApproval component.
    const { getByText, queryByText } = render(<ImageApproval />);

    // Waiting for images to load and verifying fetchImages is called.
    await waitFor(() => {
      expect(ImageService.fetchImages).toHaveBeenCalledTimes(1);
    });

    // Step 3: Simulating user interaction for deleting an image.
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    // Step 4: Verifying deleteImage is called with the correct parameters.
    expect(ImageService.deleteImage).toHaveBeenCalledWith('image2');

    // Step 5: Checking that the logger logs the deletion action.
    expect(logger.info).toHaveBeenCalledWith('Image deleted: image2');

    // Step 6: Asserting that the UI updates to reflect the deleted image.
    await waitFor(() => {
      expect(queryByText('Delete')).toBeNull();
      expect(getByText('No pending images')).toBeInTheDocument();
    });
  });
});