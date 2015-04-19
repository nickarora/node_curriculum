var app = require('../app');
var http = require('http');

var seedArticles = require('../data/articles.json')

import sinon from 'sinon';
import chaiHttp from 'chai-http'
import chai from 'chai';

/* set up our test server */
var port = '8000';
app.set('port', port);
var server = http.createServer(app);

/* set up chai expectations */
chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request('http://localhost:' + port);

describe('homepage', () => {

	beforeEach( () => {
		server.listen(port);
	});

	it ( 'should respond to GET', (done) => {
		request.get('/').then( (res) => {
			expect(res.status).to.equal(200);
			done();
		});
	});

	it ( 'should contain post', (done) => {
		request.get('/').then(function(res){
			seedArticles.forEach(function(item, index, list){
				if (item.published){
					expect(res.text).to.have('<h2><a href="/articles/' + item.slug + '">' + item.title);
				} else {
					expect(res.text).not.to.have('<h2><a href="/articles/' + item.slug + '">' + item.title);
				}
			});
			done();
		});
	});

	afterEach( () => {
		server.close();
	});

});

describe('article page', () => {

	beforeEach( () => {
		server.listen(port);
	});

	it ('should display text', (done) => {
		var n = seedArticles.length;
		seedArticles.forEach(function(item, index, list){
			request.get('/articles/' + seedArticles[index].slug).then( (res)=>{
				if (item.published) {
					expect(res.text).to.have(seedArticles[index].text);
				} else {
					expect(res.status).to.be(401);
				}
				if (index + 1 === n) {
					done();
				}
			});
		});
	});

	afterEach( () => {
		server.close();
	});

});

