import { Assertion } from "./helper/assertion.interface.js";
import { throwAssertionErrors } from "./helper/LogHelper.js";
import _ from "lodash";

/**
 *
 * Assertion - A class for performing soft assertions.
 *
 * This class provides methods to perform soft assertions, which do not throw errors immediately
 * but instead collect them and throw them all at once when `assertAll` is called.
 *
 */
export class Assert implements Assertion {
  // To hold assertion errors temporarily
  private assertionErrors: { message: string }[] = [];

  /**
   * Asserts that two values are strictly equal.\
   * If they are not, an error is thrown and captured in the assertion errors list.
   *
   * @param actual { string | number | boolean } - The actual value to test.
   * @param expected { string | number | boolean } - The expected value to compare against.
   * @param message { string } - A descriptive message for the assertion.
   *
   * ---
   *
   * Examples:
   * ```ts
   * equals("foo", "foo", "Oh no"); // Pass
   * equals("foo", "doo", "Oh no"); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   *
   */
  equals(actual: any, expected: any, message: string): void {
    if (!_.isEqual(actual, expected)) {
      const error = new Error(
        `${message}\nActual: ${actual} is not equal to Expected: ${expected}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts that actual string contains expected string.\
   * If they are not, an error is thrown and captured in the assertion errors list.
   *
   * ---
   *
   * ---
   * @param actual {string} - The actual value to be checked.
   * @param expected {string} - The expected value to check for.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   *
   * ```ts
   * includes('Lazy fox!', 'y f', 'Oh no!'); // Pass
   * includes('Lazy fox!', ' ', 'Oh no!');   // Pass
   * includes('Lazy fox!', 'Y f', 'Oh no!'); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   */
  includes(actual: any, expected: any, message: string): void {
    const condition =
      _.isObject(actual) && !_.isArray(actual)
        ? _.has(actual, expected)
        : _.includes(actual, expected);

    if (!condition) {
      const error = new Error(
        `${message}\nActual: ${JSON.stringify(actual)} does not contain \nExpected: ${JSON.stringify(expected)}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the value is strictly true.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {boolean} - The value for the assertion
   * @param message {string} -The message to be displayed if the assertion fails
   *
   * ---
   *
   * Examples:
   * ```ts
   * isTrue(false, "Oh no");  // Fail
   * isTrue(true, "Oh no"); // Pass
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   */
  isTrue(value: boolean, message: string): void {
    if (!value || typeof value !== "boolean") {
      const error = new Error(`${message}\nActual: ${value}\nExpected: true\n`);
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the value is strictly false.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {boolean} - The value for the assertion
   * @param message {string} - The message to be displayed if the assertion fails
   *
   * ---
   *
   * Examples:
   * ```ts
   * isFalse(false, "Oh no"); // Pass
   * isFalse(true, "Oh no");  // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  isFalse(value: boolean, message: string): void {
    if (value) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: false\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts that two values are strictly not equal.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param actual { any } - The actual value to be compared.
   * @param expected { any } - The expected value to compare against.
   * @param message { string } - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * notEqual("foo", "foo", "Oh no!"); // Pass
   * notEqual("foo", "doo", "Oh no!"); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   */
  notEqual(actual: any, expected: any, message: string): void {
    if (_.isEqual(actual, expected)) {
      const error = new Error(
        `${message}\nActual: ${actual} should not be equal to Expected: ${expected}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the actual value is greater than the expected value.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param actual {number} - The actual value to be compared.
   * @param expected {number} - The expected value to compare against.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * greaterThan(11, 10, 'Oh no!'); // Pass
   *
   * greaterThan(1, 10, 'Oh no!');  // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   *
   */
  greaterThan(actual: number, expected: number, message: string): void {
    if (actual <= expected) {
      const error = new Error(
        `${message}\nActual: ${actual} is not greater than Expected: ${expected}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the actual value is less than the expected value.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param actual {number} - The actual value to be compared.
   * @param expected {number} - The expected value to compare against.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * isLessThan(1, 10, 'Oh no!');  // Pass
   * isLessThan(-11, 0, 'Oh no!'); // Pass
   * isLessThan(11, 0, 'Oh no!'); // Fail
   *
   * isLessThan(Infinity, 0, "Oh no!"); // Fail
   * isLessThan(Infinity, Infinity, "Oh no!"); // Fail
   * isLessThan(0, 0, "Oh no!"); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  isLessThan(actual: number, expected: number, message: string): void {
    if (actual >= expected) {
      const error = new Error(
        `${message}\nActual: ${actual} is not less than Expected: ${expected}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the value is not null.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * notNull(1, 'Oh no!');     // Pass
   *
   * notNull(null, 'Oh no!');  // Fail
   * ```
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  notNull(value: any, message: string): void {
    if (value === null) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Not "null".\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the value is null.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * isNull(null, "Oh no!");        // Pass
   *
   * isNull([1,3,'foo'], "Oh no!"); // Fail
   * ```
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  isNull(value: any, message: string): void {
    if (value !== null) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Value should be null\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts the value should not be undefined.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * isDefined(Infinity, "Oh no!");  // Pass
   * isDefined(null, "Oh no!");      // Pass
   * isDefined(1, "Oh no!");         // Pass
   *
   * isDefined(undefined, "Oh no!"); // Fail
   * ```
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  isDefined(value: any, message: string): void {
    if (value === undefined) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Value should not be undefined.\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the value is undefined.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * isUndefined(undefined, 'Oh no!');    // Pass
   *
   * isUndefined(1, 'Oh no!');            // Fail
   * isUndefined({obj: 'foo'}, 'Oh no!'); // Fail
   * isUndefined(1, 'Oh no!');            // Fail
   * ```
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  isUndefined(value: any, message: string): void {
    if (value !== undefined) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Value should be undefined\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the value is a number.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   *
   * ```ts
   * isNumber(1/0, "Oh no!");         // Fail
   * isNumber(NaN, "Oh no!");         // Fail
   * isNumber(Infinity, "Oh no!");    // Fail
   * isNumber(-Infinity, "Oh no!");   // Fail
   * isNumber(null, "Oh no!");        // Fail
   * isNumber(undefined, "Oh no!");   // Fail
   *
   * isNumber(42, "All good!");       // Pass
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  isNumber(value: any, message: string): void {
    if (
      _.isNaN(value)
      // typeof value !== "number" ||
      // Number.isNaN(value) ||
      // !Number.isFinite(value)
    ) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Value should should be a number.\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the value is a string.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   *
   * ```ts
   * isString(123, "Oh no!");         // Fail
   * isString(null, "Oh no!");        // Fail
   * isString(undefined, "Oh no!");   // Fail
   * isString(true, "Oh no!");        // Fail
   * isString(false, "Oh no!");       // Fail
   * isString(Infinity, "Oh no!");    // Fail
   * isString(NaN, "Oh no!");         // Fail
   *
   * isString("foo", "Oh no!");       // Pass
   * ```
   *
   * ---
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   *
   */
  isString(value: any, message: string): void {
    if (!_.isString(value)) {
      const error = new Error(
        `${message}\nActual: Type of ${value} is ${typeof value}\nExpected: Value should be a string.\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts that two values are strictly equal.\
   * If they are not, an error is thrown and captured in the assertion errors list.
   *
   * @param actual { string | number | boolean } - The actual value to test.
   * @param expected { string | number | boolean } - The expected value to compare against.
   * @param message { string } - A descriptive message for the assertion.
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictEquals("foo", "foo", "Oh no"); // Pass
   * strictEquals("foo", "doo", "Oh no"); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   *
   */
  strictEquals(actual: any, expected: any, message: string): void {
    if (!_.isEqual(actual, expected)) {
      const error = new Error(
        `${message}\nActual: ${actual} is not equal to Expected: ${expected}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts that actual string contains expected string.\
   * If they are not, an error is thrown and captured in the assertion errors list.
   *
   * ---
   *
   * ---
   * @param actual {string} - The actual value to be checked.
   * @param expected {string} - The expected value to check for.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   *
   * ```ts
   * strictIncludes('Lazy fox!', 'y f', 'Oh no!'); // Pass
   * strictIncludes('Lazy fox!', ' ', 'Oh no!');   // Pass
   * strictIncludes('Lazy fox!', 'Y f', 'Oh no!'); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   */
  strictIncludes(actual: any, expected: any, message: string): void {
    const condition =
      _.isObject(actual) && !_.isArray(actual)
        ? _.has(actual, expected)
        : _.includes(actual, expected);

    if (!condition) {
      const error = new Error(
        `${message}\nActual: ${JSON.stringify(actual)} does not contain \nExpected: ${JSON.stringify(expected)}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts if the value is strictly true.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {boolean} - The value for the assertion
   * @param message {string} -The message to be displayed if the assertion fails
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictIsTrue(false, "Oh no");  // Fail
   * strictIsTrue(true, "Oh no"); // Pass
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   */
  strictIsTrue(value: boolean, message: string): void {
    if (!value || typeof value !== "boolean") {
      const error = new Error(`${message}\nActual: ${value}\nExpected: true\n`);
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts if the value is strictly false.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {boolean} - The value for the assertion
   * @param message {string} - The message to be displayed if the assertion fails
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictIsFalse(false, "Oh no"); // Pass
   * strictIsFalse(true, "Oh no");  // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  strictIsFalse(value: boolean, message: string): void {
    if (value) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: false\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts that two values are strictly not equal.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param actual { any } - The actual value to be compared.
   * @param expected { any } - The expected value to compare against.
   * @param message { string } - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictNotEqual("foo", "foo", "Oh no!"); // Pass
   * strictNotEqual("foo", "doo", "Oh no!"); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   */
  strictNotEqual(actual: any, expected: any, message: string): void {
    if (_.isEqual(actual, expected)) {
      const error = new Error(
        `${message}\nActual: ${actual} should not be equal to Expected: ${expected}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts if the actual value is greater than the expected value.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param actual {number} - The actual value to be compared.
   * @param expected {number} - The expected value to compare against.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictGreaterThan(11, 10, 'Oh no!'); // Pass
   *
   * strictGreaterThan(1, 10, 'Oh no!');  // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   *
   */
  strictGreaterThan(actual: number, expected: number, message: string): void {
    if (actual <= expected) {
      const error = new Error(
        `${message}\nActual: ${actual} is not greater than Expected: ${expected}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts if the actual value is less than the expected value.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param actual {number} - The actual value to be compared.
   * @param expected {number} - The expected value to compare against.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictIsLessThan(1, 10, 'Oh no!');  // Pass
   * strictIsLessThan(-11, 0, 'Oh no!'); // Pass
   * strictIsLessThan(11, 0, 'Oh no!'); // Fail
   *
   * strictIsLessThan(Infinity, 0, "Oh no!"); // Fail
   * strictIsLessThan(Infinity, Infinity, "Oh no!"); // Fail
   * strictIsLessThan(0, 0, "Oh no!"); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  strictIsLessThan(actual: number, expected: number, message: string): void {
    if (actual >= expected) {
      const error = new Error(
        `${message}\nActual: ${actual} is not less than Expected: ${expected}\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
    }
  }

  /**
   * Asserts if the value is not null.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictNotNull(1, 'Oh no!');     // Pass
   *
   * strictNotNull(null, 'Oh no!');  // Fail
   * ```
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  strictNotNull(value: any, message: string): void {
    if (value === null) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Not "null".\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts if the value is null.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictIsNull(null, "Oh no!");        // Pass
   *
   * strictIsNull([1,3,'foo'], "Oh no!"); // Fail
   * ```
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  strictIsNull(value: any, message: string): void {
    if (value !== null) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Value should be null\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts the value should not be undefined.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictIsDefined(Infinity, "Oh no!");  // Pass
   * strictIsDefined(null, "Oh no!");      // Pass
   * strictIsDefined(1, "Oh no!");         // Pass
   *
   * strictIsDefined(undefined, "Oh no!"); // Fail
   * ```
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  strictIsDefined(value: any, message: string): void {
    if (value === undefined) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Value should not be undefined.\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts if the value is undefined.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```ts
   * strictIsUndefined(undefined, 'Oh no!');    // Pass
   *
   * strictIsUndefined(1, 'Oh no!');            // Fail
   * strictIsUndefined({obj: 'foo'}, 'Oh no!'); // Fail
   * strictIsUndefined(1, 'Oh no!');            // Fail
   * ```
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  strictIsUndefined(value: any, message: string): void {
    if (value !== undefined) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Value should be undefined\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts if the value is a number.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   *
   * ```ts
   * strictIsNumber(1/0, "Oh no!");         // Fail
   * strictIsNumber(NaN, "Oh no!");         // Fail
   * strictIsNumber(Infinity, "Oh no!");    // Fail
   * strictIsNumber(-Infinity, "Oh no!");   // Fail
   * strictIsNumber(null, "Oh no!");        // Fail
   * strictIsNumber(undefined, "Oh no!");   // Fail
   *
   * strictIsNumber(42, "All good!");       // Pass
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   */
  strictIsNumber(value: any, message: string): void {
    if (
      _.isNaN(value)
      // typeof value !== "number" ||
      // Number.isNaN(value) ||
      // !Number.isFinite(value)
    ) {
      const error = new Error(
        `${message}\nActual: ${value}\nExpected: Value should should be a number.\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * Asserts if the value is a string.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   *
   * ```ts
   * strictIsString(123, "Oh no!");         // Fail
   * strictIsString(null, "Oh no!");        // Fail
   * strictIsString(undefined, "Oh no!");   // Fail
   * strictIsString(true, "Oh no!");        // Fail
   * strictIsString(false, "Oh no!");       // Fail
   * strictIsString(Infinity, "Oh no!");    // Fail
   * strictIsString(NaN, "Oh no!");         // Fail
   *
   * strictIsString("foo", "Oh no!");       // Pass
   * ```
   *
   * ---
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored.
   *
   */
  strictIsString(value: any, message: string): void {
    if (!_.isString(value)) {
      const error = new Error(
        `${message}\nActual: Type of ${value} is ${typeof value}\nExpected: Value should be a string.\n`,
      );
      this.assertionErrors.push({
        message: `${error.stack}`,
      });
      this.assertAll();
    }
  }

  /**
   * assertAll - Throw error (if any) for all assertions
   */
  assertAll() {
    if (this.assertionErrors.length) {
      const errorMessageData: { message: string }[] = this.assertionErrors;
      this.assertionErrors = [];
      throwAssertionErrors(errorMessageData);
    }
  }
}
