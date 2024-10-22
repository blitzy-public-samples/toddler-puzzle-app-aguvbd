###############################################################
# Module: S3 Bucket Configuration
# Description:
# This Terraform configuration file sets up an AWS S3 bucket as part of the infrastructure module. It provides storage for application data, assets, and backups, ensuring durability and accessibility.
# 
# Requirements Addressed:
# - Data Storage Setup
#   - Location: SYSTEM ARCHITECTURE/Infrastructure
#   - Description: Deploys an S3 bucket to store application data, assets, and backups, ensuring durability and accessibility.
# 
# Dependencies:
# - Internal:
#   - aws_iam_role (infrastructure/terraform/modules/iam/iam.tf): To define IAM policies for accessing S3 buckets.
#   - aws_ec2_instance (infrastructure/terraform/modules/ec2/ec2.tf): To allow EC2 instances to interact with S3 buckets for data storage.
#   - aws_db_instance (infrastructure/terraform/modules/rds/rds.tf): To store RDS backups and logs.
#   - aws_cloudwatch_log_group (infrastructure/terraform/modules/cloudwatch/cloudwatch.tf): To monitor S3 bucket access logs.
# - External:
#   - aws_s3_bucket (hashicorp/aws >= 3.0): To create and manage AWS S3 buckets.

###############################################################
# AWS S3 Bucket Resource
# This resource defines the AWS S3 bucket for the Toddler Puzzle App.
# Steps:
# 1. Specify the name for the S3 bucket.
# 2. Enable versioning for the bucket to keep multiple versions of an object.
# 3. Tag the S3 bucket with relevant metadata for identification.
###############################################################

resource "aws_s3_bucket" "main" {
  bucket = var.bucket_name  # Bucket name specified in variables.tf

  # Enable versioning for data durability (Requirement TR-4.3: Optimize storage usage)
  versioning {
    enabled = var.versioning_enabled
  }

  # Enable access logging for monitoring purposes (Dependency on aws_cloudwatch_log_group)
  logging {
    target_bucket = aws_s3_bucket.log_bucket.id
    target_prefix = "log/"
  }

  # Apply tags for identification and cost allocation
  tags = merge({
    "Name"        = var.bucket_name,
    "Environment" = var.environment
  }, var.tags)
}

###############################################################
# S3 Bucket for Access Logs
# This bucket stores the access logs of the main S3 bucket.
###############################################################

resource "aws_s3_bucket" "log_bucket" {
  bucket = "${var.bucket_name}-logs"

  acl = "log-delivery-write"

  tags = merge({
    "Name"        = "${var.bucket_name}-logs",
    "Environment" = var.environment
  }, var.tags)
}

###############################################################
# IAM Policy for S3 Access (Dependency on aws_iam_role)
# Defines IAM Policy to allow services to interact with the S3 bucket.
###############################################################

resource "aws_iam_policy" "s3_policy" {
  name        = "${var.bucket_name}-policy"
  path        = "/"
  description = "IAM policy for accessing S3 bucket ${var.bucket_name}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ]
        Effect   = "Allow"
        Resource = [
          aws_s3_bucket.main.arn,
          "${aws_s3_bucket.main.arn}/*"
        ]
      }
    ]
  })
}

###############################################################
# Outputs
# Provides the ARN of the S3 bucket created.
# Output:
# - s3_bucket_arn: The ARN of the S3 bucket.
###############################################################

output "s3_bucket_arn" {
  description = "The ARN of the S3 bucket created."
  value       = aws_s3_bucket.main.arn
}

###############################################################
# Variables Definition
# Variables used in this module.
###############################################################

variable "bucket_name" {
  description = "The name of the S3 bucket."
  type        = string
  default     = "toddler-puzzle-app-bucket"
}

variable "versioning_enabled" {
  description = "Enable versioning on the S3 bucket."
  type        = bool
  default     = true
}

variable "access_logging" {
  description = "Enable access logging for the S3 bucket."
  type        = bool
  default     = true
}

variable "environment" {
  description = "The environment for the S3 bucket (e.g., dev, prod)."
  type        = string
}

variable "tags" {
  description = "A map of tags to add to the S3 bucket."
  type        = map(string)
  default     = {}
}