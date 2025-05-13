pipeline {
    agent {
        // 使用 Docker 容器作为 Jenkins Agent
        docker {
            image 'mcr.microsoft.com/playwright:v1.52.0-noble' // 官方 Playwright Docker 镜像
            args '-u root' // 以 root 用户运行容器，确保有权限安装依赖
        }
    }
    tools {
        allure 'Allure' // Jenkins 会负责将此工具注入到 agent
        // 你可能还需要配置 Node.js 工具，而不是依赖 Docker 镜像中的版本
        // nodejs 'NodeJS-18' // 假设你在全局工具中配置了 NodeJS
    }
    stages {
        stage('Checkout') {
            steps {
                // 检出代码
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // 安装所有项目依赖
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // 同时生成 HTML、JUnit XML、Allure 数据
                    sh '''
                      npx playwright test greaty \
                        --reporter=html \
                        --reporter=junit \
                        --reporter=allure-playwright
                    '''
                    //sh 'npx playwright test greaty '
                }
            }
        }
    }
    post {
        always {
            // 将测试报告归档到 Jenkins
            //archiveArtifacts artifacts: '**/playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'playwright-report/**/*, allure-report/**/*', fingerprint: true, allowEmptyArchive: true
            // 1. 发布 JUnit 报告
            junit allowEmptyResults: true, testResults: '**/results.xml'
            // 2. 发布 HTML 报告
            publishHTML target: [
              reportDir: 'playwright-report',
              reportFiles: 'index.html',
              reportName: 'Playwright HTML Report'
            ]
            // 3. 发布 Allure 报告
            allure([
              includeProperties: false,
              jdk: '',
              results: [[path: 'allure-results']],
              reportBuildPolicy: 'ALWAYS'
            ])
        }
        success {
            echo '测试成功完成！'
        }
        failure {
            echo '测试失败，请检查日志。'
        }
    }
}