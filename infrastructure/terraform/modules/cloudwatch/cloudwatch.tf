# Terraform configuration for AWS CloudWatch resources
#
# This module sets up CloudWatch log groups and metric alarms to provide monitoring and logging capabilities for AWS resources used in the Toddler Puzzle App.
# It addresses the 'Monitoring and Logging Setup' requirement located at 'SYSTEM ARCHITECTURE/Infrastructure' in the technical specification.
# Specifically, it deploys CloudWatch resources to monitor and log AWS infrastructure components, ensuring operational visibility and performance tracking.

# External Dependencies:
# - aws_cloudwatch_log_group (hashicorp/aws >= 3.0): To create and manage AWS CloudWatch log groups.
# - aws_cloudwatch_metric_alarm (hashicorp/aws >= 3.0): To create and manage AWS CloudWatch metric alarms.

# Internal Dependencies:
# - aws_vpc (infrastructure/terraform/modules/vpc/vpc.tf): Monitors VPC-related metrics and logs.
# - aws_ecs_service (infrastructure/terraform/modules/ecs/ecs_service.tf): Monitors ECS service metrics and logs.
# - aws_db_instance (infrastructure/terraform/modules/rds/rds.tf): Monitors RDS instance metrics and logs.
# - aws_s3_bucket (infrastructure/terraform/modules/s3/s3.tf): Monitors S3 bucket access logs.
# - aws_ec2_instance (infrastructure/terraform/modules/ec2/ec2.tf): Monitors EC2 instance metrics and logs.
# - aws_iam_role (infrastructure/terraform/modules/iam/iam.tf): Assigns IAM roles with permissions to access CloudWatch logs.

# Note: This module assumes that the resources specified in internal dependencies are available and their ARNs or IDs are provided as inputs to this module.

#############################
# Variables
#############################

# Global variables
variable "log_group_name" {
  description = "The name of the CloudWatch log group."
  type        = string
  default     = "/aws/toddler-puzzle-app/logs"
}

variable "retention_in_days" {
  description = "The number of days to retain logs."
  type        = number
  default     = 30
}

# Variables for metric alarms
variable "alarm_name" {
  description = "The name of the CloudWatch metric alarm."
  type        = string
}

variable "metric_name" {
  description = "The name of the metric to monitor."
  type        = string
}

variable "namespace" {
  description = "The namespace of the metric."
  type        = string
}

variable "statistic" {
  description = "The statistic to apply to the metric."
  type        = string
}

variable "comparison_operator" {
  description = "The comparison operator for the alarm."
  type        = string
}

variable "threshold" {
  description = "The threshold against which the metric is compared."
  type        = number
}

variable "evaluation_periods" {
  description = "The number of periods over which data is compared to the specified threshold."
  type        = number
}

variable "alarm_actions" {
  description = "A list of ARNs for actions to take when the alarm is triggered."
  type        = list(string)
}

# Input variables for resource ARNs or IDs from internal dependencies
# These variables are used to link the CloudWatch resources to the resources defined in other modules

variable "vpc_id" {
  description = "The ID of the VPC to monitor."
  type        = string
}

variable "ecs_cluster_name" {
  description = "The name of the ECS cluster to monitor."
  type        = string
}

variable "rds_instance_id" {
  description = "The ID of the RDS instance to monitor."
  type        = string
}

variable "s3_bucket_name" {
  description = "The name of the S3 bucket to monitor."
  type        = string
}

variable "ec2_instance_ids" {
  description = "A list of EC2 instance IDs to monitor."
  type        = list(string)
}

variable "iam_role_arn" {
  description = "The ARN of the IAM role with permissions to access CloudWatch logs."
  type        = string
}

variable "environment" {
  description = "The deployment environment (e.g., dev, prod)."
  type        = string
}

#############################
# Resources
#############################

# Resource: aws_cloudwatch_log_group
# Description: Defines the AWS CloudWatch log group resource.
# Parameters:
# - name
# - retention_in_days
# Steps:
# 1. Specify the name for the CloudWatch log group.
# 2. Set the retention period for the logs.
#
# Addresses requirement 'Monitoring and Logging Setup' at 'SYSTEM ARCHITECTURE/Infrastructure'.

resource "aws_cloudwatch_log_group" "main" {
  name              = var.log_group_name
  retention_in_days = var.retention_in_days

  # Tags for resource identification and management
  tags = {
    Application = "Toddler Puzzle App"
    Environment = var.environment
  }
}

# Example of creating a metric alarm for monitoring CPU utilization of an EC2 instance
# Addresses continuous monitoring and alerting as per 'Security Considerations' in 'SYSTEM ARCHITECTURE/Infrastructure'.

resource "aws_cloudwatch_metric_alarm" "cpu_utilization" {
  alarm_name          = "${var.alarm_name}-cpu-utilization"
  comparison_operator = var.comparison_operator
  evaluation_periods  = var.evaluation_periods
  metric_name         = var.metric_name
  namespace           = var.namespace
  period              = 300  # 5 minutes
  statistic           = var.statistic
  threshold           = var.threshold
  alarm_actions       = var.alarm_actions

  # Dimensions to specify the EC2 instance(s) to monitor
  dimensions = {
    InstanceId = var.ec2_instance_ids[0]  # Monitoring the first EC2 instance in the list
  }

  # Tags for resource identification
  tags = {
    Application = "Toddler Puzzle App"
    Environment = var.environment
  }
}

# Additional metric alarms can be defined similarly for other resources like VPC, RDS, ECS, and S3 as per monitoring requirements.

#############################
# Outputs
#############################

# Output: cloudwatch_log_group_arn
# Description: The ARN of the CloudWatch log group created.
# Value: aws_cloudwatch_log_group.main.arn

output "cloudwatch_log_group_arn" {
  description = "The ARN of the CloudWatch log group created."
  value       = aws_cloudwatch_log_group.main.arn
}