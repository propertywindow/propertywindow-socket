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
                        sh 'rm -rf /var/www/socket.propertywindow.nl/*'
                        sh 'mv . /var/www/socket.propertywindow.nl'
                    }
                }
        stage('Start') {
            steps {
                echo 'Staring...'
                sh 'cd /var/www/socket.propertywindow.nl'
                sh 'npm stop'
                sh 'npm start'
            }
        }
    }
}
