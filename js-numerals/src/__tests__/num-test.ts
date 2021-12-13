import { convertToPhrase } from './../service/convert';
// import {convertToPhrase} from "../index";
import request from "supertest";

test('1 should return one', () => {
    expect(convertToPhrase('1')).toBe("one")
})

test('-1 should return minus one', () => {
    expect(convertToPhrase('-1')).toBe("minus one")
})

test('11 should return eleven', () => {
    expect(convertToPhrase('11')).toBe("eleven")
})

test('55 should return fifty-five', () => {
    expect(convertToPhrase('55')).toBe("fifty-five")
})

test('112 should return one hundred and twelve', () => {
    expect(convertToPhrase('112')).toBe("one hundred and twelve")
})

test('11089 should return eleven thousand and eighty-nine', () => {
    expect(convertToPhrase('11089')).toBe("eleven thousand and eighty-nine")
})

test('1000000 should return invalid', () => {
    expect(convertToPhrase('1000000')).toBe("Invalid number. Please try again")
})

test('-1000000 should return invalid', () => {
    expect(convertToPhrase('-1000000')).toBe("Invalid number. Please try again")
})

test('xy should return invalid input', () => {
    expect(convertToPhrase("xy")).toBe("Invalid input. Please try again")
})
