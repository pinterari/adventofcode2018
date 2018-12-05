"use strict"


// part 1
function countPolymerUnits(input) {
	
	var lowUpDiff = 32; // difference between lowercase and uppercase char codes

	do {
		var changed = false;
		for(var i = 1; i < input.length; i++) {
			if(Math.abs(input[i-1].charCodeAt(0) - input[i].charCodeAt(0)) === lowUpDiff) {
				input = input.replace(input.substring(i-1, i+1), "");
				changed = true;
				break;
			}
		}
	} while(changed);

	return input.length;
} 

// part 2
function findBestPolymer(originalInput) {

	var lowUpDiff = 32; // difference between lowercase and uppercase char codes

	var aCode = 65; //A - 97
	var zCode = 90; //Z - 122

	var lengths = new Map();

	for(var j = aCode; j < zCode + 1; j++) {

		var input = originalInput;

		input = input.split(String.fromCharCode(j)).join('');
		input = input.split(String.fromCharCode(j + lowUpDiff)).join('');

		var finalLength = countPolymerUnits(input);
		lengths.set(j, finalLength);
	}

	var min = lengths.get(aCode);
	for(let pair of lengths) {
		if(pair[1] < min) {
			min = pair[1];
		}
	}

	return min;
} 
