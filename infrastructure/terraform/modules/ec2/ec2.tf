// Terraform configuration file for setting up EC2 instances as part of the infrastructure module.
// It provides the necessary resources to manage virtual machines within the AWS environment,
// ensuring scalability and integration with other infrastructure components.
//
// Requirements Addressed:
// - Compute Infrastructure Setup
//   Location: SYSTEM ARCHITECTURE/Infrastructure
//   Description: Deploys EC2 instances to provide compute resources for the application,
//                ensuring scalability and efficient resource utilization.

///////////////////////////////////////////////////////////////////////////////
// Provider Configuration
///////////////////////////////////////////////////////////////////////////////

provider "aws" {
  version = ">= 3.0" // External dependency: hashicorp/aws version >= 3.0
  // Purpose: To create and manage AWS EC2 instances.
}

///////////////////////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////////////////////

// Internal dependency: aws_vpc
// Module: infrastructure/terraform/modules/vpc/vpc.tf
// Purpose: Provides network resources for the EC2 instances.
module "vpc" {
  source = "../vpc"
}

// Internal dependency: aws_iam_role
// Module: infrastructure/terraform/modules/iam/iam.tf
// Purpose: Assigns IAM roles with permissions for EC2 operations.
module "iam_role" {
  source = "../iam"
}

// Internal dependency: aws_security_group
// Module: infrastructure/terraform/modules/security_group/security_group.tf
// Purpose: Defines security groups for EC2 instances.
module "security_group" {
  source = "../security_group"
}

// Internal dependency: aws_cloudwatch_log_group
// Module: infrastructure/terraform/modules/cloudwatch/cloudwatch.tf
// Purpose: Monitors EC2 instance metrics and logs.
module "cloudwatch" {
  source = "../cloudwatch"
}

// Internal dependency: aws_s3_bucket
// Module: infrastructure/terraform/modules/s3/s3.tf
// Purpose: Allows EC2 instances to interact with S3 buckets for data storage.
module "s3" {
  source = "../s3"
}

// Internal dependency: aws_db_instance
// Module: infrastructure/terraform/modules/rds/rds.tf
// Purpose: Enables EC2 instances to connect to the RDS database.
module "rds" {
  source = "../rds"
}

///////////////////////////////////////////////////////////////////////////////
// Global Variables
///////////////////////////////////////////////////////////////////////////////

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  default     = "t2.micro" // Global variable from specification
}

variable "ami_id" {
  type        = string
  description = "AMI ID for the EC2 instance"
  default     = "ami-0abcdef1234567890" // Global variable from specification
}

variable "key_name" {
  type        = string
  description = "Key name for SSH access"
  default     = "toddler-puzzle-key" // Global variable from specification
}

///////////////////////////////////////////////////////////////////////////////
// Resource Definitions
///////////////////////////////////////////////////////////////////////////////

// Resource: aws_instance
// Description: Defines the AWS EC2 instance resource.
// Requirements Addressed:
// - Compute Infrastructure Setup (Location: SYSTEM ARCHITECTURE/Infrastructure)
// Steps:
//   1. Specify the instance type for the EC2 instance.
//   2. Provide the AMI ID for the instance.
//   3. Set the key name for SSH access.
//   4. Associate the EC2 instance with VPC security groups.
//   5. Specify the subnet ID for network configuration.

resource "aws_instance" "main" {
  // Step 1: Specify the instance type for the EC2 instance.
  instance_type = var.instance_type

  // Step 2: Provide the AMI ID for the instance.
  ami           = var.ami_id

  // Step 3: Set the key name for SSH access.
  key_name      = var.key_name

  // Step 4: Associate the EC2 instance with VPC security groups.
  vpc_security_group_ids = module.security_group.security_group_ids

  // Step 5: Specify the subnet ID for network configuration.
  subnet_id = module.vpc.public_subnet_id

  // Associate the IAM role with the EC2 instance to grant permissions.
  iam_instance_profile = module.iam_role.instance_profile_name

  // Dependencies to ensure proper resource creation order.
  depends_on = [
    module.cloudwatch,  // Monitors EC2 instance metrics and logs.
    module.s3,          // Allows interaction with S3 buckets.
    module.rds          // Enables connection to the RDS database.
  ]
}

///////////////////////////////////////////////////////////////////////////////
// Outputs
///////////////////////////////////////////////////////////////////////////////

// Output: ec2_instance_id
// Description: The ID of the EC2 instance created.
output "ec2_instance_id" {
  value       = aws_instance.main.id
  description = "The ID of the EC2 instance created."
}

// Output: ec2_instance_public_ip
// Description: The public IP address of the EC2 instance.
output "ec2_instance_public_ip" {
  value       = aws_instance.main.public_ip
  description = "The public IP address of the EC2 instance."
}