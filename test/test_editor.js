const assert = require('assert');
const Editor = require(`../Editor`)

describe('Array', function(done) {
  const narrativa = Editor.makeDummy(done)
  assert.equal(narrativa.nombre, '');
});
