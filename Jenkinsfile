pipeline {
    agent any

    stages {

        stage('Trigger TestNeo Run') {
    steps {
        withCredentials([
            string(credentialsId: 'TESTNEO_API_KEY', variable: 'TESTNEO_API_KEY'),
            string(credentialsId: 'TESTNEO_SERVER', variable: 'TESTNEO_SERVER'),
            string(credentialsId: 'TESTNEO_PROJECT_ID', variable: 'TESTNEO_PROJECT_ID')
        ]) {
            bat '''
echo TESTNEO_SERVER=%TESTNEO_SERVER%
echo TESTNEO_PROJECT_ID=%TESTNEO_PROJECT_ID%

curl -i -X POST "%TESTNEO_SERVER%/api/ci/run" ^
 -H "Authorization: Bearer %TESTNEO_API_KEY%" ^
 -H "Content-Type: application/json" ^
 -d "{\\"project_id\\": \\"%TESTNEO_PROJECT_ID%\\"}"
'''
        }
    }
}