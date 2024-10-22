#!/bin/bash

# -----------------------------------------------------------------------------
# Script: deploy.sh
# Description:
#   Automates the deployment of infrastructure using Terraform. It ensures that
#   all resources defined in the Terraform configurations are deployed
#   consistently and efficiently.
#
# Requirements Addressed:
# - Infrastructure Deployment Automation
#   - Location: SYSTEM ARCHITECTURE/Infrastructure
#   - Description: Automates the deployment process of infrastructure components
#     using Terraform, ensuring consistency and reducing manual intervention.
#
# Dependencies:
# - Terraform (Version >= 0.12)  # External dependency
# - Internal Terraform configuration files:
#   - main.tf: Contains the main Terraform configuration for managing infrastructure.
#   - variables.tf: Defines variables used in Terraform configurations.
#   - outputs.tf: Defines outputs for the Terraform configuration.
#   - providers.tf: Specifies providers required for Terraform configurations.
#   - backend.tf: Configures the backend for storing Terraform state.
#
# Globals:
# - TF_VAR_environment: Sets the environment variable for Terraform to 'production'.
# -----------------------------------------------------------------------------

# Exit immediately if a command exits with a non-zero status.
set -e

# Set environment variables for Terraform.
# Setting the environment to 'production' ensures resources are deployed correctly.
export TF_VAR_environment="production"

# Function: initialize_terraform
# Description:
#   Initializes Terraform by setting up the backend and preparing the working directory.
# Steps:
#   - Run 'terraform init' to initialize the working directory.
# Requirements Addressed:
#   - Automates the initialization process, reducing manual steps.
#   - Location in Documentation: TR-8.2 (Implement automated deployment pipelines)
initialize_terraform() {
    echo "Initializing Terraform..."
    
    # Run 'terraform init' to initialize the working directory.
    terraform init

    if [ $? -ne 0 ]; then
        echo "Error: Terraform initialization failed."
        exit 1
    fi
}

# Function: apply_terraform
# Description:
#   Applies the Terraform configurations to deploy the infrastructure.
# Steps:
#   - Run 'terraform apply' to deploy all resources defined in the configurations.
# Requirements Addressed:
#   - Automates the deployment of infrastructure components.
#   - Location in Documentation: TR-8.2 (Implement automated deployment pipelines)
apply_terraform() {
    echo "Applying Terraform configurations..."

    # Run 'terraform apply' to deploy all resources without manual approval.
    terraform apply -auto-approve

    if [ $? -ne 0 ]; then
        echo "Error: Terraform apply failed."
        exit 1
    fi
}

# Main script execution.
main() {
    echo "Starting infrastructure deployment..."

    # Initialize Terraform.
    initialize_terraform

    # Apply Terraform configurations.
    apply_terraform

    echo "Infrastructure deployment completed successfully."
}

# Error handling.
# Trap any errors during the deployment process and display an informative message.
trap 'echo "An error occurred during the deployment process. Please check the logs for more details." ; exit 1' ERR

# Execute main function.
main