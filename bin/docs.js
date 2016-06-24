#!/usr/bin/env node

var easy = require('..');

process.stdout.write('# permissions\n');
process.stdout.write('\nAn outline of the functions provided by this library and the permissions that they expose\n');
process.stdout.write('\nYou can call a function as follows:\n');
process.stdout.write('\n```js\n');
process.stdout.write('var iam = require(\'easy-iam\');\n');
process.stdout.write('iam.dynamodb[\'read from\']({ table: \'my-table\', region: \'us-east-1\' });\n');
process.stdout.write('```\n');
process.stdout.write('\nYou can also provide objects if you are working in a CloudFormation template:\n');
process.stdout.write('\n```js\n');
process.stdout.write('iam.dynamodb[\'read from\']({ table: { Ref: \'MyTable\' }, region: { Ref: \'AWS::Region\' } });\n');
process.stdout.write('```\n');

Object.keys(easy).forEach(function(name) {
  process.stdout.write(`\n### ${name}\n`);
  Object.keys(easy[name]).forEach(function(perm) {
    var output = easy[name][perm].toPolicy({});

    var actions = output.reduce(function(actions, statement) {
      return actions.concat(statement.Action);
    }, []);
    process.stdout.write(`- **${perm}**: ${easy[name][perm].args.join(', ')}\n`);
    actions.forEach(function(action) {
      process.stdout.write(`  - ${action}\n`);
    });
  });
});
