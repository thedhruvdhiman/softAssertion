import { Assert } from "../dist/lib/assert.js";

describe("Assert", () => {
  let assert;

  beforeEach(() => {
    assert = new Assert();
  });

  test("Assert should be defined", () => {
    expect(Assert).toBeDefined();
  });

  describe("equals", () => {
    test("should not throw error when values are equal", () => {
      assert.equals("foo", "foo", "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when values are not equal", () => {
      assert.equals("foo", "bar", "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("includes", () => {
    test("should not throw error when actual contains expected", () => {
      assert.includes("Lazy fox!", "y f", "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when actual does not contain expected", () => {
      assert.includes("Lazy fox!", "Y f", "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isTrue", () => {
    test("should not throw error when value is true", () => {
      assert.isTrue(true, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when value is false", () => {
      assert.isTrue(false, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isFalse", () => {
    test("should not throw error when value is false", () => {
      assert.isFalse(false, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when value is true", () => {
      assert.isFalse(true, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("notEqual", () => {
    test("should not throw error when values are not equal", () => {
      assert.notEqual("foo", "bar", "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when values are equal", () => {
      assert.notEqual("foo", "foo", "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("greaterThan", () => {
    test("should not throw error when actual is greater than expected", () => {
      assert.greaterThan(11, 10, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when actual is not greater than expected", () => {
      assert.greaterThan(1, 10, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isLessThan", () => {
    test("should not throw error when actual is less than expected", () => {
      assert.isLessThan(1, 10, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when actual is not less than expected", () => {
      assert.isLessThan(11, 0, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("notNull", () => {
    test("should not throw error when value is not null", () => {
      assert.notNull(1, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when value is null", () => {
      assert.notNull(null, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isNull", () => {
    test("should not throw error when value is null", () => {
      assert.isNull(null, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when value is not null", () => {
      assert.isNull([1, 3, "foo"], "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isDefined", () => {
    test("should not throw error when value is defined", () => {
      assert.isDefined(1, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when value is undefined", () => {
      assert.isDefined(undefined, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isUndefined", () => {
    test("should not throw error when value is undefined", () => {
      assert.isUndefined(undefined, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when value is defined", () => {
      assert.isUndefined(1, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isNumber", () => {
    test("should not throw error when value is a number", () => {
      assert.isNumber(42, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when value is not a number", () => {
      assert.isNumber(NaN, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isString", () => {
    test("should not throw error when value is a string", () => {
      assert.isString("foo", "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when value is not a string", () => {
      assert.isString(123, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("equals with arrays", () => {
    test("should not throw error when arrays are equal", () => {
      assert.equals([1, 2, 3], [1, 2, 3], "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when arrays are not equal", () => {
      assert.equals([1, 2, 3], [1, 2, 4], "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("includes in arrays", () => {
    test("should not throw error when array includes element", () => {
      assert.includes([1, 2, 3], 2, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when array does not include element", () => {
      assert.includes([1, 2, 3], 4, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("equals with objects", () => {
    test("should not throw error when objects are equal", () => {
      assert.equals({ a: 1, b: 2 }, { a: 1, b: 2 }, "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when objects are not equal", () => {
      assert.equals({ a: 1, b: 2 }, { a: 1, b: 3 }, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("includes in objects", () => {
    test("should not throw error when object includes property", () => {
      assert.includes({ a: 1, b: 2 }, "a", "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });

    test("should throw error when object does not include property", () => {
      assert.includes({ a: 1, b: 2 }, "c", "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isTrue with edge cases", () => {
    test('should throw error when value is a string "true"', () => {
      assert.isTrue("true", "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isNumber with NaN", () => {
    test("should throw error when value is NaN", () => {
      assert.isNumber(NaN, "should throw");
      expect(() => assert.assertAll()).toThrow();
    });
  });

  describe("isString with empty string", () => {
    test("should not throw error when value is an empty string", () => {
      assert.isString("", "should not throw");
      expect(() => assert.assertAll()).not.toThrow();
    });
  });
});
