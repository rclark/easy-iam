var util = require('util');

module.exports = {
  join: join,
  flatten: flatten
};

function join() {
  var template = arguments[0];
  var params = [];
  for (var i = 1; i < arguments.length; i++) params.push(arguments[i]);

  if (!params.some(function(p) { return typeof p === 'object'; }))
    return util.format.apply(null, arguments);

  template = template.split('%s');

  return {
    'Fn::Join': [
      '',
      params.reduce(function(final, p, i) {
        final.push(template[i]);
        final.push(p);
        return final;
      }, [])
    ]
  };
}

function flatten(parent) {
  return parent.reduce(function(final, child) {
    child.forEach(function(grandchild) {
      final.push(grandchild);
    });
    return final;
  }, []);
}
