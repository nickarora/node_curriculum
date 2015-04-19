// ES6
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';

// var sinon = require('sinon');
// var sinonChai = require('sinon-chai');
// var chai = require('chai');

chai.use(sinonChai);
var expect = chai.expect;

describe('Example Test', () => { //ES6 for function.bind(this)

	let randomVar, someVar;

	beforeEach( () => {
		randomVar = 10;
		someVar = 5;
		//someVar = new Obj();
	});

	it ('has a functioning testing framework', () => {
		// expect(someVar.count).to.equal(randomVar);
	});

});