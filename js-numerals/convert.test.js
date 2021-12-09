const convert = require('./service/convert');


test('1 should return one', () => {
    expect(convert.convertToPhrase(1)).toBe("one")
})

test('-1 should return minus one', () => {
    expect(convert.convertToPhrase(-1)).toBe("minus one")
})

test('11 should return eleven', () => {
    expect(convert.convertToPhrase(11)).toBe("eleven")
})

test('55 should return fifty-five', () => {
    expect(convert.convertToPhrase(55)).toBe("fifty-five")
})

test('112 should return one hundred and twelve', () => {
    expect(convert.convertToPhrase(112)).toBe("one hundred and twelve")
})

test('1100 should return eleven hundred', () => {
    expect(convert.convertToPhrase(1100)).toBe("eleven hundred")
})

test('11089 should return eleven thousand and eighty-nine', () => {
    expect(convert.convertToPhrase(11089)).toBe("eleven thousand and eighty-nine")
})

test('1000000 should return invalid', () => {
    expect(convert.convertToPhrase(1000000)).toBe("Invalid number. Please try again")
})

test('-1000000 should return invalid', () => {
    expect(convert.convertToPhrase(-1000000)).toBe("Invalid number. Please try again")
})

test('xy should return invalid input', () => {
    expect(convert.convertToPhrase("xy")).toBe("Invalid input. Please try again")
})
