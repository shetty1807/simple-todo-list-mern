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
                script {
                    def tagsJson = '[]'
                    if (params.TESTNEO_TAGS?.trim()) {
                        def tags = params.TESTNEO_TAGS
                            .split(',')
                            .collect { "\"${it.trim()}\"" }
                            .join(',')
                        tagsJson = "[${tags}]"
                    }

                    bat """
curl -X POST "%TESTNEO_SERVER%/api/ci/run" ^
  -H "Authorization: Bearer %TESTNEO_API_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "{\\"project_id\\": \\"%TESTNEO_PROJECT_ID%\\", \\"tags\\": ${tagsJson}, \\"workers\\": %TESTNEO_WORKERS%}"
"""
                }
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