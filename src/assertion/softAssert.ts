 import assert from 'node:assert';
 import { StrAssert } from '../util/IAssertion.js';
 /**
   * Assertion - A class for performing soft assertions.
   *
   * This class provides methods to perform soft assertions, which do not throw errors immediately
   * but instead collect them and throw them all at once when `softAssertAll` is called.
   *
   */
class MagicAssert implements StrAssert {

      // To hold assertion errors temporarily
      private assertionErrors: { message: string }[] = [];

    /**
     * assert - Check if the actual value is strictly equal to the expected value.
     *
     * ---
     * @param actual {any} - The value for the assertion
     * @param expected {any} - The value to be asserted
     * @param message {object} - Custom message to be displayed if the assertion fails
     *
     * ---
     * To know more about the strick equality works, please refer to the following link: [Strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
     */
    assert = (
      actual: any,
      expected: any,
      message: { page?: string; errorMsg: string }
    ) => {
      if (actual !== expected) {
        this.assertionErrors.push({
          message: `${message}\n Actual - ${actual}\n Expected - ${expected}`,
        });
      }
    };
  
    /**
     * contains - Check if the actual value includes the expected value.
     *
     * ---
     * @param actual {any} - The actual value to be checked.
     * @param expected {any} - The expected value to check for.
     * @param message {string} - The message to be displayed if the assertion fails.
     *
     * ---
     * To know more how includes works, please refer to the following link: [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
     */
    contains = (
      actual: any,
      expected: any,
      message: string
    ) => {
      if (!String(actual).includes(String(expected))) {
        this.assertionErrors.push({
          message: `${message}\n Actual: "${actual}" does not contain "${expected}"`,
        });
      }
    };
  
    /**
     * isTrue - Check if the value is strictly true.
     *
     * @param value {boolean} - The value for the assertion
     * @param message {string} - The message to be displayed if the assertion fails
     */
    isTrue = (value: boolean, message: string) => {
      if (!value) {
        this.assertionErrors.push({
          message: `${message}\n💁🏼 Expected: true, but got: ${value}`,
        });
      }
    };
  
    /**
     * isFalse - Check if the value is strictly false.
     *
     * @param value {boolean} - The value for the assertion
     * @param message {string} - The message to be displayed if the assertion fails
     */
    isFalse = (value: boolean, message: string) => {
      if (value) {
        this.assertionErrors.push({
          message: `${message}\n💁🏼 Expected: false, but got: ${value}`,
        });
      }
    };
  
    /**
     * isNotEqual - Check if the actual value is not equal to the expected value.
     *
     * @param actual {any} - The actual value to be compared.
     * @param expected {any} - The expected value to compare against.
     * @param message {string} - The message to be displayed if the assertion fails.
     */
    isNotEqual = (actual: any, expected: any, message: string) => {
      if (actual === expected) {
        this.assertionErrors.push({
          message: `${message}\n💁🏼 Values were not supposed to be the same. Got: ${actual}`,
        });
      }
    };
  
    /**
     * isGreaterThan - Check if the actual value is greater than the expected value.
     *
     * @param actual {number} - The actual value to be compared.
     * @param expected {number} - The expected value to compare against.
     * @param message {string} - The message to be displayed if the assertion fails.
     */
    isGreaterThan = (actual: number, expected: number, message: string) => {
      if (actual <= expected) {
        this.assertionErrors.push({
          message: `${message}\n💁🏼 ${actual} is not greater than ${expected}`,
        });
      }
    };
  
    /**
     * isLessThan - Check if the actual value is less than the expected value.
     *
     * @param actual {number} - The actual value to be compared.
     * @param expected {number} - The expected value to compare against.
     * @param message {string} - The message to be displayed if the assertion fails.
     */
    isLessThan = (actual: number, expected: number, message: string) => {
      if (actual >= expected) {
        this.assertionErrors.push({
          message: `${message}\n💁🏼 ${actual} is not less than ${expected}`,
        });
      }
    };
  
    /**
     * isNotNull - Check if the value is not null or undefined.
     *
     * @param value {any} - The value to be checked.
     * @param message {string} - The message to be displayed if the assertion fails.
     */
    isNotNull = (value: any, message: string) => {
      if (value === null || value === undefined) {
        this.assertionErrors.push({
          message: `${message}\n💁🏼 Received value is: ${value}. It should not be null or undefined`,
        });
      }
    };
  
    /**
     * Throw error(if any) for all assertions
     */
    assertAll = () => {
      console.log('running', this.assertionErrors);
      if (this.assertionErrors.length > 0) {
        this.printResults();
        this.assertionErrors = [];
      }
    };
  
    /**
     * printResults - A private method to format and throw all collected assertion errors.
     *
     * @private
     * @throws {Error} - Throws an error containing all assertion error messages.
     */
    private printResults = () => {
      const errorMessages = this.assertionErrors
        .map(
          ({ message }: { message: string }, index: number) =>
            `❌ [Assertion ${index + 1}]: \n${message}\n`
        )
        .join('\n');
      assert.fail(
        `Assertion Errors(click to expand Allure report):\n${errorMessages}`
      );
    };
  }
  
export default MagicAssert;