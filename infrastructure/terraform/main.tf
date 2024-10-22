# Main Terraform configuration file that integrates all modules and configurations to define the overall infrastructure setup for the Toddler Puzzle App.
# Requirements Addressed:
# - Infrastructure Orchestration (Location: SYSTEM ARCHITECTURE/Infrastructure): Coordinates the deployment of all infrastructure components, ensuring they work together seamlessly to support the application's requirements.

# AWS Provider Configuration
# External Dependency: hashicorp/aws (Version: >= 3.0)
# Purpose: To manage AWS resources such as EC2, S3, RDS, and more.
provider "aws" {
  version = ">= 3.0" # AWS provider version
  region  = var.aws_region
}

# VPC Module Configuration
# Dependency: infrastructure/terraform/modules/vpc/vpc.tf
# Purpose: Sets up a Virtual Private Cloud for network management.
# Requirement Addressed: Provides a secure and isolated network environment.
# Location in Documentation: SYSTEM ARCHITECTURE/Infrastructure
module "vpc" {
  source               = "./modules/vpc"
  vpc_cidr             = var.vpc_cidr
  enable_dns_support   = var.enable_dns_support
  enable_dns_hostnames = var.enable_dns_hostnames
}

# ECS Cluster Module Configuration
# Dependency: infrastructure/terraform/modules/ecs/ecs_cluster.tf
# Purpose: Sets up an ECS cluster for managing containerized applications.
# Requirement Addressed: Manages deployment and scaling of containerized applications.
# Location in Documentation: TECHNICAL REQUIREMENTS/Feature 11: Performance Optimization
module "ecs_cluster" {
  source       = "./modules/ecs"
  cluster_name = var.cluster_name
}

# ECS Service Module Configuration
# Dependency: infrastructure/terraform/modules/ecs/ecs_service.tf
# Purpose: Manages the deployment and scaling of containerized applications.
# Requirement Addressed: Manages deployment and scaling of containerized applications.
# Location in Documentation: TECHNICAL REQUIREMENTS/Feature 11: Performance Optimization
module "ecs_service" {
  source        = "./modules/ecs"
  service_name  = var.service_name
  desired_count = var.desired_count
}

# RDS Module Configuration
# Dependency: infrastructure/terraform/modules/rds/rds.tf
# Purpose: Sets up an RDS instance for database management.
# Requirement Addressed: Provides a robust, scalable database solution.
# Location in Documentation: TECHNICAL REQUIREMENTS/Feature 10: Data Synchronization
module "rds" {
  source             = "./modules/rds"
  db_instance_class  = var.db_instance_class
  allocated_storage  = var.allocated_storage
  engine             = var.engine
  engine_version     = var.engine_version
  db_name            = var.db_name
  username           = var.username
  password           = var.password
}

# S3 Module Configuration
# Dependency: infrastructure/terraform/modules/s3/s3.tf
# Purpose: Sets up an S3 bucket for data storage.
# Requirement Addressed: Stores static assets and AI-generated images.
# Location in Documentation: SYSTEM ARCHITECTURE/Infrastructure
module "s3" {
  source             = "./modules/s3"
  bucket_name        = var.bucket_name
  versioning_enabled = var.versioning_enabled
  access_logging     = var.access_logging
}

# IAM Module Configuration
# Dependency: infrastructure/terraform/modules/iam/iam.tf
# Purpose: Defines IAM roles and policies for access management.
# Requirement Addressed: Secure access control to AWS resources.
# Location in Documentation: SECURITY CONSIDERATIONS/Data Access Controls
module "iam" {
  source      = "./modules/iam"
  role_name   = var.role_name
  policy_name = var.policy_name
}

# EC2 Module Configuration
# Dependency: infrastructure/terraform/modules/ec2/ec2.tf
# Purpose: Sets up EC2 instances for compute resources.
# Requirement Addressed: Provides scalable compute capacity for backend services.
# Location in Documentation: INFRASTRUCTURE/Deployment Environment
module "ec2" {
  source        = "./modules/ec2"
  instance_type = var.instance_type
  ami_id        = var.ami_id
  key_name      = var.key_name
}

# ECR Module Configuration
# Dependency: infrastructure/terraform/modules/ecr/ecr.tf
# Purpose: Sets up an ECR repository for Docker image storage.
# Requirement Addressed: Stores Docker images for application deployment.
# Location in Documentation: INFRASTRUCTURE/Containerization
module "ecr" {
  source          = "./modules/ecr"
  repository_name = var.repository_name
}

# CloudWatch Module Configuration
# Dependency: infrastructure/terraform/modules/cloudwatch/cloudwatch.tf
# Purpose: Sets up CloudWatch resources for monitoring and logging.
# Requirement Addressed: Monitors application performance and logs for proactive issue resolution.
# Location in Documentation: INFRASTRUCTURE/CI/CD Pipeline
module "cloudwatch" {
  source             = "./modules/cloudwatch"
  log_group_name     = var.log_group_name
  retention_in_days  = var.retention_in_days
}

# Note: Outputs are defined in outputs.tf