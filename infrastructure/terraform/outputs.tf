/*
 * Outputs for the Terraform configuration
 * This file defines outputs for the Terraform configuration, providing essential information about the deployed infrastructure components, such as IDs, ARNs, and endpoints, which can be used for integration and management purposes.
 *
 * Requirements Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure): Defines outputs for the Terraform configuration to facilitate integration and management of deployed infrastructure components.
 */

/*
 * Output: vpc_id
 * Description: The ID of the VPC created.
 * This output provides the VPC ID, which is essential for integrating other resources within the VPC.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "vpc_id" {
  description = "The ID of the VPC created."
  value       = module.vpc.vpc_id
}

/*
 * Output: ecs_cluster_id
 * Description: The ID of the ECS cluster created.
 * This output provides the ECS Cluster ID, necessary for deploying services to the correct cluster.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "ecs_cluster_id" {
  description = "The ID of the ECS cluster created."
  value       = module.ecs_cluster.ecs_cluster_id
}

/*
 * Output: ecs_service_arn
 * Description: The ARN of the ECS service created.
 * This output provides the ECS Service ARN, which is useful for service identification and management.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "ecs_service_arn" {
  description = "The ARN of the ECS service created."
  value       = module.ecs_service.ecs_service_arn
}

/*
 * Output: rds_instance_endpoint
 * Description: The endpoint of the RDS instance created.
 * This output provides the RDS instance endpoint, necessary for applications to connect to the database.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "rds_instance_endpoint" {
  description = "The endpoint of the RDS instance created."
  value       = module.rds.rds_instance_endpoint
}

/*
 * Output: s3_bucket_arn
 * Description: The ARN of the S3 bucket created.
 * This output provides the S3 bucket ARN, required for referencing the bucket in other services.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "s3_bucket_arn" {
  description = "The ARN of the S3 bucket created."
  value       = module.s3.s3_bucket_arn
}

/*
 * Output: iam_role_arn
 * Description: The ARN of the IAM role created.
 * This output provides the IAM role ARN, necessary for assigning roles to resources.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "iam_role_arn" {
  description = "The ARN of the IAM role created."
  value       = module.iam.iam_role_arn
}

/*
 * Output: ec2_instance_id
 * Description: The ID of the EC2 instance created.
 * This output provides the EC2 instance ID, helpful for instance management and automation.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "ec2_instance_id" {
  description = "The ID of the EC2 instance created."
  value       = module.ec2.ec2_instance_id
}

/*
 * Output: ecr_repository_url
 * Description: The URL of the ECR repository created.
 * This output provides the ECR repository URL, used for pushing and pulling Docker images.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "ecr_repository_url" {
  description = "The URL of the ECR repository created."
  value       = module.ecr.ecr_repository_url
}

/*
 * Output: cloudwatch_log_group_arn
 * Description: The ARN of the CloudWatch log group created.
 * This output provides the CloudWatch log group ARN, necessary for configuring logging in services.
 * Requirement Addressed:
 * - Output Management (SYSTEM ARCHITECTURE/Infrastructure)
 */
output "cloudwatch_log_group_arn" {
  description = "The ARN of the CloudWatch log group created."
  value       = module.cloudwatch.cloudwatch_log_group_arn
}