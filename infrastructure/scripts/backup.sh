#!/bin/bash

# -----------------------------------------------------------------------------
# backup.sh - Automates the backup process of the Terraform state and configurations.
#
# Description:
#   This script creates a backup of the current Terraform state and configuration
#   files, ensuring that the infrastructure state is securely stored and can be
#   restored in case of data loss or corruption.
#
# Requirements Addressed:
# - Backup and Recovery (Location: SYSTEM ARCHITECTURE/Infrastructure)
#   Automates the backup of infrastructure state and configurations to ensure
#   data integrity and facilitate recovery in case of failures.
# -----------------------------------------------------------------------------

# Global Variables
BACKUP_DIR="/backups"                         # Directory where backups will be stored
S3_BUCKET="toddler-puzzle-backups"            # S3 bucket for storing backups

# Dependencies:
# - Internal Files:
#   - main.tf (infrastructure/terraform/main.tf): Main Terraform configuration.
#   - variables.tf (infrastructure/terraform/variables.tf): Terraform variables.
#   - outputs.tf (infrastructure/terraform/outputs.tf): Terraform outputs.
#   - backend.tf (infrastructure/terraform/backend.tf): Terraform backend configuration.
#   - dev.tfvars (infrastructure/terraform/environments/dev.tfvars): Dev environment variables.
#   - prod.tfvars (infrastructure/terraform/environments/prod.tfvars): Prod environment variables.
# - External Tools:
#   - aws-cli (version 2.0): Interacts with AWS services for S3 storage.
#   - tar (version 1.30): Archives configuration and state files.

# Function: create_backup
# Description:
#   Creates a backup of the current Terraform state and configuration files.
# Parameters:
#   $1 - Environment (e.g., "dev" or "prod")
# Returns:
#   Path to the backup file created
create_backup() {
  local environment="$1"
  local timestamp
  local backup_filename
  local backup_filepath

  # Step 1: Set the backup directory and ensure it exists.
  if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
  fi

  # Generate a timestamp for the backup file
  timestamp=$(date +"%Y%m%d%H%M%S")
  backup_filename="terraform_backup_${environment}_${timestamp}.tar.gz"
  backup_filepath="${BACKUP_DIR}/${backup_filename}"

  # Step 2: Archive the Terraform configuration and state files using tar.
  tar -czf "$backup_filepath" \
    infrastructure/terraform/main.tf \
    infrastructure/terraform/variables.tf \
    infrastructure/terraform/outputs.tf \
    infrastructure/terraform/backend.tf \
    infrastructure/terraform/environments/${environment}.tfvars \
    infrastructure/terraform/terraform.tfstate \
    infrastructure/terraform/terraform.tfstate.backup

  if [ $? -ne 0 ]; then
    echo "Error: Failed to create backup archive."
    logger -p user.err "Backup failed: Error creating archive for environment ${environment}."
    return 1
  fi

  # Step 3: Upload the archived file to the specified S3 bucket using aws-cli.
  aws s3 cp "$backup_filepath" "s3://${S3_BUCKET}/${backup_filename}"

  if [ $? -ne 0 ]; then
    echo "Error: Failed to upload backup to S3 bucket ${S3_BUCKET}."
    logger -p user.err "Backup failed: Error uploading to S3 for environment ${environment}."
    return 1
  fi

  echo "Backup successful: ${backup_filepath}"
  logger -p user.info "Backup successful for environment ${environment}. File: ${backup_filename}"
  return 0
}

# Main Script Execution
# Description:
#   Orchestrates the backup process by loading environment-specific variables,
#   invoking the create_backup function, and logging the backup operation.

# Load environment-specific variables from the appropriate tfvars file.
if [ -z "$1" ]; then
  echo "Usage: $0 <environment>"
  echo "Please specify the environment ('dev' or 'prod')."
  exit 1
fi

ENVIRONMENT="$1"

# Validate the environment parameter
if [ "$ENVIRONMENT" != "dev" ] && [ "$ENVIRONMENT" != "prod" ]; then
  echo "Error: Invalid environment specified. Choose 'dev' or 'prod'."
  exit 1
fi

# Invoke the create_backup function with the current environment.
create_backup "$ENVIRONMENT"

if [ $? -ne 0 ]; then
  echo "Backup process failed for environment: $ENVIRONMENT"
  logger -p user.err "Backup process failed for environment: $ENVIRONMENT"
  exit 1
else
  echo "Backup process completed successfully for environment: $ENVIRONMENT"
  logger -p user.info "Backup process completed successfully for environment: $ENVIRONMENT"
fi

# End of backup.sh