"use strict"

function findAsleepGuard(array){
    
    array = array.sort();

    var guardMinutes = new Map();

    var lastGuard = null;
    var fallsAsleep = null;

    for(var i in array) {

        var minute = parseInt(array[i].substr(15,17));      

        if(array[i].includes("begins shift")) {
            
            var id = array[i].substr(26).match(/\d+/)[0];
            lastGuard = id;

            if(!guardMinutes.has(id)) {
                guardMinutes.set(id, []);
            }

        } else if(array[i].includes("wakes up")) {
            
            for(var j = fallsAsleep; j < minute; j++) {
                guardMinutes.set(lastGuard, guardMinutes.get(lastGuard).concat(j));
            }
            fallsAsleep = null;

        } else if(array[i].includes("falls asleep")) {
            fallsAsleep = minute;
        }
    }

    var maxId = null;
    var maxValue = -1;
    for(let pair of guardMinutes) {
        if(pair[1].length > maxValue) {
            maxValue = pair[1].length;
            maxId = pair[0];
        }
    }

    var minute = mostAsleep(guardMinutes.get(maxId));
    return parseInt(maxId) * parseInt(minute);
} 

function mostAsleep(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}

function mostFrequentMinute(array){
    
    array = array.sort();

    var minutesWhereGuardsSleep = new Map();

    var lastGuard = null;
    var fallsAsleep = null;

    for(var i in array) {

        var minute = parseInt(array[i].substr(15,17));     

        if(array[i].includes("begins shift")) {
            var id = array[i].substr(26).match(/\d+/)[0];
            lastGuard = id;

        } else if(array[i].includes("wakes up")) {

             for(var j = fallsAsleep; j < minute; j++) {
                if(!minutesWhereGuardsSleep.has(j)) {
                    minutesWhereGuardsSleep.set(j, []);
                }

                minutesWhereGuardsSleep.set(j, minutesWhereGuardsSleep.get(j).concat(lastGuard));
            }

            fallsAsleep = null;

        } else if(array[i].includes("falls asleep")) {
            fallsAsleep = minute;
        }
    }

    var maxMinute = null;
    var maxFreq = -1;
    var maxId = null;
    for(let pair of minutesWhereGuardsSleep) {
        var mostAsleepGuardId = mostAsleep(pair[1]);
        var count = pair[1].filter(function(x){return x == mostAsleepGuardId}).length;

        if(count > maxFreq) {
            maxFreq = count;
            maxMinute = pair[0];
            maxId = mostAsleepGuardId;
        }    
    }

    return parseInt(maxId) * parseInt(maxMinute);
} 