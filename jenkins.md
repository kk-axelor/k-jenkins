🔰 1. Jenkins Basics
✅ What is Jenkins?

✅ Installing Jenkins (Docker or system)

✅ Jenkins UI Overview: Dashboard, Jobs, Pipelines

✅ Jenkins Home Directory & File Structure

🛠️ 2. Creating and Managing Jobs
✅ Freestyle Projects (basic build/test steps)

✅ Parameterized Builds

✅ Polling vs Webhooks for Git

💻 3. Source Control Integration
✅ Connect Jenkins to GitHub / GitLab

GitHub plugin setup

SSH vs HTTPS

✅ Trigger build on code push (webhook setup)

📦 4. Frontend Build Tools Integration
Automate build & test steps using NPM/Yarn

✅ Install Node.js on Jenkins

✅ Run scripts: npm install, npm run build, npm run test

✅ Archive built files as artifacts

🧪 5. Running Frontend Tests
✅ Run unit/integration tests (e.g., Jest, RTL, Cypress)

✅ Parse and show test reports (JUnit, HTML, etc.)

✅ Set build status: pass/fail based on tests

📈 6. Pipelines with Jenkinsfile (very important)
✅ Declarative Pipeline Syntax

✅ Stages: build, test, deploy

✅ Parallel stages (e.g., run tests + lint together)

✅ Store Jenkinsfile in project repo

🚀 7. Deployment (Optional)
If you're building SPAs or static sites:

✅ Deploy to Netlify/Vercel via CLI

✅ Deploy to AWS S3 (static hosting)

✅ FTP/SCP upload to server

✅ Use Docker to containerize & deploy frontend app

🔐 8. Security & User Management
✅ Set up admin users and permissions

✅ Secure Jenkins with password & CSRF

✅ Add credential secrets (API keys, SSH keys)

📦 9. Plugin Ecosystem
✅ Install and update plugins

✅ Useful plugins:

GitHub

Pipeline

Blue Ocean (UI)

HTML Publisher

NodeJS

🛠️ 10. Troubleshooting & Logs
✅ Jenkins logs location

✅ View build logs & console output

✅ Re-run failed jobs

🧭 Suggested Learning Path for You
Week Focus
1️⃣ Install Jenkins, build a simple Node.js frontend app
2️⃣ Integrate GitHub, run npm build, archive artifacts
3️⃣ Add tests and show results in Jenkins
4️⃣ Learn and use Jenkinsfile pipelines
5️⃣ Automate deployment (S3, Vercel, or Netlify)

# What is Jenkins?

Jenkins is an open-source automation server primarily used for continuous integration and continuous delivery (CI/CD). It helps automate the build, test, and deployment of software, streamlining the software development lifecycle. Jenkins acts as a central hub for managing and automating various tasks within a CI/CD pipeline.

# What is a job?

A job is an task that can be perform by jenkins.
it could be

- Building a React App
- Running tests
- Deploying to a server.

There are 4 main type of jobs:

- FreeStyle Project: Easiest to start with -basic build steps
- Pipeline : Script , flexible , supports mulitple stages.
- Multibranch Pipeline: Auto detect branches from Git and run pipelines per branch.
- Folder : Orgranize jobs into folder.

For CI/CD today, Pipeline Jobs are the most powerful and preferred.

# What is Pipeline?

A pipeline is a series of steps to build , test and deploy your application.

Define using a JenkinsFile ( You store in your git repo)

```
pipeline{
    agent any
    stages{
        stage('Install'){
            step{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                sh 'npm test'
            }
        }
        stage('Build'){
            steps{
                sh 'npm run build'
            }
        }
    }
}
```

# What is Jenkins Home Directory?

Jenkins home Directory is the centeral location where jenkins stores all its configuration and data:

By default:

- linux: /var/lib/jenkins
- Docker: /var/jenkins_home

## File structure of Jenkins Home

```
/var/jenkins_home/
│
├── jobs/                 # All Jenkins jobs & pipelines
│   └── your-job-name/
│       ├── builds/       # All past builds, logs
│       ├── config.xml    # Job config (UI settings or Jenkinsfile)
│
├── users/                # Jenkins users & configs
│
├── secrets/              # Encrypted credentials, tokens (🔐 DO NOT SHARE)
│
├── plugins/              # All installed plugins (.jpi files)
│
├── nodes/                # If you use build agents/slaves
│
├── logs/                 # Jenkins system logs
│
├── workspace/            # Code from the latest job builds
│   └── your-job-name/
│       └── (git repo clone + npm build output, etc.)
│
├── credentials.xml       # Encrypted credentials (backend format)
├── hudson.model.UpdateCenter.xml  # Plugin update center cache
├── config.xml            # Global Jenkins config
└── jenkins.model.JenkinsLocationConfiguration.xml

```

# 2:Creating and Managing Jobs

## 🛠️ 2.1 What is a Freestyle Project?

A Freestyle Project is the simplest job type in Jenkins.
It's a GUI -driven job that allows you to define:

- What Code to pull
- What script/commands to run(build/test)
- Where to deploy

use cases:

- Simple CI tasks
- projects without complex stages
- First-time Jenkins users(to get comfortable)

## 2.2 What is Parameterized Builds?

**Parameterized builds** allow you to pass inputs(like dropdown, string, checkbo, ect) to your jenkins jobs at runtime.
This is super useful when:

- You want to deploy to different environments (e.g., dev, staging, prod)
- You want to trigger a build with a specific Git branch or version
- You want to toggle a feature flag or build mode

How to create a Parameterized freestyle job:

1. in configuration , click "This project is Parameterized"
2. The you add parameter

```
| Parameter Type       | Use Case                                       |
| -------------------- | ---------------------------------------------- |
| `String Parameter`   | Accept a string (e.g. `branch=feature-x`)      |
| `Choice Parameter`   | Dropdown options like `dev`, `staging`, `prod` |
| `Boolean Parameter`  | Checkbox (e.g., enable debug logs)             |
| `File Parameter`     | Upload a file                                  |
| `Password Parameter` | Masked input (tokens, secrets)                 |

```

## Polling and Webhooks for git

In CI/CD, You usually want jenkins to automatically build your project when Code changes in GitHub,GitLab or BitBucket.

There are 2 main way to do this:

| Trigger Type    | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| ⏱️ **Polling**  | Jenkins asks Git every X minutes: “Any changes?”                   |
| 🔔 **Webhooks** | GitHub pushes a message to Jenkins: “Hey, new commit just landed!” |

**GIT POlling**: Jenkins periodically checks the Git repo itself (like a cron job)

✅ Pros of Polling

- Easy to configure (no need to touch GitHub settings)
- Works behind firewalls / no incoming internet needed

❌ Cons of Polling

- Wasteful — checks even when nothing has changed
- Can be slow if polling every 15–30 mins
- Delay between commit and build

**Git Webhooks**: Your Git Provider(eg: Github) notifies jenkins immediately when a push happens.

> 🔔 Instant, real-time builds with zero delay.

# Source Control Integration with Jenkins:

Seamleassly connect jenkins to GitHub(or Gitlab) to automatically clone code, run builds and trigger jobs via commit or pull requests.

We will cover :

1. GitHub Plugin Setup(freestyle + pipeline)
2. Chossing SSH vs HTTPS
3. Adding Github Credential to Jenkins
4. Connecting jobs to your github repo
5. Webhooks triggers for push/PR builds

## ✅ 1. GitHub Plugin Setup (Required for webhook + GitHub SCM)

📦 Required Plugins:
Go to Manage Jenkins → Manage Plugins → Installed

✅ Make sure these are installed:

Plugin Why
Git plugin Core Git support
GitHub plugin Enables GitHub connections, webhooks, and API access
GitHub Branch Source Needed for Multibranch + PR builds
Pipeline: GitHub Used in declarative pipelines

## 2. SSH vs HTPPS: Which Should you use?

| Method       | When to Use                                  | Pros                                       | Cons                                                |
| ------------ | -------------------------------------------- | ------------------------------------------ | --------------------------------------------------- |
| 🔐 **SSH**   | Preferred for private repos and secure CI/CD | No need to enter password/token every time | Requires SSH key setup                              |
| 🌐 **HTTPS** | Good for quick test projects or public repos | Simple                                     | Needs personal access token (PAT) for private repos |

# Frontend Build Tool Integration

> Goal: Automate frontend CI Step like **npm install** , **npm run build** and **npm test**

## 1. Installation of Node.js on Jenkins

If you're using a Jenkins Docker container, it doesn’t have Node.js by default.

```
1. Jenkins → Manage Jenkins → Plugins → Install "NodeJS Plugin"

2. Then go to:
Manage Jenkins → Global Tool Configuration

Find NodeJS → Add version (e.g., Node 18.x) → Name it node18

3. In your job config → Add "Provide NodeJS environment" build step

```

## 2. Run NPM/Yarn Build Commands

> Go to Configure → Build section → Add build step → Execute shell

```
# clean install deps
npm ci

# run your build script (usually creates /build or /dist folder)
npm run build

# run tests (optional but useful)
npm test

```

## 3. Archive Built Files as Artifacts

This saved your production-ready code(eg: build/ folder) in jenkins for download or deploymen.

Add a post-build step:

- Go to Post-build actions
- Click add post-build action -> archive the artifacts
- In files to archive , add build/** or dist/**

you might get some error while building

> Quasar Error: Cannot find module 'ajv/dist/compile/codegen'
> solution: npm ls ajv
> npm install --save-dev ajv@^8

# Pipelines with jenkins (Very Important)

## Declarative Pipeline Systax

Jenkins support two types for pipeline:

- Declarative -> clean , structured , easy to read
- Scripted -> more flexible, but verbose and harder for teams

```
pipeline {
  agent any   // or specify docker/image/node

  environment {
    // optional: set environment variables here
  }

  tools {
    nodejs 'node18' // if you use NodeJS plugin
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test -- --watchAll=false'
      }
    }

    stage('Deploy') {
      steps {
        echo "Deploy stage (to be implemented)"
      }
    }
  }

  post {
    success {
      echo '🎉 Build passed!'
    }
    failure {
      echo '❌ Build failed.'
    }
  }
}

```

**What each block means**
| Block | Purpose |
| ---------- | ---------------------------------------------------------------- |
| `pipeline` | Top-level definition |
| `agent` | Defines where this runs (e.g. any node, docker container, label) |
| `tools` | Automatically installs tools (e.g. Node.js) |
| `stages` | Defines steps like `build`, `test`, `deploy` |
| `post` | Run actions after build (on success/failure/etc.) |

## parallel Stages in jenkins pipelines:

> Run Test and Lint stages at the same time to save time

**Why Use parallel?**
Normally , Jenkins runs each stage one after the others
But some tasks (like testing and linting) dont depend on each other.

- Running the in parallel to save time
- Jenkins can show both outputs side by side.

**Basic Syntax for Parallel Stages**

```
stage('Run in Parallel') {
  parallel {
    stage('Test') {
      steps {
        echo 'Running tests...'
        sh 'npm test -- --watchAll=false'
      }
    }
    stage('Lint') {
      steps {
        echo 'Running linter...'
        sh 'npm run lint'
      }
    }
  }
}

```
