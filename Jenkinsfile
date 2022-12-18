pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh 'rm -rf /var/NodeServer/velibforecast/build/'
        sh 'npm ci'
        sh 'kill -9 `ps -ef | grep node | grep -v grep | awk \'{ print $2 }\'`'
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
        sh 'cp -r ${WORKSPACE}/build/ /var/NodeServer/velibforecast/build/'
      }
    }

    stage('restart') {
      steps {
        sh '''nohup node /var/NodeServer/server.js &
'''
      }
    }

  }
}