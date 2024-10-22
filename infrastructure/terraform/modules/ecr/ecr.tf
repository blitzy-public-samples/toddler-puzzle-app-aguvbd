# Terraform configuration for AWS ECR (Elastic Container Registry) repository.
#
# This file defines the AWS ECR repository resource as part of the infrastructure module.
# It provides a secure and scalable storage solution for Docker images used in the Toddler Puzzle App.
#
# Requirements Addressed:
# - **Container Image Storage**
#   - **Location:** SYSTEM ARCHITECTURE/Infrastructure
#   - **Description:** Deploys an ECR repository to store Docker images, ensuring secure and efficient image management for containerized applications.
#
# This resource is critical for storing Docker images of the backend server and admin interface,
# enabling seamless deployment and scaling of containerized applications as per the system's microservices architecture.
#
# Dependencies:
# - **Internal:**
#   - `aws_iam_role` (module: `infrastructure/terraform/modules/iam/iam.tf`): Assigns IAM roles with permissions to interact with the ECR repository.
#   - `main.tf` (module: `infrastructure/terraform/main.tf`): Integrates the ECR module with other infrastructure components.
#   - `variables.tf` (module: `infrastructure/terraform/variables.tf`): Provides variable definitions for configuring the ECR repository.
#   - `outputs.tf` (module: `infrastructure/terraform/outputs.tf`): Defines outputs related to the ECR repository, such as repository URL.
# - **External:**
#   - `aws_ecr_repository` (from provider `hashicorp/aws` version >= 3.0): To create and manage AWS ECR repositories.

# Note: The AWS provider configuration is defined in the root module's providers.tf file.

# Resource: aws_ecr_repository.main
# Defines the AWS ECR repository resource.
resource "aws_ecr_repository" "main" {
  # Specify the name for the ECR repository.
  # Using the global variable 'repository_name' defined in variables.tf
  name = var.repository_name

  # Tag the ECR repository with relevant metadata for identification.
  # 'tags' is a map of key-value pairs.
  tags = {
    # Environment tag to identify the deployment environment (e.g., dev, prod).
    Environment = var.environment
    # Project tag to identify the project name.
    Project     = "Toddler Puzzle App"
    # Application tag to indicate the purpose of this repository.
    Application = "Docker Images Storage"
    # Additional custom tags can be added here.
  }

  # The permissions for accessing this repository are managed via IAM roles.
  # Refer to the aws_iam_role module for role definitions and policies.
}

# Output: ecr_repository_url
# Outputs the URL of the ECR repository created.
output "ecr_repository_url" {
  description = "The URL of the ECR repository created."
  value       = aws_ecr_repository.main.repository_url
}