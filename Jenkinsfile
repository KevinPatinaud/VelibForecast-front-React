pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('test') {
      steps {
        sh 'npm run test:ci'
      }
    }

    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('deploy') {
      steps {
        sh 'cp -r ${WORKSPACE}/build/ /var/NodeServer/velibforecast/'
      }
    }

  }
}