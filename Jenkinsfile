pipeline {
  agent any

  tools {
    nodejs "NodeJS_21"
  }

  stages {
    stage("Clean install dependencies") {
      steps {
        echo "Cleaning node_modules and lock file"
        sh "rm -rf node_modules package-lock.json"
      }
    }

    stage("Install Dependencies") {
      steps {
        echo "Installing dependencies..."
        sh "npm install --legacy-peer-deps"
        sh "npm i ajv@8.17.1 --legacy-peer-deps"
      }
    }
  
    stage("Parallel Checks") {
      parallel {
        stage("Test") {
          steps {
            echo "Running tests..."
            sh "npm test -- --watchAll=false"
          }
        }
        stage("Lint") {
          steps {
            echo 'Running Lint...'
            echo "but right now just mock it"
          }
        }
      }  // ← Added missing closing brace for `parallel`
    }

    stage("Build") {
      steps {
        echo "Building the project"
        sh "npm run build"
      }
    }
  }

  post {
    success {
      echo "✅ Build passed"
    }
    failure {
      echo "❌ Build failed"
    }
  }
}