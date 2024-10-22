# Variable definitions for the Terraform configuration.
# This file centralizes configuration parameters to ensure consistency and flexibility,
# addressing the 'Variable Management' requirement located in 'SYSTEM ARCHITECTURE/Infrastructure'
# as described in the technical specification.

# AWS Region where resources will be created.
variable "aws_region" {
  description = "The AWS region where resources will be created."
  type        = string
  default     = "us-west-2"
}

# VPC CIDR block configuration.
variable "vpc_cidr" {
  description = "The CIDR block for the VPC, ensuring network segmentation."
  type        = string
  default     = "10.0.0.0/16"
}

# Enable DNS support in the VPC.
variable "enable_dns_support" {
  description = "Enable DNS support in the VPC, facilitating service discovery."
  type        = bool
  default     = true
}

# Enable DNS hostnames in the VPC.
variable "enable_dns_hostnames" {
  description = "Enable DNS hostnames in the VPC, required for ECS and EC2 instances."
  type        = bool
  default     = true
}

# ECS Cluster name.
variable "cluster_name" {
  description = "The name of the ECS cluster for deploying containerized applications, supporting scalability requirements (TR-11)."
  type        = string
  default     = "toddler-puzzle-app-cluster"
}

# ECS Service name.
variable "service_name" {
  description = "The name of the ECS service for running tasks and services."
  type        = string
  default     = "toddler-puzzle-app-service"
}

# Desired number of ECS service tasks.
variable "desired_count" {
  description = "The desired number of tasks for the ECS service, ensuring high availability (TR-11)."
  type        = number
  default     = 2
}

# Database instance class.
variable "db_instance_class" {
  description = "The instance class for the RDS database, balancing cost and performance as per TR-11.6."
  type        = string
  default     = "db.t3.micro"
}

# Allocated storage for the database (in GB).
variable "allocated_storage" {
  description = "The allocated storage size for the RDS database (in GB), addressing data storage needs (TR-4.1)."
  type        = number
  default     = 20
}

# Database engine type.
variable "engine" {
  description = "The database engine to use for the RDS instance, aligning with the application stack (PostgreSQL)."
  type        = string
  default     = "postgres"
}

# Database engine version.
variable "engine_version" {
  description = "The version of the database engine, ensuring compatibility and security (TR-11)."
  type        = string
  default     = "13.3"
}

# Database name.
variable "db_name" {
  description = "The name of the database schema to be used by the application."
  type        = string
  default     = "toddler_puzzle_db"
}

# Database username.
variable "username" {
  description = "The username for the database, to be used by the application services."
  type        = string
  default     = "admin"
}

# Database password. For security (see 'Security Considerations' in the technical specification), sensitive information should not be hardcoded.
variable "password" {
  description = "The password for the database. As per 'Security Considerations' in 'DATA SECURITY', sensitive data should be handled securely."
  type        = string
  sensitive   = true
}

# S3 bucket name.
variable "bucket_name" {
  description = "The name of the S3 bucket for storing assets, supporting offline playability (TR-4)."
  type        = string
  default     = "toddler-puzzle-app-bucket"
}

# Enable versioning on the S3 bucket.
variable "versioning_enabled" {
  description = "Enable versioning on the S3 bucket to retain versions of objects, enhancing data integrity (TR-10)."
  type        = bool
  default     = true
}

# Enable access logging on the S3 bucket.
variable "access_logging" {
  description = "Enable access logging on the S3 bucket for monitoring and auditing purposes ('Security Considerations')."
  type        = bool
  default     = true
}

# IAM role name.
variable "role_name" {
  description = "The name of the IAM role for the application, managing permissions as per 'Security Considerations'."
  type        = string
  default     = "toddler-puzzle-app-role"
}

# IAM policy name.
variable "policy_name" {
  description = "The name of the IAM policy associated with the IAM role."
  type        = string
  default     = "toddler-puzzle-app-policy"
}

# EC2 instance type.
variable "instance_type" {
  description = "The instance type for EC2 instances, balancing cost and performance (TR-11.1)."
  type        = string
  default     = "t2.micro"
}

# Amazon Machine Image (AMI) ID for EC2 instances.
variable "ami_id" {
  description = "The AMI ID for EC2 instances, ensuring compatibility with the application stack."
  type        = string
  default     = "ami-0abcdef1234567890"
}

# SSH key pair name for EC2 instances.
variable "key_name" {
  description = "The name of the SSH key pair to use for EC2 instances, required for secure access (see 'Security Considerations' under 'Authentication and Authorization')."
  type        = string
  default     = "toddler-puzzle-key"
}

# ECR repository name.
variable "repository_name" {
  description = "The name of the ECR repository for storing Docker images, supporting deployment (TR-8)."
  type        = string
  default     = "toddler-puzzle-app-repo"
}

# CloudWatch log group name.
variable "log_group_name" {
  description = "The name of the CloudWatch log group for logging application and infrastructure events (TR-11.4)."
  type        = string
  default     = "/aws/toddler-puzzle-app/logs"
}

# Retention period for CloudWatch logs (in days).
variable "retention_in_days" {
  description = "The number of days to retain logs in CloudWatch, balancing storage costs and auditing needs ('Security Considerations')."
  type        = number
  default     = 30
}

# End of variables definition.