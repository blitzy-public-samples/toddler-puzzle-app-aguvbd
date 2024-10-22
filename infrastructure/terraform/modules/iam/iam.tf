/*
This Terraform configuration defines IAM roles and policies for the Toddler Puzzle App,
addressing the Access Management requirement outlined in the Technical Specification
(see 'SYSTEM ARCHITECTURE/Infrastructure' - 'Defines IAM roles and policies to manage access to AWS resources, ensuring secure and compliant operations.')

Required providers:
- aws (hashicorp/aws) version >= 3.0
*/

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0" # External Dependency: aws provider version >= 3.0
    }
  }
}

/*
Define the IAM role for the application. This role will be assumed by AWS services that require access to other AWS resources.

External Dependency:
- aws_iam_role (hashicorp/aws) version >= 3.0 (To create and manage AWS IAM roles.)

Steps:
1. Specify the name for the IAM role.
2. Define the assume role policy document.
3. Attach necessary policies to the IAM role.
*/

resource "aws_iam_role" "main" {
  name = "toddler-puzzle-app-role"

  # The assume_role_policy defines which entities can assume this role.
  # Here, we allow ECS tasks and EC2 instances to assume this role.
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = [
          "ecs-tasks.amazonaws.com",
          "ec2.amazonaws.com"
        ]
      },
      Action = "sts:AssumeRole"
    }]
  })
}

/*
Define the IAM policy for the application. This policy includes permissions required to access various AWS services.

External Dependency:
- aws_iam_policy (hashicorp/aws) version >= 3.0 (To create and manage AWS IAM policies.)

Steps:
1. Specify the name for the IAM policy.
2. Define the policy document with permissions.
3. Attach the policy to relevant IAM roles.
*/

resource "aws_iam_policy" "main" {
  name = "toddler-puzzle-app-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      # Permissions for accessing S3 buckets
      {
        Sid      = "S3Access",
        Effect   = "Allow",
        Action   = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ],
        Resource = [
          "${aws_s3_bucket.app_bucket.arn}",
          "${aws_s3_bucket.app_bucket.arn}/*"
        ]
      },
      # Permissions for accessing RDS databases
      {
        Sid      = "RDSAccess",
        Effect   = "Allow",
        Action   = [
          "rds:DescribeDBInstances",
          "rds:Connect"
        ],
        Resource = "*"
      },
      # Permissions for ECS services
      {
        Sid      = "ECSAccess",
        Effect   = "Allow",
        Action   = [
          "ecs:DescribeTasks",
          "ecs:DescribeServices",
          "ecs:ListTasks"
        ],
        Resource = "*"
      },
      # Permissions for CloudWatch logs
      {
        Sid      = "CloudWatchLogs",
        Effect   = "Allow",
        Action   = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "*"
      },
      # Permissions for ECR
      {
        Sid      = "ECRAccess",
        Effect   = "Allow",
        Action   = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetRepositoryPolicy",
          "ecr:DescribeRepositories",
          "ecr:ListImages",
          "ecr:BatchGetImage"
        ],
        Resource = "*"
      }
    ]
  })
}

/*
Attach the IAM policy to the IAM role.
*/

resource "aws_iam_role_policy_attachment" "main" {
  role       = aws_iam_role.main.name
  policy_arn = aws_iam_policy.main.arn
}

/*
Outputs
*/

output "iam_role_arn" {
  description = "The ARN of the IAM role created."
  value       = aws_iam_role.main.arn
}

output "iam_policy_arn" {
  description = "The ARN of the IAM policy created."
  value       = aws_iam_policy.main.arn
}