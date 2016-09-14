'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var transform = require('./../../../transform/parsefile.js');

describe('Parse file Test:', () => {
	
	it('it should return struct of line parsed readed from file', () =>{
		var contentFromFile = '001ç1234567891234çDiegoç50000';

		var expectedContentFromExtract = [{
			id: '001',
			documentCode: '1234567891234',
			thirdItem: 'Diego', 
			fourthItem: '50000'
		}];	   					
		
		var structOfSeparatedLines = transform.parseLinesFromInputFile(contentFromFile);
			
		expect(structOfSeparatedLines.id).to.be.equal(expectedContentFromExtract.id);
		expect(structOfSeparatedLines.documentCode).to.be.equal(expectedContentFromExtract.documentCode);
		expect(structOfSeparatedLines.thirdItem).to.be.equal(expectedContentFromExtract.thirdItem);
		expect(structOfSeparatedLines.fourthItem).to.be.equal(expectedContentFromExtract.fourthItem);
	});

	it('it should return Error: ID needs to have only digits!', () =>{
		var contentFromFile = '0xx01ç1234567891234çDiegoç50000';
		var messageError = 'ID needs to have only digits!';

		var parsedLines = ()=>{transform.parseLinesFromInputFile(contentFromFile)};
		expect(parsedLines).to.throw(Error, messageError);
	});

	it('it should return Error: Not enough line separators!', () =>{
		var contentFromFile = '0011234567891234çDiegoç50000';
		var messageError = 'Number of line separators is wrong! Should be: 3'; 

		var parsedLines = ()=>{transform.parseLinesFromInputFile(contentFromFile)};
		expect(parsedLines).to.throw(Error, messageError);
	});

	it('it should return Error: Document code needs to have only digits!', () =>{
		var contentFromFile = '001ç12345xxx67891234çDiegoç50000';
		var messageError = 'Document code needs to have only digits!';

		var parsedLines = ()=>{transform.parseLinesFromInputFile(contentFromFile)};
		expect(parsedLines).to.throw(Error, messageError);
	});

	it('it should return TypeError: no data received from Extract', () =>{

		var parsedLines = ()=>{transform.parseLinesFromInputFile()};
		expect(parsedLines).to.throw(Error);
	});

});