'use strict';

const $ = require('jquery');
const Module = require('_modules/boilerplate');

describe('App.modules.boilerplate', function() {
  let $el = $('<div>', { class: 'test-div' });
  let Instance = new Module($el);

  it('Should be an function', function() {
    expect(Module).to.be.an('function');
  });

  it('Instance should be an object', function() {
    expect(Instance).to.be.an('object');
  });

  it('Instance should contains few el and $el properties', function() {
    expect(Instance).to.have.property('el');
    expect(Instance).to.have.property('$el');
  });

  it('Instance should contains render() function', function() {
    expect(Instance).to.have.property('render').an('function');
  });

  it('parent $el should contain rendered module', function() {
    expect($el.find('#fullpage')).to.be.an('object');
  });
});
