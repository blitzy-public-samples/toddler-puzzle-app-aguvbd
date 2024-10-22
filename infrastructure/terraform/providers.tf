# Provider Configuration
# Location: SYSTEM ARCHITECTURE/Infrastructure
# Description:
# Defines the providers needed for managing AWS resources, ensuring that Terraform can
# interact with the AWS API to provision and manage infrastructure components, addressing
# the need for resource management as detailed in 'Provider Configuration' in the Technical Specification.

terraform {
  required_version = ">= 0.12"

  required_providers {
    aws = {
      source  = "hashicorp/aws"   # External dependency: AWS provider (hashicorp/aws), version >= 3.0
      version = ">= 3.0"          # Version constraint as per external dependency requirements
    }
  }
}

# AWS Provider Configuration
# This configuration sets up the AWS provider with the specified region, allowing Terraform
# to manage AWS resources such as EC2, S3, RDS, and more. It references the 'aws_region' variable
# defined in 'variables.tf', ensuring that the region can be dynamically set based on the environment.
provider "aws" {
  region = var.aws_region   # The AWS region variable defined in variables.tf
}