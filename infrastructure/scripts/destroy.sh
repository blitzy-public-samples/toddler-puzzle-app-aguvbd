#!/bin/bash

# destroy.sh
#
# Description:
# A shell script to automate the destruction of infrastructure using Terraform.
# It ensures that all resources defined in the Terraform configurations are safely and efficiently destroyed, cleaning up the environment.
#
# Requirements Addressed:
# - Infrastructure Destruction Automation
#   Location: SYSTEM ARCHITECTURE/Infrastructure
#   Description: Automates the destruction process of infrastructure components using Terraform, ensuring safe and efficient cleanup of resources.

# Dependencies:
# - Terraform (>= 0.12) # Infrastructure as code tool used to define and provision infrastructure.
# - Internal Dependencies:
#   - main.tf (infrastructure/terraform/main.tf): Contains the main Terraform configuration for managing infrastructure.
#   - variables.tf (infrastructure/terraform/variables.tf): Defines variables used in Terraform configurations.
#   - outputs.tf (infrastructure/terraform/outputs.tf): Defines outputs for the Terraform configuration.
#   - providers.tf (infrastructure/terraform/providers.tf): Specifies providers required for Terraform configurations.
#   - backend.tf (infrastructure/terraform/backend.tf): Configures the backend for storing Terraform state.
# - Related Scripts:
#   - deploy.sh (infrastructure/scripts/deploy.sh): Automates the deployment of infrastructure using Terraform.

# Set environment variables for Terraform
# Setting TF_VAR_environment to 'production' to specify the target environment.
# Requirements Addressed:
# - Infrastructure Destruction Automation
#   Location: SYSTEM ARCHITECTURE/Infrastructure
#   Description: Ensures that the Terraform commands are executed in the correct environment.

export TF_VAR_environment="production"

# Function: initialize_terraform
# Description:
# Initializes Terraform by setting up the backend and preparing the working directory.
# Steps:
# - Run 'terraform init' to initialize the working directory.
# Requirements Addressed:
# - Infrastructure Destruction Automation
#   Location: SYSTEM ARCHITECTURE/Infrastructure
#   Description: Prepares Terraform to manage the infrastructure state for destruction.

initialize_terraform() {
    echo "Initializing Terraform..."
    terraform init
    if [ $? -ne 0 ]; then
        echo "Error: Terraform initialization failed."
        exit 1
    fi
}

# Function: destroy_terraform
# Description:
# Destroys the Terraform-managed infrastructure.
# Steps:
# - Run 'terraform destroy' to remove all resources defined in the configurations.
# Requirements Addressed:
# - Infrastructure Destruction Automation
#   Location: SYSTEM ARCHITECTURE/Infrastructure
#   Description: Executes the destruction of infrastructure components safely.

destroy_terraform() {
    echo "Destroying Terraform-managed infrastructure..."
    terraform destroy -auto-approve
    if [ $? -ne 0 ]; then
        echo "Error: Terraform destruction failed."
        exit 1
    fi
}

# Main script execution starts here
echo "Starting infrastructure destruction process..."

# Initialize Terraform using the 'initialize_terraform' function
initialize_terraform

# Destroy Terraform-managed infrastructure using the 'destroy_terraform' function
destroy_terraform

echo "Infrastructure destruction process completed successfully."

# End of script