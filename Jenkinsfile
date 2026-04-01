pipeline {
    agent any

    parameters {
        string(
            name: 'TESTNEO_TAGS',
            defaultValue: '',
            description: 'Test tags (e.g. smoke,login)'
        )
        string(
            name: 'TESTNEO_WORKERS',
            defaultValue: '3',
            description: 'Parallel workers (max 10)'
        )
    }

    environment {
        TESTNEO_SERVER = credentials('TESTNEO_SERVER')
        TESTNEO_API_KEY = credentials('TESTNEO_API_KEY')
        TESTNEO_PROJECT_ID = credentials('TESTNEO_PROJECT_ID')
    }

    stages {

        stage('Trigger TestNeo Run') {
            steps {
                bat '''
echo TESTNEO_SERVER=%TESTNEO_SERVER%
echo TESTNEO_PROJECT_ID=%TESTNEO_PROJECT_ID%

curl -X POST "%TESTNEO_SERVER%/api/ci/run" ^
 -H "Authorization: Bearer %TESTNEO_API_KEY%" ^
 -H "Content-Type: application/json" ^
 -d "{\\"project_id\\": \\"%TESTNEO_PROJECT_ID%\\"}"
'''
            }
        }

        stage('Run Tests (Docker)') {
            steps {
                bat '''
docker run --rm ^
 -e TESTNEO_SERVER=%TESTNEO_SERVER% ^
 -e TESTNEO_API_KEY=%TESTNEO_API_KEY% ^
 -e TESTNEO_WORKERS=%TESTNEO_WORKERS% ^
 testneo/ci-runner:latest
'''
            }
        }
    }

    post {
        success {
            echo '✅ TestNeo pipeline completed successfully'
        }
        failure {
            echo '❌ Some tests failed. Check TestNeo dashboard'
        }
    }
}