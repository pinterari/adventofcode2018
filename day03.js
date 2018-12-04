"use strict"

function claimFabric(array) {

	var map = new Map();

	for(var i in array) {

		var parts = array[i].split(/[#@:]/).filter(function(e) {return e.length > 0});
		parts = parts.map(s => s.trim());
		
		var position = parts[1].split(',');
		var fromLeft = parseInt(position[0]);
		var fromTop = parseInt(position[1]);

		var size = parts[2].split('x');
		var width = parseInt(size[0]);
		var height = parseInt(size[1]);

		for(var j = fromTop; j < fromTop + height; j++) {
		    for(var k = fromLeft; k < fromLeft + width; k++) {
		        var id = k + "x" + j;
		        if(map.has(id)) {
		        	map.set(id, map.get(id) + 1);
		        } else {
		        	map.set(id, 1);
		        }
		    }
		}
	}

	var sum = 0;
	for(let pair of map) {
		if(pair[1] > 1) {
			sum++;
		}
	}

	return sum;
}

function getOverlappingClaim(array) {

	var map = new Map();

	const overlap = new Set();
	const claimIds = new Set();

	for(var i in array) {

		var parts = array[i].split(/[#@:]/).filter(function(e) {return e.length > 0});
		parts = parts.map(s => s.trim());

		var claimId = parts[0];
		claimIds.add(claimId);
		
		var position = parts[1].split(',');
		var fromLeft = parseInt(position[0]);
		var fromTop = parseInt(position[1]);

		var size = parts[2].split('x');
		var width = parseInt(size[0]);
		var height = parseInt(size[1]);

		for(var j = fromTop; j < fromTop + height; j++) {
		    for(var k = fromLeft; k < fromLeft + width; k++) {
		        var id = k + "x" + j;

		        if(!map.has(id)) {
		        	map.set(id, []);
		        }

		        map.set(id, map.get(id).concat(claimId));

				if(map.get(id).length > 1) {
		        	map.get(id).forEach((i) => overlap.add(i));
		        }
		    }
		}
	}

	for (const id of claimIds) {
  		if (!overlap.has(id)) {
    		return id;
    	}
  	}

}