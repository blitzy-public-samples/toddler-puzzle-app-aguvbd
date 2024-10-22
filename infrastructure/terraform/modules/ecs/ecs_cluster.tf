# Terraform configuration for setting up the ECS Cluster
# Requirements addressed:
# - Infrastructure Setup (SYSTEM ARCHITECTURE/Infrastructure)
#   - Deploys an ECS cluster to manage containerized applications, ensuring scalability and efficient resource utilization.

# External Dependency:
# - AWS provider (hashicorp/aws), version >= 3.0
#   - Purpose: To create and manage AWS ECS clusters.

# Global variable for cluster name
variable "cluster_name" {
  description = "The name of the ECS cluster."
  type        = string
  default     = "toddler-puzzle-app-cluster" # As specified in globals
}

# Resource: aws_ecs_cluster
# Description: Defines the AWS ECS cluster resource.
# Parameters:
# - name: The name assigned to the ECS cluster.
# Steps Addressed:
# 1. Specify the name for the ECS cluster.
# 2. Deploy the ECS cluster within the specified VPC.
# 3. Attach necessary IAM roles for ECS operations.

resource "aws_ecs_cluster" "main" {
  name = var.cluster_name

  # Note:
  # - While the ECS cluster itself does not require VPC configuration, the services and tasks running in the cluster will.
  # - IAM roles are associated with ECS services and tasks; ensure they are defined in the aws_iam_role module.

  # Requirement addressed:
  # - Deploys an ECS cluster to manage containerized applications.
  #   - Location: SYSTEM ARCHITECTURE/Infrastructure
}

# Output: ecs_cluster_id
# Description: The ID of the ECS cluster created.
output "ecs_cluster_id" {
  description = "The ID of the ECS cluster created."
  value       = aws_ecs_cluster.main.id

  # This output can be used by other modules or resources that depend on the ECS cluster.
}

# Internal Dependencies:
# - aws_vpc (infrastructure/terraform/modules/vpc/vpc.tf)
#   - Purpose: To provide network resources for the ECS cluster services and tasks.
# - aws_iam_role (infrastructure/terraform/modules/iam/iam.tf)
#   - Purpose: To assign IAM roles with permissions for ECS cluster operations.
# - aws_ecs_service (infrastructure/terraform/modules/ecs/ecs_service.tf)
#   - Purpose: To deploy services within the ECS cluster.

# Ensure that these dependencies are properly configured and that the necessary data or resources are available for the ECS cluster operations.