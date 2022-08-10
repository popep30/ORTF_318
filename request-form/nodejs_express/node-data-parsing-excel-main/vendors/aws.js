const aws = require('aws-sdk');
const { readFileContent } = require('../lib');

const writeFileToS3Bucket = (fileName) => {
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: readFileContent(fileName),
  };

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`[INFO]: File uploaded successfully. ${data.Location}`);
  });
};

module.exports = {
  writeFileToS3Bucket,
};
