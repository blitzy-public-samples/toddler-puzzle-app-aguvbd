# Backend configuration for Terraform state management
# Requirements Addressed:
# - State Management (SYSTEM ARCHITECTURE/Infrastructure)
#   Configures the backend for Terraform state management, ensuring that infrastructure state is stored securely and can be accessed by the team.

terraform {
  backend "s3" {
    # The S3 bucket where the Terraform state file is stored.
    # Referenced in 'variables.tf' for dynamic region setting.
    bucket = "terraform-state-bucket"

    # The path within the S3 bucket for the state file.
    key = "toddler-puzzle-app/terraform.tfstate"

    # AWS region for the S3 bucket and DynamoDB table.
    # Defined in 'variables.tf' and used across configurations.
    region = var.aws_region

    # DynamoDB table used for state locking and consistency.
    dynamodb_table = "terraform-lock-table"

    # Enable server-side encryption for the state file to enhance security.
    encrypt = true
  }
}