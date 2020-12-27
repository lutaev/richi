#! /bin/bash

# Variables
DOCKER_USERNAME=$1
# DOCKER_PASSWORD=$2
EB_BUCKET=$3
EB_ENV_NAME=$4
EB_ENV_ID=$5

APP_NAME=$6
DEPLOYMENT_REGION=$7
# IMAGE_NAME=$8
DOCKER_REPOSITORY=$9
DOCKER_TAG=$10

DOCKERRUN_FILE="Dockerrun.aws.json"
# DOCKERCFG=".dockercfg"
# DOCKER_CONFIG="/home/travis/.docker/config.json"

PREFIX="deploy/$DOCKER_TAG"
DOCKER_IMAGE="$DOCKER_USERNAME/$DOCKER_REPOSITORY"

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



