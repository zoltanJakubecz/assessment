export const convertToPhrase = (number: number) => {
    let res = [];
    let minus = false;

    if(number == 0){
        return "zero";
    }

    console.log("HELLY");

    // Validation check. The number should be between -999999 and 999999 and not a letter.
    if(number > 999999 || number < -999999) return "Invalid number. Please try again";

    const isNumber = (n: any) => {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    }
}
