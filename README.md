# Node.js CI/CD with Docker and Raspberry Pi Deployment

## Overview

This repository contains a GitHub Actions workflow for continuous integration and deployment of a Node.js application using Docker. The pipeline is designed to build a Docker image for the application, push it to Amazon Elastic Container Registry (ECR), and deploy the latest image to a Raspberry Pi.

## Workflow

### 1. CI/CD Process

The workflow is triggered on every push to the `main` branch. It consists of the following steps:

#### Step 1: Check out code

- Uses the `actions/checkout` action to clone the repository.

#### Step 2: Configure AWS credentials

- Uses the `aws-actions/configure-aws-credentials` action to set up AWS credentials for authentication with ECR.

#### Step 3: Login to Amazon ECR

- Uses the `aws-actions/amazon-ecr-login` action to authenticate with Amazon ECR.

#### Step 4: Build, tag, and push Docker image to Amazon ECR

- Uses Docker Buildx to build a multi-platform Docker image for the ARM64 architecture.
- Tags the image with the specified tag (in this case, 'test').
- Pushes the image to the specified Amazon ECR repository.

#### Step 5: SSH into Raspberry Pi and deploy Docker container

- Uses the `appleboy/ssh-action` action to SSH into the Raspberry Pi.
- Pulls the latest Docker image from the ECR registry.
- Identifies and stops any existing Docker container with the same name.
- Runs the new Docker container, exposing port 4000.

### 2. Challenges Faced

#### Challenge 1: Multi-platform Docker Builds

- **Solution:** Used Docker Buildx to build the image for the ARM64 architecture without modifying the Dockerfile.

#### Challenge 2: AWS Authentication

- **Solution:** Configured AWS credentials securely using GitHub Secrets.

#### Challenge 3: Deployment to Raspberry Pi

- **Solution:** Used SSH to connect to the Raspberry Pi and run Docker commands for pulling and running the container.

### Challenge 4: AWS CLI Installation on Raspberry Pi

- **Workaround:** Installing the AWS CLI using Python and pip due to compatibility issues with the ARM architecture of the Raspberry Pi.

  ```bash
  python -V  # Ensure Python 3.x is installed
  sudo pip3 install boto3
  sudo pip3 install awscli
  ```


## Notes

- Ensure that AWS credentials, Docker tags, and other sensitive information are securely stored as GitHub Secrets.

- Make sure Docker is installed on the Raspberry Pi and has the necessary permissions.

- Reuse Docker Buildx builder instances for efficiency.

