'use strict';

// Depends
const $ = require('jquery');
const Module = require('_modules/boilerplate');
const expect = require('chai').expect;

describe('App.modules.boilerplate', () => {
  let $el = $('<div>', { class: 'test-div' });
  let Instance = new Module($el);

  it('Should be an function', () => {
    expect(Module).to.be.an('function');
  });

  it('Instance should be an object', () => {
    expect(Instance).to.be.an('object');
  });

  it('Instance should contains few el and $el properties', () => {
    expect(Instance).to.have.property('el');
    expect(Instance).to.have.property('$el');
  });

  it('Instance should contains render() function', () => {
    expect(Instance).to.have.property('render').an('function');
  });

  it('parent $el should contain rendered module', () => {
    expect($el.find('#fullpage')).to.be.an('object');
  });

  it('Click at logo should load ip data', done =>{
    Instance.model.on('change:ip', () => done());
    Instance.$el.find('#rambler-logo').click();
  });

  it('Instance should contain .ip element', () => {
    expect(Instance.$el.find('.ip')).to.have.length(1);
  });
});
