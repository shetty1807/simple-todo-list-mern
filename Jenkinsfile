pipeline {
    agent any

    parameters {
        string(
            name: 'TESTNEO_TAGS',
            defaultValue: '',
            description: 'Test tags to run (comma-separated, e.g. smoke,login)'
        )
        string(
            name: 'TESTNEO_WORKERS',
            defaultValue: '3',
            description: 'Parallel workers (default 3, max 10)'
        )
    }

    environment {
        TESTNEO_SERVER = credentials('TESTNEO_SERVER')
        TESTNEO_API_KEY = credentials('TESTNEO_API_KEY')
        TESTNEO_PROJECT_ID = credentials('TESTNEO_PROJECT_ID')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Trigger TestNeo Run') {
            steps {
                bat """
curl -X POST "https://api.testneo.ai/api/ci/run" ^
 -H "Authorization: Bearer %TESTNEO_API_KEY%" ^
 -H "Content-Type: application/json" ^
 -d "{\\"project_id\\": \\"37\\"}"
"""
            }
        }
    }

    post {
        success {
            echo 'TestNeo pipeline completed successfully.'
        }
        failure {
            echo 'Some tests failed. Check TestNeo dashboard.'
        }
    }
}