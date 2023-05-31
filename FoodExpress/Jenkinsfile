pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        
         stage('Test') {
            steps {
                echo 'Testing..'
            }
         }
             
        stage('Deploy Build') {
            steps {
                sh 'sudo python3 /home/ubuntu/deployScript.py'
            }
        }
        
        stage('Deploy QA') {
            steps {
                sh 'sudo python3 /home/ubuntu/deployQA.py'
            }
        }       
    }
    
     post {
        always {
                mail body: "Email Notification  for deployment,\n\n${currentBuild.currentResult}: Job ${env.JOB_NAME}\nBuild Number: ${env.BUILD_NUMBER}\nBuild ID: ${env.BUILD_ID}\n\nMore info at: ${env.BUILD_URL}\n\n-Jenkins", cc: '', from: '', replyTo: '', subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}", to: 'jigarvaishnav06@gmail.com'   
        }
    }
   
   //testing
}
