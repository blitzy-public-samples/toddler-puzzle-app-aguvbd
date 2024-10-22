"""
Service module responsible for generating AI-based images for puzzles using external AI services.

Requirements Addressed:
- AI-Generated Images (Feature 2: AI-Generated Images)
  - TR-2.1: Establish a reliable connection with the DALL-E API for image generation.
    (Location: TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images/TR-2.1)
  - TR-2.4: Ensure image formats and resolutions are optimized for mobile devices.
    (Location: TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images/TR-2.4)
  - TR-2.5: Handle API rate limiting and implement retry logic for failed requests.
    (Location: TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images/TR-2.5)
"""

# External Dependencies
import requests  # version 2.25.1
import json  # version builtin
import os
import time
import uuid

# Internal Dependencies
from src.configs.settings import AI_IMAGE_API_KEY, LOG_LEVEL
from src.utils.logger import setup_logger
from src.utils.image_processor import process_image

# Global logger setup
logger = setup_logger(LOG_LEVEL)

def generate_image(prompt: str) -> str:
    """
    Generates an AI-based image using an external AI service.

    Parameters:
        prompt (str): The text prompt to generate the image from.

    Returns:
        str: Path to the generated and processed image.

    Requirements Addressed:
    - TR-2.1: Establish a reliable connection with the DALL-E API for image generation.
      (Location: TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images/TR-2.1)
    - TR-2.4: Ensure image formats and resolutions are optimized for mobile devices.
      (Location: TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images/TR-2.4)
    - TR-2.5: Handle API rate limiting and implement retry logic for failed requests.
      (Location: TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images/TR-2.5)
    """
    # Step 1: Set up logging for the image generation task
    logger.info(f"Starting image generation for prompt: '{prompt}'")

    # Define the AI image generation API endpoint
    ai_image_api_url = "https://api.openai.com/v1/images/generations"  # DALL-E API Endpoint

    # Prepare headers with the API key for authentication
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {AI_IMAGE_API_KEY}"
    }

    # Step 2: Prepare the request payload with the provided prompt and API key
    payload = {
        "prompt": prompt,
        "n": 1,
        "size": "512x512",
        "response_format": "url"
    }

    # Step 3: Send a POST request to the AI image generation API
    max_retries = 3
    retry_delay = 5  # in seconds
    attempt = 0

    while attempt < max_retries:
        try:
            logger.debug(f"Attempt {attempt + 1}: Sending request to AI image generation API")
            response = requests.post(ai_image_api_url, headers=headers, data=json.dumps(payload))

            # Check if the request was successful
            if response.status_code == 200:
                logger.debug("Received successful response from AI image generation API")
                # Step 4: Parse the API response to extract the image data
                response_data = response.json()
                image_url = response_data['data'][0]['url']

                # Download the image data
                image_response = requests.get(image_url)
                if image_response.status_code == 200:
                    logger.debug("Image data successfully retrieved from URL")
                    # Step 5: Save the image data to a file
                    image_filename = f"generated_image_{uuid.uuid4()}.png"
                    image_directory = os.path.join("generated_images")
                    os.makedirs(image_directory, exist_ok=True)
                    image_path = os.path.join(image_directory, image_filename)

                    with open(image_path, 'wb') as image_file:
                        image_file.write(image_response.content)
                    logger.info(f"Image saved to {image_path}")

                    # Step 6: Process the saved image to ensure it meets app specifications
                    processed_image_path = process_image(image_path)
                    logger.info(f"Processed image saved to {processed_image_path}")

                    # Step 7: Return the path to the processed image
                    return processed_image_path
                else:
                    logger.error(f"Failed to download image from {image_url}")
                    raise Exception(f"Image download failed with status code {image_response.status_code}")
            elif response.status_code == 429:
                # Handle rate limiting as per TR-2.5
                logger.warning("Rate limit exceeded. Retrying after delay...")
                attempt += 1
                time.sleep(retry_delay)
            else:
                logger.error(f"API responded with unexpected status code {response.status_code}: {response.text}")
                response.raise_for_status()
        except requests.exceptions.RequestException as e:
            logger.exception(f"RequestException occurred: {e}")
            attempt += 1
            time.sleep(retry_delay)
        except Exception as e:
            logger.exception(f"An unexpected error occurred: {e}")
            attempt += 1
            time.sleep(retry_delay)

    # If all retries fail, raise an exception
    logger.error("All attempts to generate image have failed.")
    raise Exception("Failed to generate image after multiple attempts.")