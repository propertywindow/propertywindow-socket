#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    ssh-agent (credentials: ['f6e8ec80-82e1-4d9c-962f-819cbecd0bcf']) {
        sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl uname -a'
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
                sh 'ssh-agent rm -rf /var/www/socket.propertywindow.nl/*'
                sh 'rsync -vrzhe "ssh -o StrictHostKeyChecking=no" ./ root@propertywindow.nl:/var/www/socket.propertywindow.nl'
            }
        }
        stage('Deploying: Start') {
            steps {
                echo 'Staring...'
                sh 'cd /var/www/socket.propertywindow.nl'
                sh 'npm stop'
                sh 'npm start'
            }
        }
    }
}
