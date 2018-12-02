// --- Day 2: Inventory Management System ---

"use strict"

/**
To make sure you didn't miss any, you scan the likely candidate boxes again, counting the number that have an ID containing exactly two of any letter 
and then separately counting those with exactly three of any letter. You can multiply those two counts together to get a rudimentary checksum and compare it 
to what your device predicts.

For example, if you see the following box IDs:

abcdef contains no letters that appear exactly two or three times.
bababc contains two a and three b, so it counts for both.
abbcde contains two b, but no letter appears exactly three times.
abcccd contains three c, but no letter appears exactly two times.
aabcdd contains two a and two d, but it only counts once.
abcdee contains two e.
ababab contains three a and three b, but it only counts once.

Of these box IDs, four of them contain a letter which appears exactly twice, and three of them contain a letter which appears exactly three times. 
Multiplying these together produces a checksum of 4 * 3 = 12.

What is the checksum for your list of box IDs?
*/
function checkBoxes(array) {

	var numberOfDoubles = 0;
	var numberOfTriples = 0;

	for(var i in array) {
		var letters = array[i].split("");
		var letterMap = new Map();

		for(var j in letters) {
			putInMap(letterMap, letters[j]);
		}
		
		var foundDouble = false;
		var foundTriple = false;

		for(let pair of letterMap) {
    		if(pair[1] === 2 && !foundDouble) {
    			numberOfDoubles += 1;
    			foundDouble = true;
    		}
    		else if(pair[1] === 3 && !foundTriple) {
    			numberOfTriples += 1;
    			foundTriple = true;
    		}
		}
	}

	return numberOfDoubles * numberOfTriples;
}

function putInMap(map, element) {	
	var count = map.has(element) ? map.get(element) + 1 : 1;
	map.set(element, count);
	return count;
}

/**
--- Part Two ---
Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). 
However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
*/

function findDifference(array) {
	for(var i in array) {

		var splittedFirst = array[i].split("");

		for(var j = parseInt(i) + 1; j < array.length; j++) {
			var splittedSecond = array[j].split("");

			var index = parseInt(checkSameChar(splittedFirst, splittedSecond));
			if(index != -1) {
				splittedFirst.splice(index, 1);
				return splittedFirst.join('');
			}
		}
	}
}

function checkSameChar(splittedFirst, splittedSecond) {
	var difference = 0;
	var index;
	for(var k in splittedFirst) {
		if(splittedFirst[k] != splittedSecond[k]) {
			index = k;
			difference++;
		}
		if(difference > 1) {
			return -1;
		}
	}
	return index;
}