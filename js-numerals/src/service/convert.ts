import {numPhrases, wholes} from './phrases';

export const convertToPhrase = (number: any ) => {
    let resultArray = [];
    let minus = false;

    if(number == 0){
        return "zero";
    }


    // Validation check. The number should be between -999999 and 999999 and not a letter.
    if(number > 999999 || number < -999999) return "Invalid number. Please try again";

    const isNumber = (n: any): boolean => {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    }


    if(!isNumber(number)) return "Invalid input. Please try again";

    if(number < 0){
        number = -number;
        minus = true;
    }

    let toHundred = zeroToHundredFunc(number % 100);

    if(toHundred) resultArray.unshift(toHundred);

}


const zeroToHundredFunc = (number: number) => {

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
