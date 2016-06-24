#!/usr/bin/env node

var fs = require('fs');
var inquirer = require('inquirer');
var easy = require('..');

var outFile = process.argv[2];
var stream = outFile ? fs.createWriteStream(outFile) : process.stdout;

var output = [];
var names;

var checkbox = {
  type: 'checkbox',
  name: 'services',
  message: 'Select services',
  choices: Object.keys(easy)
};

inquirer.prompt([checkbox])
  .then(function(answers) {
    names = answers.services;
    selectPermissions();
  });

function selectPermissions() {
  var name = names.shift();
  if (!name) return stream.write(JSON.stringify(output, null, 4) + '\n');

  var service = easy[name];
  var checkbox = {
    type: 'checkbox',
    name: 'permissions',
    message: `Select desired ${name} permissions`,
    choices: Object.keys(service)
  };

  inquirer.prompt([checkbox]).then(function(answers) {
    var permissions = answers.permissions;

    (function ask() {
      var permission = permissions.shift();
      if (!permission) return selectPermissions();

      var statement = service[permission];
      inquirer.prompt(statement.questions(permission)).then(function(answers) {
        output = output.concat(statement.toPolicy(answers));
        ask();
      });
    })();

  });
}
