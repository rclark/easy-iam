var Statement = require('./statement');
var util = require('./util');

module.exports = {
  'read from': new Statement(['table', 'region'], readFrom),
  'write to': new Statement(['table', 'region'], writeTo),
  'manage table': new Statement(['table', 'region'], manage),
  'read from stream': new Statement(['table', 'region'], readStream)
};

function readFrom(options) {
  var region = options.region || { Ref: 'AWS::Region' };
  var account = { Ref: 'AWS::AccountId' };

  return [
    {
      Action: [
        'dynamodb:GetItem',
        'dynamodb:Query',
        'dynamodb:Scan',
        'dynamodb:BatchGetItem'
      ],
      Effect: 'Allow',
      Resource: util.join('arn:aws:dynamodb:%s:%s:table/%s*', region, account, options.table)
    }
  ];
}

function writeTo(options) {
  var region = options.region || { Ref: 'AWS::Region' };
  var account = { Ref: 'AWS::AccountId' };

  return [
    {
      Action: [
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem',
        'dynamodb:BatchWriteItem'
      ],
      Effect: 'Allow',
      Resource: util.join('arn:aws:dynamodb:%s:%s:table/%s*', region, account, options.table)
    }
  ];
}

function manage(options) {
  var region = options.region || { Ref: 'AWS::Region' };
  var account = { Ref: 'AWS::AccountId' };

  return [
    {
      Action: [
        'dynamodb:CreateTable',
        'dynamodb:DeleteTable',
        'dynamodb:DescribeTable',
        'dynamodb:UpdateTable'
      ],
      Effect: 'Allow',
      Resource: util.join('arn:aws:dynamodb:%s:%s:table/%s', region, account, options.table)
    },
    {
      Action: [
        'dynamodb:ListTables'
      ],
      Effect: 'Allow',
      Resource: util.join('arn:aws:dynamodb:%s:%s:table/%s', region, account, options.table)
    }
  ];
}

function readStream(options) {
  var region = options.region || { Ref: 'AWS::Region' };
  var account = { Ref: 'AWS::AccountId' };

  return [
    {
      Action: [
        'dynamodb:GetRecords',
        'dynamodb:GetShardIterator',
        'dynamodb:DescribeStream',
        'dynamodb:ListStreams'
      ],
      Effect: 'Allow',
      Resource: util.join('arn:aws:dynamodb:%s:%s:table/%s/stream/*', region, account, options.table)
    }
  ];
}
