const modelPersist = require('./bundle/model-persistence');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const moxios = require('moxios');
const fakeLocalStorage = require('./bundle/fakeLocalStorage');
chai.use(sinonChai);

global.modelPersist = modelPersist;
global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
global.sinonChai = sinonChai;
global.moxios = moxios;
global.localStorage = fakeLocalStorage;
global.sessionStorage = fakeLocalStorage;
global.fakeLocalStorage = fakeLocalStorage;
