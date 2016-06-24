var Statement = require('./statement');

module.exports = {
  'describe groups': new Statement([], describe),
  'update groups': new Statement([], update)
};

function describe() {
  return [
    {
      Action: [
        'autoscaling:DescribeAutoScalingInstances',
        'autoscaling:DescribeAutoScalingGroups'
      ],
      Effect: 'Allow',
      Resource: '*'
    }
  ];
}

function update() {
  return [
    {
      Action: [
        'autoscaling:SetDesiredCapacity',
        'autoscaling:UpdateAutoScalingGroup',
        'autoscaling:TerminateInstanceInAutoScalingGroup'
      ],
      Effect: 'Allow',
      Resource: '*'
    }
  ];
}
