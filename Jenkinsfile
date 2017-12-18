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
                sshagent(['52488a7e-586a-4087-a6fc-4654e5420403']) {
                    sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl rm -rf /var/www/socket.propertywindow.nl/*'
                    sh 'scp -r ./ root@propertywindow.nl:/var/www/socket.propertywindow.nl'
                }
            }
        }
        stage('Deploying: Start') {
            steps {
                echo 'Starting...'
                sshagent(['52488a7e-586a-4087-a6fc-4654e5420403']) {
                    sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl cd /var/www/socket.propertywindow.nl && npm stop && npm start'
                }
            }
        }
    }
}
