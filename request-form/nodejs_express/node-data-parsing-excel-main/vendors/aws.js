const aws = require('aws-sdk');
const fs = require('fs');

const writeFileToS3Bucket = (fileName, key) => {
  const s3 = new aws.S3();

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: fs.readFileSync(fileName)
  };
  console.log('params==>>', params);

  // Uploading files to the bucket
  return s3.upload(params).promise();
};

module.exports = {
  writeFileToS3Bucket,
};
