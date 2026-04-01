// Save as: Jenkinsfile
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
        stage('Run TestNeo Tests') {
            steps {
                script {
                    // Build tags JSON
                    def tagsJson = 'null'
                    if (params.TESTNEO_TAGS) {
                        def tagsList = params.TESTNEO_TAGS.split(',').collect { it.trim() }
                        tagsJson = groovy.json.JsonOutput.toJson(tagsList)
                        echo "🏷️  Running tests with tags: ${params.TESTNEO_TAGS}"
                    } else {
                        echo "🧪 Running ALL tests"
                    }
                    
                    // 1. Trigger CI job
                    def response = sh(
                        script: """
                            curl -sf -X POST \
                                "${TESTNEO_SERVER}/api/web/v1/ci/trigger" \
                                -H "X-API-Key: ${TESTNEO_API_KEY}" \
                                -H "Content-Type: application/json" \
                                -d '{
                                    "project_id": ${TESTNEO_PROJECT_ID},
                                    "tags": ${tagsJson},
                                    "branch": "${env.GIT_BRANCH}",
                                    "commit_sha": "${env.GIT_COMMIT}",
                                    "triggered_by": "jenkins",
                                    "build_number": "${env.BUILD_NUMBER}"
                                }'
                        """,
                        returnStdout: true
                    ).trim()
                    
                    def json = readJSON text: response
                    def jobId = json.job_id
                    def totalTests = json.total_tests
                    
                    echo "✅ Job ${jobId} — ${totalTests} tests queued"
                    
                    // 2. Run tests in Docker
                    sh """
                        docker run --rm --shm-size=2g \
                            -e TESTNEO_SERVER="${TESTNEO_SERVER}" \
                            -e TESTNEO_API_KEY="${TESTNEO_API_KEY}" \
                            -e CI_JOB_ID="${jobId}" \
                            -e TESTNEO_WORKERS="${params.TESTNEO_WORKERS}" \
                            testneo/ci-runner:latest
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ All tests passed!'
        }
        failure {
            echo '❌ Some tests failed. Check TestNeo dashboard.'
        }
    }
}
