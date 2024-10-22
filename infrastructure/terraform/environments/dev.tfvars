# Development Environment Variables
# This file contains development environment-specific variable values for the Terraform configuration.
# Addresses Requirement: "Environment-Specific Configuration" in "SYSTEM ARCHITECTURE/Infrastructure"
# Description: Provides specific configuration values for the development environment, allowing for tailored resource provisioning and management.

# AWS region for deploying resources in the development environment.
# Requirement Addressed: Ensures resources are provisioned in the correct region for development.
# Location in Documentation: "INFRASTRUCTURE" > "Cloud Services" > "Amazon EC2"

aws_region = "us-west-2"

# EC2 instance type for application servers in development.
# Requirement Addressed: Provides cost-effective compute resources suitable for development workloads.
# Location in Documentation: "INFRASTRUCTURE" > "Cloud Services" > "Amazon EC2"

instance_type = "t2.micro"

# RDS database instance class for development.
# Requirement Addressed: Allocates appropriate database resources for development while controlling costs.
# Location in Documentation: "INFRASTRUCTURE" > "Cloud Services" > "Amazon RDS (PostgreSQL)"

db_instance_class = "db.t3.micro"

# Minimum number of EC2 instances in the Auto Scaling Group for development.
# Requirement Addressed: Ensures availability in development environment while optimizing resource usage.
# Location in Documentation: "INFRASTRUCTURE" > "Cloud Services" > "Amazon EC2"

min_instance_count = 1

# Maximum number of EC2 instances in the Auto Scaling Group for development.
# Requirement Addressed: Controls scaling to prevent resource overuse in development.
# Location in Documentation: "INFRASTRUCTURE" > "Cloud Services" > "Amazon EC2"

max_instance_count = 3