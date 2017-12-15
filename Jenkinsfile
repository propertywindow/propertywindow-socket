#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Deploy') {
                    steps {
                        echo 'Deploying...'
                        sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl rm -rf /var/www/socket.propertywindow.nl/*'
                        sh 'rsync -vrzhe "ssh -o StrictHostKeyChecking=no" ./ root@propertywindow.nl:/var/www/socket.propertywindow.nl'
                    }
                }
        stage('Start') {
            steps {
                echo 'Staring...'
                sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl cd /var/www/socket.propertywindow.nl'
                sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl npm stop'
                sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl npm start'
            }
        }
    }
}
