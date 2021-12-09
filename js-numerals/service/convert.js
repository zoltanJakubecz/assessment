const Phrases = require("./phrases");
const numPhrases = Phrases.numPhrases;
const wholes = Phrases.wholes;

const convertToPhrase = (number) => {
    let res = [];
    let minus = false;
    
    if(number == 0){
        return "zero";
    }

    // Validation check. The number should be between -999999 and 999999 and not a letter.
    if(number > 999999 || number < -999999) return "Invalid number. Please try again";

    const isNumber = (n) => { 
        return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
    }

 
    
    if(!isNumber(number)) return "Invalid input. Please try again";

    if(number < 0){
        number = -number;
        minus = true;
    }
    
    let toHundred = zeroToHundredFunc(number % 100);
    if(toHundred) res.unshift(toHundred);
    
    
    let hundredsToConvert = number / 10000 >= 1 ? Math.floor(number / 100) % 10 : Math.floor(number / 100) % 100;
    
    if(hundredsToConvert){
        if(toHundred) res.unshift("and");
        res.unshift(hundreds(hundredsToConvert) + wholes[0]);
    }

    let thousendConvert = Math.floor(number / 1000) % 1000;
    if(thousendConvert){
        if(toHundred && !hundredsToConvert) res.unshift("and");
        if(thousendConvert > 9) res.unshift(thousends(thousendConvert) + wholes[1]);
    }
    
    
    if(minus) res.unshift("minus");
    return res.join(" ");
}


const zeroToHundredFunc = (number) => {

    let result = 
        // one digit 
            number / 10 < 1 ? numPhrases[number][0] :
        // between 10 and 20 spacial named numbers
            number % 10 > 0 && numPhrases[number % 10][1] && number < 20 ? numPhrases[number % 10][1] :

            number > 13 && number < 20 ? numPhrases[number % 10][0] + "teen" :
        // above 19
            numPhrases[Math.floor(number / 10)][2] ? numPhrases[Math.floor(number / 10)][2] : numPhrases[Math.floor(number / 10)][0] + "ty";

    if(number % 10 > 0 && number > 20){
        result += "-" + numPhrases[number % 10][0];
    }

    return result;
}


const hundreds = (number) => {
    return zeroToHundredFunc(number);
}

const thousends = (number) => {
    let result = [];

    let toHundred = zeroToHundredFunc(number % 100);
    if(toHundred) result.unshift(toHundred);

    let hundredsToConvert = Math.floor(number / 100) % 10;
    
    if(hundredsToConvert){
        if(toHundred) result.unshift("and");
        result.unshift(hundreds(hundredsToConvert) + wholes[0]);
    }
    return result.join(" ");
}

exports.convertToPhrase = convertToPhrase;