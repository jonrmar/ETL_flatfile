'use strict';

const extract = require('./extract/extract.js');
const transform = require('./transform/transform.js');
const load = require('./load/writefile.js');
const fileValidator = require('./filevalidator.js')
const fs = require('fs');
const Log = require('log');
const log = new Log('info', fs.createWriteStream('etl.log'));

//const inputFilePath = __dirname+'/../data/in/test.dat';
//const outputFilePath = __dirname+'/../data/out/test.done.dat';

function flatFileResumer(inputFilePath, outputFilePath) {
	try{
		if(fileValidator.fileValidation(inputFilePath)){
			var contentFromFileRead = extract.readInputFile(inputFilePath);

			var resumedFileStruct = transform.transformFlatFile(contentFromFileRead);		
			
			load.writeFileInOutputFolder(outputFilePath, resumedFileStruct);
		}
	}catch(err){
		log.error(err);
	}
		
}

module.exports.flatFileResumer = flatFileResumer;