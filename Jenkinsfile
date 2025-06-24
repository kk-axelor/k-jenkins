pipeline {
  agent any

  tools {
    nodejs "NodeJS_20"   // Name you set in Jenkins NodeJS tool config
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/kk-axelor/k-jenkins.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing Node.js dependencies...'
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        echo 'Building the project...'
        sh 'npm run build'
      }
    }

    stage('Archive Build') {
      steps {
        archiveArtifacts artifacts: 'build/**', fingerprint: true
      }
    }

    // Optional: deploy stage
  }

  post {
    success {
      echo '✅ Build and archive successful!'
    }
    failure {
      echo '❌ Build failed.'
    }
  }
}
