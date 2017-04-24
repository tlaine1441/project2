var expect = require('chai').expect;
var request = require('request');
require('dotenv').config();

describe("Meetup Api", function() {
	it("should return a status 200-ok", function(done) {
		request("https://api.meetup.com/recommended/events?key=" + process.env.API_KEY + "&topic_category=tech&radius=5", function (error, res, body) {
			expect(res.statusCode).to.eq(200);
			done();
		});
	});
	it("should have a name in the response body", function(done){
		request("https://api.meetup.com/recommended/events?key=" + process.env.API_KEY + "&topic_category=tech&radius=5", function (error, res, body) {
			//console.log(body);
			var body = JSON.parse(body);
			expect(body[0].name).to.not.be.empty;
			done();
		});;
	});
	it("should have a id in the response body", function(done){
		request("https://api.meetup.com/recommended/events?key=" + process.env.API_KEY + "&topic_category=tech&radius=5", function (error, res, body) {
			//console.log(body);
			var body = JSON.parse(body);
			expect(body[0].id).to.not.be.empty;
			done();
		});;
	});
});