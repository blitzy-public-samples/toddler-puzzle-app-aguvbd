# Production environment-specific variable values
# Requirement Addressed: Environment-Specific Configuration
# Location: SYSTEM ARCHITECTURE/Infrastructure
# Description: Provides production-specific configurations to ensure that the deployed infrastructure meets the requirements and constraints of the production environment.

# AWS region for the production environment
aws_region = "us-west-2"

# EC2 instance type for production servers
# Relates to: TR-11.2 Optimize image loading and rendering processes to reduce load times.
instance_type = "t3.medium"

# RDS instance class for production database
# Ensures high availability and performance for user data storage.
db_instance_class = "db.t3.medium"

# Auto Scaling Group minimum number of instances in production
# Supports: TR-4.5 Ensure all core functionalities are accessible offline.
min_instance_count = 2

# Auto Scaling Group maximum number of instances in production
# Supports scalability as per TR-11 Performance Optimization.
max_instance_count = 10