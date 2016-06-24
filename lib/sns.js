var Statement = require('./statement');
var util = require('./util');

module.exports = {
  'publish to': new Statement(['topic'], publish),
  'publish from bucket': new Statement(['topic', 'bucket'], fromBucket)
};

function publish(options) {
  return [
    {
      Action: ['sns:Publish'],
      Effect: 'Allow',
      Resource: options.topic
    }
  ];
}

function fromBucket(options) {
  return [
    {
      Action: ['sns:Publish'],
      Effect: 'Allow',
      Principal: '*',
      Resource: options.topic,
      Condition: {
        ArnLike: { 'aws:SourceArn': util.join('arn:aws:s3:::%s', options.bucket) }
      }
    }
  ];
}
