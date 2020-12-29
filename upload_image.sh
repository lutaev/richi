#! /bin/bash

# Variables
EB_BUCKET=$1
EB_ENV_NAME=$2
EB_ENV_ID=$3
APP_NAME=$4
DEPLOYMENT_REGION=$5
DOCKER_TAG=$6

DOCKERRUN_FILE="Dockerrun.aws.json"
PREFIX="deploy/$DOCKER_TAG"

echo "::::: Pushing Dockerrun.aws.json file :::::"
aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$PREFIX/$DOCKERRUN_FILE
sleep 30

echo "::::: Creating new Elastic Beanstalk version :::::"
aws elasticbeanstalk create-application-version \
    --region=$DEPLOYMENT_REGION \
    --application-name $APP_NAME \
    --version-label $DOCKER_TAG \
    --source-bundle S3Bucket=$EB_BUCKET,S3Key=$PREFIX/$DOCKERRUN_FILE
sleep 30

echo "::::: Updating Elastic Beanstalk environment :::::"
aws elasticbeanstalk update-environment \
  --environment-id $EB_ENV_ID \
  --environment-name $EB_ENV_NAME \
  --application-name $APP_NAME \
  --version-label $DOCKER_TAG



