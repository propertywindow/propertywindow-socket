#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
        sshagent (credentials: ['deploy-dev']) {
            sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl uname -a'
        }
    }

    stages {
        stage('Construction: Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Deploying: Deploy') {
            steps {
                echo 'Deploying...'
                sh 'sshagent rm -rf /var/www/socket.propertywindow.nl/*'
                sh 'rsync -vrzhe "ssh -o StrictHostKeyChecking=no" ./ root@propertywindow.nl:/var/www/socket.propertywindow.nl'
            }
        }
        stage('Deploying: Start') {
            steps {
                echo 'Staring...'
                sh 'sshagent cd /var/www/socket.propertywindow.nl'
                sh 'sshagent npm stop'
                sh 'sshagent npm start'
            }
        }
    }
}
