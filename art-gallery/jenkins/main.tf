# Jenkins server infrastructure

# Find the latest Amazon Linux 2023 AMI
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]  # Amazon Linux 2023 naming pattern
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# EC2 instance for Jenkins server
resource "aws_instance" "jenkins_instance" {
  ami                    = data.aws_ami.amazon_linux_2023.id
  instance_type          = "t2.micro"
  key_name               = "artgallery/keyvalue"  # Use the same key pair
  vpc_security_group_ids = [aws_security_group.jenkins_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              # Update system packages
              dnf update -y
              
              # Install Docker on Amazon Linux 2023
              dnf install -y docker
              systemctl start docker
              systemctl enable docker
              usermod -a -G docker ec2-user
              
              # Install Java (required for Jenkins)
              dnf install -y java-17-amazon-corretto
              
              # Install Python for Ansible
              dnf install -y python3 python3-pip
              
              # Prepare for Jenkins
              mkdir -p /opt/jenkins_home
              
              # Option 1: Install Jenkins directly
              # Add Jenkins repo
              wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
              rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
              dnf install -y jenkins
              systemctl start jenkins
              systemctl enable jenkins
              
              # Option 2: Alternatively, set up Jenkins in Docker (commented out)
              # docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v /opt/jenkins_home:/var/jenkins_home jenkins/jenkins:lts
              EOF

  # Increase root volume size a bit for Jenkins
  root_block_device {
    volume_size = 10
  }

  tags = {
    Name = "jenkins-server"
  }
}

# Security group for Jenkins instance
resource "aws_security_group" "jenkins_sg" {
  name        = "jenkins-sg"
  description = "Allow traffic for Jenkins server"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Consider restricting to your IP
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Jenkins web interface
  }

  ingress {
    from_port   = 50000
    to_port     = 50000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Jenkins agent communication
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Output the public IP of the Jenkins instance
output "jenkins_public_ip" {
  value = aws_instance.jenkins_instance.public_ip
}

output "jenkins_url" {
  value = "http://${aws_instance.jenkins_instance.public_ip}:8080"
}