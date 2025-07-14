import { Assertion } from "./helper/IAssertion.js";
import { throwAssertionErrors } from "./helper/LogHelper.js";

/**
 *
 * Assertion - A class for performing soft assertions.
 *
 * This class provides methods to perform soft assertions, which do not throw errors immediately
 * but instead collect them and throw them all at once when `assertAll` is called.
 *
 */
export class MagicAssert implements Assertion {
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
   * ```
   * // String comparison
   * equals("foo", "foo", "Oh no"); // Pass
   * equals("foo", "doo", "Oh no"); // Fail
   *
   * // number comparison
   * equals(1, 1, "Oh no"); // Pass
   * equals(1, 2, "Oh no"); // Fail
   *
   * // boolean
   * equals(true, true, "Oh no"); // Pass
   * equals(false, false, "Oh no"); // Pass
   * equals(false, true, "Oh no"); // Fail
   * equals(true, false, "Oh no"); // Fail
   * ```
   *
   * Comparison between two different types is not allowed, type for both actual and expected paramaters should match.
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   *
   */
  equals<T = string | number | boolean>(
    actual: T,
    expected: T,
    message: string
  ): void {
    try {
      if (Number.isNaN(actual) && Number.isNaN(expected)) return;
      if (actual == null && expected == null) return;
      if (typeof actual !== typeof expected) {
        throw new Error(
          `Type for actual: ${typeof actual} does not match expected: ${typeof expected}`
        );
      }
      if (actual !== expected) {
        throw new Error(
          `${message}\nActual: ${actual} is not equal to \nExpected: ${expected}\n`
        );
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
      });
    }
  }

  /**
   * Asserts that actual string contains expected string.\
   * If they are not, an error is thrown and captured in the assertion errors list.
   *
   * ---
   *
   * Case sensitive, resulting 'A' and 'a' will not be treated as same.\
   * \
   * Invisible character [Unicode: " " (U+2800)] will result in failure.
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
   * ```
   * includes('Lazy fox!', 'y f', 'Oh no!'); // Pass
   * includes('Lazy fox!', ' ', 'Oh no!');   // Pass
   * 
   * includes('Lazy fox!', 'Y f', 'Oh no!'); // Fail
   * ```
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   */
  includes(actual: string, expected: string, message: string): void {
    try {
      if (!actual.includes(expected)) {
        throw new Error(
          `${message}\nActual: ${actual} does not contain \nExpected: ${expected}\n`
        );
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
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
   * ```
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
    try {
      if (value === true) {
        throw new Error(`${message}\nActual: ${value}\nExpected: true\n`);
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
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
   * ```
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
    if (value === true) {
      try {
        throw new Error(`${message}\nActual: ${value}\nExpected: false\n`);
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: `${errorMsg.stack}`,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  }

  /**
   * Asserts that two values are strictly not equal.\
   * If condition is failed, an error is thrown and captured in the assertion errors list.
   *
   * @param actual { string | number | boolean } - The actual value to be compared.
   * @param expected { string | number | boolean } - The expected value to compare against.
   * @param message { string } - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```
   * // String comparison
   * notEqual("foo", "foo", "Oh no!"); // Pass
   * notEqual("foo", "doo", "Oh no!"); // Fail
   *
   * // number comparison
   * notEqual(1, 1, "Oh no!"); // Pass
   * notEqual(1, 2, "Oh no!"); // Fail
   *
   * // boolean comparison
   * notEqual(true, false, "Oh no"); // Pass
   * notEqual(true, true, "Oh no"); // Fail
   * ```
   * Comparison between two different types is not allowed, type for both actual and expected paramaters should match.
   *
   * ---
   *
   * ### Case
   * - Pass: No error would be stored.
   * - Fail: Assertion error will be stored
   */
  notEqual<T = string | number | boolean>(
    actual: T,
    expected: T,
    message: string
  ): void {
    try {
      if (typeof actual !== typeof expected) {
        throw new Error(
          `Type for actual: ${typeof actual} does not match expected: ${typeof expected}`
        );
      }
      if (actual === expected) {
        throw new Error(
          `${message}\nActual: ${actual} should not be equal to Expected: ${expected}\n`
        );
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
      });
    }
  }

  /**
   * Asserts if the actual value is greater than the expected value.\
   * If condition if failed, an error is thrown and captured in the assertion errors list.
   *
   * @param actual {number} - The actual value to be compared.
   * @param expected {number} - The expected value to compare against.
   * @param message {string} - The message to be displayed if the assertion fails.
   *
   * ---
   *
   * Examples:
   * ```
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
   */
  greaterThan(actual: number, expected: number, message: string): void {
    if (actual <= expected) {
      try {
        throw new Error(
          `${message}\nActual: ${actual} is not greater than Expected: ${expected}\n`
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: `${errorMsg.stack}`,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
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
   * ```
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
    try {
      if (actual >= expected) {
        throw new Error(
          `${message}\nActual: ${actual} is not less than Expected: ${expected}\n`
        );
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
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
   * ```
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
    try {
      if (value === null) {
        throw new Error(
          `${message}\nActual: ${value}\nExpected: Not "null".\n`
        );
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
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
   * ```
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
    try {
      if (value !== null) {
        throw new Error(
          `${message}\nActual: ${value}\nExpected: Value should be null\n`
        );
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
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
   * ```
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
      try {
        throw new Error(
          `${message}\nActual: ${value}\nExpected: Value should not be undefined.\n`
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: `${errorMsg.stack}`,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
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
   * ```
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
    try {
      if (value !== undefined) {
        throw new Error(
          `${message}\nActual: ${value}\nExpected: Value should be undefined\n`
        );
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
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
   * ```
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
    try {
      if (
        typeof value !== "number" ||
        Number.isNaN(value) ||
        !Number.isFinite(value)
      ) {
        throw new Error(
          `${message}\nActual: ${value}\nExpected: Value should should be a number.\n`
        );
      }
    } catch (error) {
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message: `${errorMsg.stack}`,
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
   * ```
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
    if (typeof value !== "string") {
      try {
        throw new Error(
          `${message}\nActual: Type of ${value} is ${typeof value}\nExpected: Value should be a string.\n`
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: `${errorMsg.stack}`,
        });
      }
    }
  }

  /**
   * assertAll - Throw error (if any) for all assertions
   */
  assertAll() {
    if (this.assertionErrors.length > 0) {
      const errorMessageData: { message: string }[] = this.assertionErrors;
      this.assertionErrors = [];
      throwAssertionErrors(errorMessageData);
    }
  }
}
