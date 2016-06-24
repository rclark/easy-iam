module.exports = Statement;

function Statement(args, fn) {
  if (!args || !Array.isArray(args) || !args.every(function(arg) { return typeof arg === 'string'; }))
    throw new Error('Invalid args array');
  if (!fn || typeof fn !== 'function')
    throw new Error('Invalid function provided');

  this.args = args;
  this.fn = fn;
}

Statement.prototype.questions = function(prefix) {
  return this.args.map(function(arg) {
    return {
      type: 'input',
      name: arg,
      message: `${prefix} - ${arg}:`
    };
  });
};

Statement.prototype.toPolicy = function(answers) {
  return this.fn(answers);
};

Statement.aggregate = function(policies) {
  return policies.reduce(function(output, policySet) {
    policySet.forEach(function(policy) {
      policies.push(policy);
    });
    return policies;
  }, []);
};
