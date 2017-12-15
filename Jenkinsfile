#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
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
                sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl rm -rf /var/www/socket.propertywindow.nl/*'
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
