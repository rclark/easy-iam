var Statement = require('./statement');

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
      Resource: `arn:aws:s3:::${options.bucket}/${options.prefix}*`
    }
  ];
}

function readFrom(options) {
  return [
    {
      Action: ['s3:GetObject', 's3:GetObjectAcl', 's3:GetObjectVersions'],
      Effect: 'Allow',
      Resource: `arn:aws:s3:::${options.bucket}/${options.prefix}*`
    }
  ];
}

function list(options) {
  return [
    {
      Action: ['s3:ListBucket'],
      Effect: 'Allow',
      Resource: `arn:aws:s3:::${options.bucket}`,
      Condition: { StringLike: { 's3:prefix': `${options.prefix}*` } }
    }
  ];
}

function manageMultiPartUploads(options) {
  return [
    {
      Action: ['s3:ListBucketMultipartUploads'],
      Effect: 'Allow',
      Resource: `arn:aws:s3:::${options.bucket}`
    },
    {
      Action: ['s3:ListMultipartUploadParts', 's3:AbortMultipartUpload'],
      Effect: 'Allow',
      Resource: `arn:aws:s3:::${options.bucket}/*`
    }
  ];
}

function bucketInfo() {
  return [
    {
      Action: ['s3:ListAllMyBuckets', 's3:GetBucketLocation'],
      Effect: 'Allow',
      Resource: '*'
    }
  ];
}

function manageLifecycle(options) {
  return [
    {
      Action: ['s3:GetLifecycleConfiguration', 's3:PutLifecycleConfiguration'],
      Effect: 'Allow',
      Resource: `arn:aws:s3:::${options.bucket}`
    }
  ];
}

function manageNotifications(options) {
  return [
    {
      Action: ['s3:GetBucketNotification', 's3:PutBucketNotification'],
      Effect: 'Allow',
      Resource: `arn:aws:s3:::${options.bucket}`
    }
  ];
}

function removeVersions(options) {
  return [
    {
      Action: ['s3:DeleteObjectVersion'],
      Effect: 'Allow',
      Resource: `arn:aws:s3:::${options.bucket}/${options.prefix}*`
    }
  ];
}
