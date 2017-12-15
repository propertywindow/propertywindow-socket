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
                        sh 'pwd'
                        sh 'whoami'
                        sh 'cd /var && ls -l'
                        sh 'ls -l'
                        sh 'cd /var/www/ && ls -l'
                        sh 'ls -l'
                        sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl rm -rf /var/www/socket.propertywindow.nl/*'
                        sh 'rsync -vrzhe "ssh -o StrictHostKeyChecking=no" ./ root@propertywindow.nl:/var/www/socket.propertywindow.nl'
                    }
                }
        stage('Deploying: Start') {
            steps {
                echo 'Staring...'
                sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl cd /var/www/socket.propertywindow.nl'
                sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl npm stop'
                sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl npm start'
            }
        }
    }
}
