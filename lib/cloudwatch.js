var Statement = require('./statement');

module.exports = {
  'write metrics': new Statement([], writeMetrics)
};

function writeMetrics() {
  return [
    {
      Action: ['cloudwatch:PutMetricData'],
      Effect: 'Allow',
      Resource: '*'
    }
  ];
}
