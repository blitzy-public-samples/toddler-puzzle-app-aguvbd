#########################################################################
# ECS Service Configuration
#
# This Terraform configuration defines the AWS ECS service resource.
# It deploys an ECS service to manage containerized applications, ensuring
# scalability and efficient resource utilization.
#
# Requirements Addressed:
# - Infrastructure Setup (Location: SYSTEM ARCHITECTURE/Infrastructure)
#   - Deploys an ECS service to manage containerized applications.
#
# Dependencies:
# - Internal:
#   - aws_ecs_cluster (module: infrastructure/terraform/modules/ecs/ecs_cluster.tf)
#     Purpose: To deploy services within the ECS cluster.
#   - aws_vpc (module: infrastructure/terraform/modules/vpc/vpc.tf)
#     Purpose: To provide network resources for the ECS service.
#   - aws_iam_role (module: infrastructure/terraform/modules/iam/iam.tf)
#     Purpose: To assign IAM roles with permissions for ECS service operations.
#   - aws_s3_bucket (module: infrastructure/terraform/modules/s3/s3.tf)
#     Purpose: To integrate with ECS services that may interact with the S3 bucket.
#   - aws_cloudwatch_log_group (module: infrastructure/terraform/modules/cloudwatch/cloudwatch.tf)
#     Purpose: To monitor ECS service metrics and logs.
# - External:
#   - aws_ecs_service (provider: hashicorp/aws, version >= 3.0)
#     Purpose: To create and manage AWS ECS services.
#########################################################################

# Input variables

# Global default service name as per specification
variable "service_name" {
  description = "Name of the ECS service"
  type        = string
  default     = "toddler-puzzle-app-service"
}

# Global desired count as per specification
variable "desired_count" {
  description = "Desired number of task instances"
  type        = number
  default     = 2
}

variable "cluster_arn" {
  description = "ARN of the ECS cluster"
  type        = string
}

variable "task_definition_arn" {
  description = "ARN of the task definition"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for the service"
  type        = list(string)
}

variable "security_group_ids" {
  description = "List of security group IDs for the service"
  type        = list(string)
}

variable "assign_public_ip" {
  description = "Assign public IP address to ECS service"
  type        = bool
  default     = false
}

variable "iam_role_name" {
  description = "Name of the IAM role for the ECS service"
  type        = string
}

variable "environment" {
  description = "Environment tag (e.g., dev, prod)"
  type        = string
}

# Main ECS service resource
# Uses aws_ecs_service resource from hashicorp/aws provider (version >= 3.0)
resource "aws_ecs_service" "main" {
  # Specifies the name for the ECS service
  name            = var.service_name

  # Associates the service with the ECS cluster
  cluster         = var.cluster_arn

  # Defines the task definition for the service
  task_definition = var.task_definition_arn

  # Sets the desired count of tasks to run
  desired_count   = var.desired_count

  # Configures the network settings for the service
  network_configuration {
    awsvpc_configuration {
      subnets          = var.subnet_ids
      security_groups  = var.security_group_ids
      assign_public_ip = var.assign_public_ip
    }
  }

  # Specifies the launch type to use AWS Fargate
  launch_type = "FARGATE"

  # Attaches the IAM role for ECS tasks
  iam_role = var.iam_role_name

  # Configures deployment parameters
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  # Enables AWSVPC networking mode
  platform_version = "1.4.0"

  tags = {
    Environment = var.environment
  }
}

# Output the ARN of the ECS service created
output "ecs_service_arn" {
  description = "The ARN of the ECS service created."
  value       = aws_ecs_service.main.arn
}