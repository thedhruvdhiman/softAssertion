import chalk from 'chalk';
import assert from 'node:assert';
import { screenshot } from '../utils/driverUtils';
import { log } from '../utils/io';

/**
 * throwAssertionErrors - A private method to format and throw all collected assertion errors.
 *
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

const captureScreenshot = async () => {
  await screenshot();
};

/**
 * oeaAssertion - A singleton class for performing soft and hard assertions.
 *
 * ---
 *
 * Soft assertions collect errors and throw them all at once when `assertAll` is called.
 * Hard assertions throw immediately on failure, followed by other soft assertions errors.
 *
 * ---
 *
 * Usage:
 *   ```
 *   this.assertion.isTrue(value, "Element name");
 *   this.assertion.assertAll();
 *   ```
 *  ---
 *
 *   **<i>NOTE</i>**: <i>Class should import base class to use the functionality.</i>
 */
class AssertionLibrary {
  // To hold assertion errors temporarily
  private assertionErrors: { message: string }[] = [];

  // Hold instance of the object.
  private static instance: AssertionLibrary | undefined;

  /**
   * Returns the singleton instance of AssertionLibrary.
   * If the instance does not exist, it creates a new one.
   *
   * @returns {AssertionLibrary} The singleton instance.
   */
  static getInstance(): AssertionLibrary {
    if (!AssertionLibrary.instance) {
      AssertionLibrary.instance = new AssertionLibrary();
    }
    return AssertionLibrary.instance;
  }

  /**
   * softEquals - Check if the actual value is strictly equal to the expected value.*
   *
   * ---
   *
   * @param {any} actual - The value for the assertion
   * @param {any} expected - The value to be asserted
   * @param {string} outputMessage - What is the element supposed to be visible?
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   * ---
   *
   * To know more about how strict equality works, please refer to the following link: [Strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
   *
   */
  softEquals = (actual: any, expected: any, outputMessage: string): void => {
    if (actual !== expected) {
      try {
        log.error(`softEquals failed: ${outputMessage}`);
        throw new Error(
          `[softEquals - Element: <<${outputMessage}>>]\nActual: <<${actual}>> is not equal to \nExpected: <<${expected}>>\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        captureScreenshot();
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      log.info(`softEquals passed: ${outputMessage}`);
    }
  };

  /**
   * softContains - Check if the actual value includes the expected value.
   *
   * ---
   *
   * @param {string} actual - The actual value to be checked.
   * @param {string} expected - The expected value to check for.
   * @param {string} outputMessage - What is the element supposed to be visible?
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   * To know more how includes works, please refer to the following link: [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
   *
   */
  softContains = (
    actual: string,
    expected: string,
    outputMessage: string,
  ): void => {
    if (!String(actual).includes(String(expected))) {
      try {
        log.error(`softContains failed: ${outputMessage}`);
        throw new Error(
          `[softContains - Element: <<${outputMessage}>>]\nActual: <<${actual}>> does not contain \nExpected: <<${expected}>>\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        captureScreenshot();
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      log.info(`softContains passed: ${outputMessage}`);
    }
  };

  /**
   * softTrue - Check if the value is strictly true.
   *
   * ---
   *
   * @param {boolean} value - The value for the assertion
   * @param {string} outputMessage -  What is the element supposed to be visible?
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  softTrue = (value: boolean, outputMessage: string): void => {
    if (!value) {
      try {
        log.error(`softTrue failed: ${outputMessage}`);
        throw new Error(
          `[softTrue - Element: ${outputMessage}]\nActual: ${value}\nExpected: true\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        captureScreenshot();
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      log.info(`softTrue passed: ${outputMessage}`);
    }
  };

  /**
   * softFalse - Check if the value is strictly false.
   *
   * ---
   *
   * @param value {boolean} - The value for the assertion
   * @param {string} outputMessage - What is the element supposed to be visible?
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  softFalse = (value: boolean, outputMessage: string): void => {
    if (value) {
      try {
        log.error(`softFalse failed: ${outputMessage}`);
        throw new Error(
          `[softFalse - Element: ${outputMessage}]\nActual: ${value}\nExpected: false\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        captureScreenshot();
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      log.info(`softFalse passed: ${outputMessage}`);
    }
  };

  /**
   * softNotEqual - Check if the actual value is not equal to the expected value.
   *
   * ---
   *
   * @param {any} actual - The actual value to be compared.
   * @param {any} expected - The expected value to compare against.
   * @param  {string} outputMessage - What is the element supposed to be visible?
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   */
  softNotEqual = (actual: any, expected: any, outputMessage: string): void => {
    if (actual === expected) {
      try {
        log.error(`softNotEqual failed: ${outputMessage}`);
        throw new Error(
          `[softNotEqual - Element: ${outputMessage}]\nActual: ${actual} is supposed to be equal to Expected: ${expected}\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        captureScreenshot();
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      log.info(`softNotEqual passed: ${outputMessage}`);
    }
  };

  /**
   * softGreaterThan - Check if the actual value is greater than the expected value.
   *
   * ---
   *
   * @param {number} actual - The actual value to be compared.
   * @param {number} expected - The expected value to compare against.
   * @param {string} outputMessage - What is the element supposed to be visible?
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   */
  softGreaterThan = (
    actual: number,
    expected: number,
    outputMessage: string,
  ): void => {
    if (actual <= expected) {
      try {
        log.error(`softGreaterThan failed: ${outputMessage}`);
        throw new Error(
          `[softGreaterThan - Element: ${outputMessage}]\nActual: ${actual} is not greater than Expected: ${expected}\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        captureScreenshot();
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      log.info(`softGreaterThan passed: ${outputMessage}`);
    }
  };

  /**
   * softLessThan - Check if the actual value is less than the expected value.
   *
   * ---
   *
   * @param {number} actual - The actual value to be compared.
   * @param {number} expected - The expected value to compare against.
   * @param {string} outputMessage - What is the element supposed to be visible?
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   */
  softLessThan = (
    actual: number,
    expected: number,
    outputMessage: string,
  ): void => {
    if (actual >= expected) {
      try {
        log.error(`softLessThan failed: ${outputMessage}`);
        throw new Error(
          `[softLessThan - Element: ${outputMessage}]\nActual: ${actual} is not less than Expected: ${expected}\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        captureScreenshot();
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      log.info(`softLessThan passed: ${outputMessage}`);
    }
  };

  /**
   * softNotNull - Check if the value is not null or undefined.
   *
   * ---
   *
   * @param {any} value - The value to be checked.
   * @param {string} outputMessage - What is the element supposed to be visible?
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   */
  softNotNull = (value: any, outputMessage: string): void => {
    if (value === null || value === undefined) {
      try {
        log.error(`softNotNull failed: ${outputMessage}`);
        throw new Error(
          `[softNotNull - Element: ${outputMessage}]\nActual: ${value}\nExpected: null or undefined.\n`,
        );
      } catch (error) {
        const errorMsg = error as Error;
        captureScreenshot();
        this.assertionErrors.push({
          message: errorMsg.message + '\n' + errorMsg.stack,
        });
      }
    } else {
      log.info(`softNotNull passed: ${outputMessage}`);
    }
  };

  /**
   * softElementVisible - Asserts that the specified element is visible on the page.
   *
   * ---
   *
   * @param {string} selector - The xpath of the element to check for visibility.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 2 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   */
  softElementVisible = async (
    selector: string,
    outputMessage: string,
    timeoutSeconds = 2,
  ): Promise<void> => {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout: timeoutSeconds * 1000 });
      log.info(`softElementVisible passed: ${outputMessage}`);
    } catch (error) {
      log.error(`softElementVisible failed: ${outputMessage}`);
      captureScreenshot();
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message:
          `[softElementVisible - Element: ${outputMessage}]\n` +
          `${outputMessage} is not displayed.\n${errorMsg.message}\n${errorMsg.stack}`,
      });
    }
  };

  /**
   * softElementTextEquals - Asserts that the text content of the specified element matches the expected text.
   *
   * ---
   *
   * @param {string} selector - The xpath of the element.
   * @param {string} expectedText - The text expected to be exactly equal to the element's text.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 10 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  softElementTextEquals = async (
    selector: string,
    expectedText: string,
    outputMessage: string,
    timeoutSeconds = 10,
  ): Promise<void> => {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout: timeoutSeconds * 1000 });
      const actualText = String(await element.getText());
      if (actualText !== expectedText) {
        try {
          log.error(`softElementTextEquals failed: ${outputMessage}`);
          throw new Error(
            `[softElementTextEquals - Element: ${outputMessage}]\n` +
              `Actual: ${actualText} is not equal to Expected: ${expectedText}\n`,
          );
        } catch (error) {
          const errorMsg = error as Error;
          captureScreenshot();
          log.error(`softElementTextEquals failed: ${errorMsg}`);
          this.assertionErrors.push({
            message: errorMsg.message + '\n' + errorMsg.stack,
          });
        }
      } else {
        log.info(`softElementTextEquals passed: ${outputMessage}`);
      }
    } catch (error) {
      captureScreenshot();
      const errorMsg = error as Error;
      log.error(`softElementTextEquals failed: ${errorMsg}`);
      this.assertionErrors.push({
        message: `[softElementTextEquals - Element: ${outputMessage}]\n${errorMsg.message}\n${errorMsg.stack}`,
      });
    }
  };

  /**
   * softElementTextContains - Asserts that the text content of the specified element contains the expected text.
   *
   * ---
   *
   * @param {string} selector - The xpath of the element.
   * @param {string} expectedText - The text expected to be contained within the element.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time out in seconds to wait for the element to be enabled. Default is 10 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  softElementTextContains = async (
    selector: string,
    expectedText: string,
    outputMessage: string,
    timeoutSeconds = 10,
  ): Promise<void> => {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout: timeoutSeconds * 1000 });
      const actualText = String(await element.getText());
      if (!actualText.includes(expectedText)) {
        try {
          log.error(`softElementTextContains failed: ${outputMessage}`);
          throw new Error(
            `[softElementTextContains - Element: ${outputMessage}]\n` +
              `Actual: ${actualText} does not include Expected: ${expectedText}\n`,
          );
        } catch (error) {
          const errorMsg = error as Error;
          captureScreenshot();
          this.assertionErrors.push({
            message: errorMsg.message + '\n' + errorMsg.stack,
          });
        }
      } else {
        log.info(`softElementTextContains failed: ${outputMessage}`);
      }
    } catch (error) {
      captureScreenshot();
      const errorMsg = error as Error;
      log.error(`softElementTextContains failed: ${errorMsg}`);
      this.assertionErrors.push({
        message: `[softElementTextContains - Element: ${outputMessage}]\n${errorMsg.message}\n${errorMsg.stack}`,
      });
    }
  };

  /**
   * softElementDisabled - Asserts that an element is disabled.
   *
   * ---
   *
   * @param {string} selector -The xpath of the element.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 10 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  softElementDisabled = async (
    selector: string,
    outputMessage: string,
    timeoutSeconds = 10,
  ): Promise<void> => {
    try {
      const element = await $(selector);
      await element.waitForEnabled({
        timeout: timeoutSeconds * 1000,
        reverse: true,
      });
      log.info(`softElementDisabled passed: ${outputMessage}`);
    } catch (error) {
      log.error(`softElementDisabled failed: ${outputMessage}`);
      captureScreenshot();
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message:
          `[softElementDisabled - Element: ${outputMessage}]\n` +
          `${outputMessage} is not disabled.\n${errorMsg.message}\n${errorMsg.stack}`,
      });
    }
  };

  /**
   * softElementEnabled - Asserts that an element is enabled.
   *
   * ---
   *
   * @param {string} selector - The xpath of the element.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 10 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  softElementEnabled = async (
    selector: string,
    outputMessage: string,
    timeoutSeconds = 10,
  ): Promise<void> => {
    try {
      const element = await $(selector);
      await element.waitForEnabled({ timeout: timeoutSeconds * 1000 });
      log.info(`softElementEnabled passed: ${outputMessage}`);
    } catch (error) {
      log.error(`softElementEnabled failed: ${outputMessage}`);
      captureScreenshot();
      const errorMsg = error as Error;
      this.assertionErrors.push({
        message:
          `[softElementEnabled - Element: ${outputMessage}]\n` +
          `${outputMessage} is not enabled.\n${errorMsg.message}\n${errorMsg.stack}`,
      });
    }
  };

  /**
   * hardElementVisible - Asserts that the specified element is visible on the page.
   *
   * ---
   *
   * @param {string} selector - The xpath of the element to check for visibility.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 2 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  hardElementVisible = async (
    selector: string,
    outputMessage: string,
    timeoutSeconds = 2,
  ): Promise<void> => {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout: timeoutSeconds * 1000 });
      log.info(`hardElementVisible passed: ${outputMessage}`);
    } catch (error) {
      log.error(`hardElementVisible failed: ${outputMessage}`);
      captureScreenshot();
      const errorMsg = error as Error;
      this.assertionErrors.unshift({
        message:
          `[hardElementVisible - Element: ${outputMessage}]\n` +
          `${outputMessage} should be displayed.\n${errorMsg.message}\n${errorMsg.stack}`,
      });
      this.assertContent();
    }
  };

  /**
   * hardElementTextEquals - Asserts that the text content of the specified element matches the expected text.
   *
   * ---
   *
   * @param {string} selector - The xpath of the element.
   * @param {string} expectedText - The text expected to be exactly equal to the element's text.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 10 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  hardElementTextEquals = async (
    selector: string,
    expectedText: string,
    outputMessage: string,
    timeoutSeconds = 10,
  ): Promise<void> => {
    let actualText: string;
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout: timeoutSeconds * 1000 });
      actualText = String(await element.getText());
      if (actualText !== expectedText) {
        try {
          log.error(`hardElementVisible failed: ${outputMessage}`);
          throw new Error(
            `[hardElementTextEquals - Element: ${outputMessage}]\n` +
              `Actual: ${actualText} was supposed to be equal to Expected: ${expectedText}\n`,
          );
        } catch (error) {
          const errorMsg = error as Error;
          log.error(`hardElementVisible failed: ${outputMessage}`);
          captureScreenshot();
          this.assertionErrors.unshift({
            message: errorMsg.message + '\n' + errorMsg.stack,
          });
          this.assertContent();
        }
      } else {
        log.info(`hardElementVisible passed: ${outputMessage}`);
      }
    } catch (error) {
      log.error(`hardElementVisible failed: ${outputMessage}`);
      captureScreenshot();
      const errorMsg = error as Error;
      throw new Error(
        `[hardElementTextEquals - Element: ${outputMessage}]\n${errorMsg.message}\n${errorMsg.stack}`,
      );
    }
  };

  /**
   * hardElementTextContains - Asserts that the text content of the specified element contains the expected text.
   *
   * ---
   *
   * @param {string} selector - The xpath of the element.
   * @param {string} expectedText - The text expected to be contained within the element.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 10 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  hardElementTextContains = async (
    selector: string,
    expectedText: string,
    outputMessage: string,
    timeoutSeconds = 10,
  ): Promise<void> => {
    let actualText: string;
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout: timeoutSeconds * 1000 });
      actualText = String(await element.getText());
      if (!actualText.includes(expectedText)) {
        try {
          log.error(`hardElementTextContains failed: ${outputMessage}`);
          throw new Error(
            `[hardElementTextContains - Element: ${outputMessage}]\n` +
              `Actual: ${actualText} does not contain Expected: ${expectedText}\n`,
          );
        } catch (error) {
          const errorMsg = error as Error;
          captureScreenshot();
          this.assertionErrors.unshift({
            message: errorMsg.message + '\n' + errorMsg.stack,
          });
          this.assertContent();
        }
      } else {
        log.info(`hardElementTextContains passed: ${outputMessage}`);
      }
    } catch (error) {
      log.error(`hardElementTextContains failed: ${outputMessage}`);
      captureScreenshot();
      const errorMsg = error as Error;
      throw new Error(
        `[hardElementTextContains - Element: ${outputMessage}]\n${errorMsg.message}\n${errorMsg.stack}`,
      );
    }
  };

  /**
   * hardElementDisabled - Asserts that an element is disabled.
   *
   * ---
   *
   * @param {string} selector -The xpath of the element.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 10 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  hardElementDisabled = async (
    selector: string,
    outputMessage: string,
    timeoutSeconds = 10,
  ): Promise<void> => {
    try {
      const element = await $(selector);
      await element.waitForEnabled({
        timeout: timeoutSeconds * 1000,
        reverse: true,
      });
      log.info(`hardElementDisabled passed: ${outputMessage}`);
    } catch (error) {
      log.error(`hardElementDisabled failed: ${outputMessage}`);
      captureScreenshot();
      const errorMsg = error as Error;
      this.assertionErrors.unshift({
        message:
          `[hardElementDisabled - Element: ${outputMessage}]\n` +
          `${outputMessage} is not disabled.\n${errorMsg.message}\n${errorMsg.stack}`,
      });
      this.assertContent();
    }
  };

  /**
   * hardElementEnabled - Asserts that an element is enabled.
   *
   * ---
   *
   * @param {string} selector - The xpath of the element.
   * @param {string} outputMessage - What is the element supposed to be visible?
   * @param timeoutSeconds (optional) - The time-out in seconds to wait for the element to be enabled. Default is 10 seconds.
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   *
   * ---
   *
   * <u>*For example:*</u>\
   * outputMessage can be any string that describes the element, such as:
   *
   * > "PID text field"
   *
   * > "Change phone title"
   *
   * > "Cards title"
   *
   * > "Cards image"
   *
   */
  hardElementEnabled = async (
    selector: string,
    outputMessage: string,
    timeoutSeconds = 10,
  ): Promise<void> => {
    try {
      const element = await $(selector);
      await element.waitForEnabled({ timeout: timeoutSeconds * 1000 });
      log.info(`hardElementEnabled passed: ${outputMessage}`);
    } catch (error) {
      log.error(`hardElementEnabled failed: ${outputMessage}`);
      captureScreenshot();
      const errorMsg = error as Error;
      this.assertionErrors.unshift({
        message:
          `[hardElementEnabled - Element: ${outputMessage}]\n` +
          `${outputMessage} is not enabled.\n${errorMsg.message}\n${errorMsg.stack}`,
      });
      this.assertContent();
    }
  };

  /**
   * addAssertionErrors - A method to add assertion errors to the collection.
   *
   * @param {string} selector - The xpath of the element.
   * @param {string} outputMessage - The message describing the assertion failure.
   */

  addAssertionError = (selector: string, outputMessage: string) => {
    captureScreenshot();
    this.assertionErrors.push({
      message: `${outputMessage}\nSelector: ${selector}`,
    });
  };

  /**
   * assertContent - Throw error (if any) for all assertions
   */
  assertContent = () => {
    if (this.assertionErrors.length > 0) {
      const errorMessageData: { message: string }[] = this.assertionErrors;
      this.assertionErrors = [];
      throwAssertionErrors(errorMessageData);
    } else {
      log.info(chalk.greenBright('Assertion passed.'));
    }
  };
}

export default AssertionLibrary;
