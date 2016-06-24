var Statement = require('./statement');
var util = require('./util');

module.exports = {
  'list objects': new Statement(['bucket', 'prefix'], list),
  'read from': new Statement(['bucket', 'prefix'], readFrom),
  'write to': new Statement(['bucket', 'prefix'], writeTo),
  'manage multipart uploads': new Statement(['bucket'], manageMultiPartUploads),
  'bucket info': new Statement([], bucketInfo),
  'manage lifecycle': new Statement(['bucket'], manageLifecycle),
  'manage notifications': new Statement(['bucket'], manageNotifications),
  'remove versions': new Statement(['bucket', 'prefix'], removeVersions)
};

function writeTo(options) {
  return [
    {
      Action: ['s3:PutObject', 's3:PutObjectAcl', 's3:DeleteObject'],
      Effect: 'Allow',
      Resource: util.join('arn:aws:s3:::%s/%s*', options.bucket, options.prefix)
    }
  ];
}

function readFrom(options) {
  return [
    {
      Action: ['s3:GetObject', 's3:GetObjectAcl', 's3:GetObjectVersions'],
      Effect: 'Allow',
      Resource: util.join('arn:aws:s3:::%s/%s*', options.bucket, options.prefix)
    }
  ];
}

function list(options) {
  return [
    {
      Action: ['s3:ListBucket'],
      Effect: 'Allow',
      Resource: util.join('arn:aws:s3:::%s', options.bucket),
      Condition: { StringLike: { 's3:prefix': '%s*' } }
    }
  ];
}

function manageMultiPartUploads(options) {
  return [
    {
      Action: ['s3:ListBucketMultipartUploads'],
      Effect: 'Allow',
      Resource: util.join('arn:aws:s3:::%s')
    },
    {
      Action: ['s3:ListMultipartUploadParts', 's3:AbortMultipartUpload'],
      Effect: 'Allow',
      Resource: util.join('arn:aws:s3:::%s/*', options.bucket)
    }
  ];
}

function bucketInfo() {
  return [
    {
      Action: ['s3:ListAllMyBuckets', 's3:GetBucketLocation'],
      Effect: 'Allow',
      Resource: util.join('*')
    }
  ];
}

function manageLifecycle(options) {
  return [
    {
      Action: ['s3:GetLifecycleConfiguration', 's3:PutLifecycleConfiguration'],
      Effect: 'Allow',
      Resource: util.join('arn:aws:s3:::%s', options.bucket)
    }
  ];
}

function manageNotifications(options) {
  return [
    {
      Action: ['s3:GetBucketNotification', 's3:PutBucketNotification'],
      Effect: 'Allow',
      Resource: util.join('arn:aws:s3:::%s', options.bucket)
    }
  ];
}

function removeVersions(options) {
  return [
    {
      Action: ['s3:DeleteObjectVersion'],
      Effect: 'Allow',
      Resource: util.join('arn:aws:s3:::%s/%s*', options.bucket, options.prefix)
    }
  ];
}
