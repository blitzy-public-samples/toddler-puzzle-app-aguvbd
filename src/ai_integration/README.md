# AI Integration Module Documentation

This documentation provides detailed guidelines for setting up and using the AI Integration module, which handles AI image generation and content moderation for the Toddler Puzzle App.

The AI Integration module is designed to fulfill the requirements specified in **TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images** (TR-2) of the Technical Specification document.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Environment Variables (`.env`)](#environment-variables-env)
  - [Configuration Settings (`settings.py`)](#configuration-settings-settingspy)
- [Usage](#usage)
- [Module Components](#module-components)
  - [Logger Utility (`logger.py`)](#logger-utility-loggerpy)
  - [Image Processor (`image_processor.py`)](#image-processor-image_processorpy)
  - [AI Image Generator Service (`ai_image_generator.py`)](#ai-image-generator-service-ai_image_generatorpy)
  - [Content Moderation Service (`content_moderation.py`)](#content-moderation-service-content_moderationpy)
  - [Main Orchestration Script (`main.py`)](#main-orchestration-script-mainpy)
- [Testing](#testing)
  - [Testing AI Image Generator (`test_ai_image_generator.py`)](#testing-ai-image-generator-test_ai_image_generatorpy)
  - [Testing Content Moderation (`test_content_moderation.py`)](#testing-content-moderation-test_content_moderationpy)
- [Dependencies](#dependencies)
  - [Internal Dependencies](#internal-dependencies)
  - [External Dependencies](#external-dependencies)
- [Environment Setup](#environment-setup)
- [Additional Notes](#additional-notes)

## Prerequisites

- **Python 3.8** or higher
- **Virtual Environment** tool (e.g., `venv` or `virtualenv`)
- **Access to AI Image Generation API** (e.g., DALL-E)
- **Internet Connection** for API requests

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the AI Integration module directory:**

   ```bash
   cd src/ai_integration
   ```

3. **Create and activate a virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install the required Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

## Configuration

Proper configuration is essential for the module to interact with external services and handle operations effectively.

### Environment Variables (`.env`)

Create a `.env` file in the `src/ai_integration` directory with the following environment variables:

```dotenv
# API configuration
AI_API_KEY=<your_ai_api_key>
AI_API_ENDPOINT=<your_ai_api_endpoint>

# Logging configuration
LOG_LEVEL=INFO

# Other configurations as needed
```

> **Note:** The `.env` file stores sensitive information like API keys. Ensure this file is excluded from version control as per **TR-2.1** and **TR-2.5** in **TECHNICAL REQUIREMENTS/Feature 2: AI-Generated Images**.

### Configuration Settings (`settings.py`)

The `settings.py` file loads environment variables and sets up configuration parameters used across the module.

- **Purpose:** Manages configurations such as API endpoints, API keys, and logging levels.
- **Related Requirements:**
  - **TR-2.1:** Establish a reliable connection with the AI image generation API.
  - **TR-2.5:** Handle API rate limiting and implement retry logic.

## Usage

To run the main orchestration script, execute:

```bash
python src/main.py
```

This script initiates the AI image generation and content moderation processes, aligning with **TR-2** requirements.

## Module Components

### Logger Utility (`logger.py`)

- **Module Path:** `src/ai_integration/src/utils/logger.py`
- **Purpose:** Sets up logging across the module to facilitate debugging and monitoring.
- **Usage:** Import the logger in other modules to log messages at various severity levels.
- **Related Requirements:**
  - **TR-2.5:** Implement logging for API interactions and errors.

### Image Processor (`image_processor.py`)

- **Module Path:** `src/ai_integration/src/utils/image_processor.py`
- **Purpose:** Handles image processing tasks such as resizing and format conversion.
- **Dependencies:** Uses `Pillow` library (version 8.2.0).
- **Related Requirements:**
  - **TR-2.4:** Ensure image formats and resolutions are optimized for mobile devices.

### AI Image Generator Service (`ai_image_generator.py`)

- **Module Path:** `src/ai_integration/src/services/ai_image_generator.py`
- **Purpose:** Interacts with the AI image generation API to request new images.
- **Dependencies:** Requires `requests` library (version 2.25.1) for HTTP requests.
- **Related Requirements:**
  - **TR-2.1:** Establish a connection with the AI API.
  - **TR-2.5:** Handle API rate limiting and implement retry logic.

### Content Moderation Service (`content_moderation.py`)

- **Module Path:** `src/ai_integration/src/services/content_moderation.py`
- **Purpose:** Filters and approves AI-generated images to ensure content appropriateness.
- **Related Requirements:**
  - **TR-2.3:** Develop a content moderation pipeline to filter images before use.

### Main Orchestration Script (`main.py`)

- **Module Path:** `src/ai_integration/src/main.py`
- **Purpose:** Coordinates the entire process of image generation and moderation.
- **Related Requirements:**
  - **TR-2.2:** Implement caching mechanisms to store AI-generated images locally.

## Testing

Testing ensures that each component functions as expected and meets the specified requirements.

### Testing AI Image Generator (`test_ai_image_generator.py`)

- **Module Path:** `src/ai_integration/src/tests/test_ai_image_generator.py`
- **Purpose:** Contains unit tests for the AI Image Generator service.
- **Related Requirements:**
  - **TR-2.1:** Verify reliable connection with the AI API.
  - **TR-2.5:** Test handling of API rate limiting and retry logic.

### Testing Content Moderation (`test_content_moderation.py`)

- **Module Path:** `src/ai_integration/src/tests/test_content_moderation.py`
- **Purpose:** Contains unit tests for the Content Moderation service.
- **Related Requirements:**
  - **TR-2.3:** Ensure inappropriate content is correctly filtered.

## Dependencies

### Internal Dependencies

- **`settings.py`**
  - **Purpose:** Manages configuration settings such as API keys and logging levels.
  - **Related Requirements:** Documented as per **TR-2.1**.

- **`logger.py`**
  - **Purpose:** Sets up logging for the module.
  - **Related Requirements:** Explained as per **TR-2.5**.

- **`image_processor.py`**
  - **Purpose:** Processes images to meet application requirements.
  - **Related Requirements:** Detailed as per **TR-2.4**.

- **`ai_image_generator.py`**
  - **Purpose:** Handles AI image generation API interactions.
  - **Related Requirements:** Described as per **TR-2.1** and **TR-2.5**.

- **`content_moderation.py`**
  - **Purpose:** Implements the content moderation pipeline.
  - **Related Requirements:** Outlined as per **TR-2.3**.

- **`main.py`**
  - **Purpose:** Orchestrates image generation and moderation processes.
  - **Related Requirements:** Provides an overview as per **TR-2**.

- **`test_ai_image_generator.py`**
  - **Purpose:** Tests the AI image generator functionality.
  - **Related Requirements:** Includes testing strategies as per **TR-2.1** and **TR-2.5**.

- **`test_content_moderation.py`**
  - **Purpose:** Tests the content moderation functionality.
  - **Related Requirements:** Includes testing strategies as per **TR-2.3**.

- **`requirements.txt`**
  - **Purpose:** Lists all Python dependencies required for the module.
  - **Related Requirements:** Explains dependencies as per **TR-2**.

- **`.env`**
  - **Purpose:** Guides on setting environment variables.
  - **Related Requirements:** Instructed as per **TR-2.1**.

### External Dependencies

- **`requests`** (version 2.25.1)
  - **Purpose:** Used for making HTTP requests to the AI image generation API.
  - **Comment:** Ensure compatibility with the API as per **TR-2.1**.
  
- **`Pillow`** (version 8.2.0)
  - **Purpose:** Used for image processing tasks like resizing and format conversion.
  - **Comment:** Required for optimizing images per **TR-2.4**.

## Environment Setup

Ensure all environment variables are correctly set and dependencies are installed. This module interacts with external APIs, so a stable internet connection is required during operation.

## Additional Notes

- **Caching Mechanisms:**
  - Implemented in `main.py` to store images locally, fulfilling **TR-2.2**.
  
- **Error Handling:**
  - Robust error handling is in place to manage API failures, aligning with **TR-2.5**.
  
- **Content Appropriateness:**
  - The content moderation criteria are defined in `content_moderation.py`, ensuring compliance with **TR-2.3**.

- **Logging:**
  - Logging levels can be adjusted in the `.env` file and are crucial for monitoring as per **TR-2.5**.

---