terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0" # External dependency: aws_db_instance from hashicorp/aws provider, version >= 3.0, purpose: To create and manage AWS RDS instances.
    }
  }
}

# Module to deploy an AWS RDS instance as part of the infrastructure module.
# Addresses Requirement: 'Database Infrastructure Setup'
# Location: 'SYSTEM ARCHITECTURE/Infrastructure'
# Description: 'Deploys an RDS instance to manage relational databases, ensuring data integrity, availability, and scalability.'

# Variables

variable "instance_class" {
  description = "Instance class for the RDS instance."
  type        = string
  default     = "db.t3.micro" # From globals: db_instance_class
}

variable "allocated_storage" {
  description = "Allocated storage size in GB."
  type        = number
  default     = 20 # From globals: allocated_storage
}

variable "engine" {
  description = "The database engine to use."
  type        = string
  default     = "postgres" # From globals: engine
}

variable "engine_version" {
  description = "The version of the database engine."
  type        = string
  default     = "13.3" # From globals: engine_version
}

variable "db_name" {
  description = "The name of the database to create."
  type        = string
  default     = "toddler_puzzle_db" # From globals: db_name
}

variable "username" {
  description = "Master username for the database."
  type        = string
  default     = "admin" # From globals: username
}

variable "password" {
  description = "Master password for the database."
  type        = string
  default     = "securepassword" # From globals: password
  sensitive   = true
}

variable "vpc_security_group_ids" {
  description = "List of VPC security group IDs to associate."
  type        = list(string)
}

variable "subnet_id" {
  description = "Subnet ID for network configuration."
  type        = string
}

# Resource: aws_db_subnet_group
# Description: Creates a subnet group for the RDS instance.
# Addresses the need to specify the subnet ID for network configuration.
# Requirement Step: 'Specify the subnet ID for network configuration.' (From 'resources' in JSON specification)

resource "aws_db_subnet_group" "main" {
  name       = "${var.db_name}-subnet-group"
  subnet_ids = [var.subnet_id]

  tags = {
    Name = "${var.db_name}-subnet-group"
  }
}

# Resource: aws_db_instance
# Description: Defines the AWS RDS instance resource.
# Addresses the following Requirement Steps from 'resources':
# 1. Specify the instance class for the RDS instance.
# 2. Set the allocated storage for the database.
# 3. Define the database engine and version.
# 4. Provide the database name, username, and password.
# 5. Associate the RDS instance with VPC security groups.
# 6. Specify the subnet ID for network configuration.

# Also addresses 'Data Security' requirements from 'SECURITY CONSIDERATIONS' section in 'DATA SECURITY' by enabling storage encryption.
# Addresses 'Redundancy' requirements from 'Database Design' under 'Data Storage Considerations' by enabling Multi-AZ deployment.

resource "aws_db_instance" "main" {
  # Specify the instance class for the RDS instance.
  instance_class = var.instance_class

  # Set the allocated storage for the database.
  allocated_storage = var.allocated_storage

  # Define the database engine and version.
  engine         = var.engine
  engine_version = var.engine_version

  # Provide the database name, username, and password.
  name     = var.db_name
  username = var.username
  password = var.password

  # Associate the RDS instance with VPC security group IDs.
  vpc_security_group_ids = var.vpc_security_group_ids

  # Specify the subnet group for network configuration.
  db_subnet_group_name = aws_db_subnet_group.main.name

  # Ensure the database is not publicly accessible.
  publicly_accessible = false

  # Enable Multi-AZ deployment for high availability.
  # Reference: 'Redundancy' in 'Database Design' under 'Data Storage Considerations' in the technical specification.
  multi_az = true

  # Enable storage encryption for data security.
  # Reference: 'Data Encryption' in 'DATA SECURITY' under 'SECURITY CONSIDERATIONS' in the technical specification.
  storage_encrypted = true

  # Tags for resource identification.
  tags = {
    Name = var.db_name
  }
}

# Output: rds_instance_endpoint
# Description: The endpoint of the RDS instance created.
# Value: aws_db_instance.main.endpoint

output "rds_instance_endpoint" {
  description = "The endpoint of the RDS instance created."
  value       = aws_db_instance.main.endpoint
}

# Output: rds_instance_arn
# Description: The ARN of the RDS instance created.
# Value: aws_db_instance.main.arn

output "rds_instance_arn" {
  description = "The ARN of the RDS instance created."
  value       = aws_db_instance.main.arn
}