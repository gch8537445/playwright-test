pipeline {
    agent {
        // 使用 Docker 容器作为 Jenkins Agent
        docker {
            image 'mcr.microsoft.com/playwright:v1.33.0-focal' // 官方 Playwright Docker 镜像
            args '-u root' // 以 root 用户运行容器，确保有权限安装依赖
        }
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
                    // 执行 Playwright 测试
                    sh 'npx playwright test greaty --reporter=dot'
                }
            }
        }
        stage('Generate Test Report') {
            steps {
                script {
                    // 生成 Playwright 的 HTML 报告
                    sh 'npx playwright show-report'
                }
            }
        }
    }
    post {
        always {
            // 将测试报告归档到 Jenkins
            archiveArtifacts artifacts: '**/playwright-report/**', allowEmptyArchive: true
        }
        success {
            echo '测试成功完成！'
        }
        failure {
            echo '测试失败，请检查日志。'
        }
    }
}