/*
Module: VPC Configuration
Description: Terraform configuration file for setting up a Virtual Private Cloud (VPC) as part of the infrastructure module. It provides network isolation and management for AWS resources, ensuring secure and efficient communication between components.

Requirements Addressed:
- Network Infrastructure Setup
  - Location: SYSTEM ARCHITECTURE/Infrastructure
  - Description: Deploys a VPC to manage network resources, enabling secure communication and resource isolation within the AWS environment.

Dependencies:
- Internal:
  - main.tf (infrastructure/terraform/main.tf): Integrates the VPC module with other infrastructure components.
  - variables.tf (infrastructure/terraform/variables.tf): Provides variable definitions for configuring the VPC.
  - outputs.tf (infrastructure/terraform/outputs.tf): Defines outputs related to the VPC, such as VPC ID.
  - ecs_cluster (infrastructure/terraform/modules/ecs/ecs_cluster.tf): Utilizes the VPC for network resources for the ECS cluster.
  - ecs_service (infrastructure/terraform/modules/ecs/ecs_service.tf): Utilizes the VPC for network resources for the ECS service.
  - rds (infrastructure/terraform/modules/rds/rds.tf): Utilizes the VPC for network resources for the RDS instance.
  - s3 (infrastructure/terraform/modules/s3/s3.tf): Provides network resources for accessing the S3 bucket.
  - iam (infrastructure/terraform/modules/iam/iam.tf): Defines IAM roles that may interact with VPC resources.
  - ec2 (infrastructure/terraform/modules/ec2/ec2.tf): Utilizes the VPC for network resources for EC2 instances.
  - cloudwatch (infrastructure/terraform/modules/cloudwatch/cloudwatch.tf): Monitors VPC-related metrics and logs.
- External:
  - aws_vpc (hashicorp/aws)
    - Purpose: To create and manage AWS VPCs.
    - Version: >= 3.0
*/

/*
Resource: aws_vpc
Description: Defines the AWS VPC resource.
Requirements Addressed:
- Network Infrastructure Setup
  - Location: SYSTEM ARCHITECTURE/Infrastructure
  - Description: Deploys a VPC to manage network resources, enabling secure communication and resource isolation within the AWS environment.

Steps:
1. Specify the CIDR block for the VPC.
2. Enable DNS support for the VPC.
3. Enable DNS hostnames for the VPC.
*/

// Create the main VPC
resource "aws_vpc" "main" {
  // Step 1: Specify the CIDR block for the VPC.
  // The CIDR block defines the IP address range for the VPC.
  // Using 'var.vpc_cidr' variable defined in variables.tf
  cidr_block = var.vpc_cidr

  // Step 2: Enable DNS support for the VPC.
  // 'enable_dns_support' allows instances within the VPC to resolve public DNS hostnames to IP addresses.
  enable_dns_support = var.enable_dns_support

  // Step 3: Enable DNS hostnames for the VPC.
  // 'enable_dns_hostnames' assigns public DNS hostnames to instances with public IP addresses.
  enable_dns_hostnames = var.enable_dns_hostnames

  // Tags to help identify the VPC resource.
  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}

/*
Output: vpc_id
Description: The ID of the VPC created.
Requirements Addressed:
- Network Infrastructure Setup
  - Location: SYSTEM ARCHITECTURE/Infrastructure
  - Description: Provides the VPC ID for use in other modules (e.g., ECS cluster, RDS, EC2 instances).

Dependencies:
- Other modules consume 'vpc_id' to configure resources within this VPC.
*/

// Output the VPC ID
output "vpc_id" {
  description = "The ID of the VPC created."
  value       = aws_vpc.main.id
}