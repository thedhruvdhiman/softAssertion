import assert from 'node:assert';
import { Assertion } from './helper/IAssertion.js';
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
   * equals - Check if the actual value is strictly equal to the expected value.
   *
   * ---
   * @param actual {any} - The value for the assertion
   * @param expected {any} - The value to be asserted
   * @param message {object} - Custom message to be displayed if the assertion fails
   *
   * ---
   * To know more about the strick equality works, please refer to the following link: [Strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
   */
  equals = (actual: any, expected: any, message: string): void => {
    if (actual !== expected) {
      try {
        throw new Error(
          `[${message}]\nActual: ${actual} is not equal to \nExpected: ${expected}\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
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
    actual: string,
    expected: string,
    message: string,
  ): void => {
    if (!String(actual).includes(String(expected))) {
      try {
        throw new Error(
          `[${message}]\nActual: ${actual} does not contain \nExpected: ${expected}\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * isTrue - Check if the value is strictly true.
   *
   * @param value {boolean} - The value for the assertion
   * @param message {string} - The message to be displayed if the assertion fails
   */
  isTrue = (value: boolean, message: string): void => {
    if (!value) {
      try {
        throw new Error(
          `[${message}]\nActual: ${value}\nExpected: true\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * isFalse - Check if the value is strictly false.
   *
   * @param value {boolean} - The value for the assertion
   * @param message {string} - The message to be displayed if the assertion fails
   */
  isFalse = (value: boolean, message: string): void => {
    if (value) {
      try {
        throw new Error(
          `[${message}]\nActual: ${value}\nExpected: false\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * notEqual - Check if the actual value is not equal to the expected value.
   *
   * @param actual {any} - The actual value to be compared.
   * @param expected {any} - The expected value to compare against.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
  notEqual = (actual: any, expected: any, message: string): void => {
    if (actual === expected) {
      try {
        throw new Error(
          `[${message}]\nActual: ${actual} is supposed to be equal to Expected: ${expected}\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * greaterThan - Check if the actual value is greater than the expected value.
   *
   * @param actual {number} - The actual value to be compared.
   * @param expected {number} - The expected value to compare against.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
  greaterThan = (
    actual: number,
    expected: number,
    message: string,
  ): void => {
    if (actual <= expected) {
      try {
        throw new Error(
          `[${message}]\nActual: ${actual} is not greater than Expected: ${expected}\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * isLessThan - Check if the actual value is less than the expected value.
   *
   * @param actual {number} - The actual value to be compared.
   * @param expected {number} - The expected value to compare against.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
  isLessThan = (
    actual: number,
    expected: number,
    message: string,
  ): void => {
    if (actual >= expected) {
      try {
        throw new Error(
          `[${message}]\nActual: ${actual} is not less than Expected: ${expected}\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * isNotNull - Check if the value is not null.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
  isNotNull = (value: any, message: string): void => {
    if (value === null) {
      try {
        throw new Error(
          `[${message}]\nActual: ${value}\nExpected: not null.\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * isNull - Check if the value is null.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
  isNull = (value: any, message: string): void => {
    if (value !== null) {
      try {
        throw new Error(
          `[${message}]\nActual: ${value}\nExpected: Value should be null\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };
  
  /**
   * isDefined - Check if the value is defined.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
  isDefined = (value: any, message: string): void => {
    if (value === undefined) {
      try {
        throw new Error(
          `[${message}]\nActual: ${value}\nExpected: Value should not be undefined.\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * isUndefined - Check if the value is undefined.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
  isUndefined = (value: any, message: string): void => {
    if (value !== undefined) {
      try {
        throw new Error(
          `[${message}]\nActual: ${value}\nExpected: Value should be undefined.\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * isNumber - Check if the value is a number.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
  isNumber = (value: any, message: string): void => {
    if (typeof value !== 'number') {
      try {
        throw new Error(
          `[${message}]\nActual: Type of ${value} is ${typeof value}\nExpected: Value should be a number.\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
   * isString - Check if the value is a string.
   *
   * @param value {any} - The value to be checked.
   * @param message {string} - The message to be displayed if the assertion fails.
   */
isString = (value: any, message: string): void => {
    if (typeof value !== 'string') {
      try {
        throw new Error(
          `[${message}]\nActual: Type of ${value} is ${typeof value}\nExpected: Value should be a string.\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      console.log(`Assertion passed: ${message}`);
    }
  };

  /**
  * assertAll - Throw error (if any) for all assertions
  */
  assertAll = () => {
    if (this.assertionErrors.length > 0) {
      const errorMessageData: { message: string }[] = this.assertionErrors;
      this.assertionErrors = [];
      throwAssertionErrors(errorMessageData);
    }
  };
}
/**
 * throwAssertionErrors - A standalone function to format and throw all collected assertion errors.
 *
 * @param errorMessageData {Array<{ message: string }>} - Array of assertion error messages.
 * @throws {Error} - Throws an error containing all assertion error messages.
 */
const throwAssertionErrors = (
  errorMessageData: { message: string }[],
): void => {
  const errorMessages = errorMessageData
    .map(
      ({ message }: { message: string }, index: number) =>
        `❌ [Assertion ${index + 1}]: \n${message}\n`,
    )
    .join('\n');
  assert.fail(
    `Assertion errors detected. See details below (expand in Allure report):\n${errorMessages}`,
  );
};
