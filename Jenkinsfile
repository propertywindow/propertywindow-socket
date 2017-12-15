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
                        try {
                                sh 'ssh-add -l'
                                sh 'ssh -o StrictHostKeyChecking=no -l root propertywindow.nl uname -a'
                                sh 'ssh -oStrictHostKeyChecking=no root@propertywindow.nl rm -rf /var/www/socket.propertywindow.nl/*'
                                sh 'rsync -vrzhe "ssh -o StrictHostKeyChecking=no" ./ root@propertywindow.nl:/var/www/socket.propertywindow.nl'
                            }
                            catch (exc) {
                                echo 'Something failed, I should sound the klaxons!'
                                throw
                            }
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
