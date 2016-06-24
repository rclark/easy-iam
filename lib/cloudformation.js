var Statement = require('./statement');
var util = require('./util');

module.exports = {
  'describe stack': new Statement(['stack', 'region'], describe)
};

function describe(options) {
  var region = options.region || { Ref: 'AWS::Region' };
  var account = { Ref: 'AWS::AccountId' };

  return [
    {
      Action: [
        'cloudformation:DescribeStacks',
        'cloudformation:DescribeStackResources'
      ],
      Effect: 'Allow',
      Resource: util.join('arn:aws:cloudformation:%s:%s:stack/%s/*', region, account, options.stack)
    }
  ];
}
