# soft-assertion

`soft-assertion` is a lightweight assertion library for TypeScript and JavaScript, designed to collect assertion errors and throw them all at once. This allows your code to continue executing until you explicitly check for failures.

## Features

- Collects multiple assertion errors before throwing.
- Simple API for common assertions.
- Works seamlessly with TypeScript and JavaScript.

---

## Usage


```ts
import { Assert } from 'soft-assertion';

class Foo {
    private assert = new Assert();

    function fun() {
        this.assert.equals('magic', 'assert', 'Custom message in case of a failure');
        this.assert.assertAll();
    }
}

const foo = new Foo();
foo.fun();
```
The output will be as follows:

```bash
Custom message in case of a failure
Actual: magic is not equal to Expected: assert

// Followed by error stack
```

**Notes:**
- Always call `assertAll()` at the end to throw collected errors.
- If `assertAll()` is not called, execution continues even if assertions fail.

---

## Function Reference

All assertion methods record errors but do not throw immediately. Call `assertAll()` to throw if any errors were recorded.

```ts
equals(actual: any, expected: any, message: string): void
includes(actual: string, expected: string, message: string): void
isTrue(value: boolean, message: string): void
isFalse(value: boolean, message: string): void
notEqual(actual: any, expected: any, message: string): void
greaterThan(actual: number, expected: number, message: string): void
isLessThan(actual: number, expected: number, message: string): void
notNull(value: any, message: string): void
isNull(value: any, message: string): void
isUndefined(value: any, message: string): void
isDefined(value: any, message: string): void
isNumber(value: any, message: string): void
isString(value: any, message: string): void
strictEquals(actual: any, expected: any, message: string): void
strictIncludes(actual: string, expected: string, message: string): void
strictIsTrue(value: boolean, message: string): void
strictIsFalse(value: boolean, message: string): void
strictNotEqual(actual: any, expected: any, message: string): void
strictGreaterThan(actual: number, expected: number, message: string): void
strictIsLessThan(actual: number, expected: number, message: string): void
strictNotNull(value: any, message: string): void
strictIsNull(value: any, message: string): void
strictIsUndefined(value: any, message: string): void
strictIsDefined(value: any, message: string): void
strictIsNumber(value: any, message: string): void
strictIsString(value: any, message: string): void
assertAll(): void
```

---

## Best Practices

- Use descriptive messages for each assertion to make debugging easier.
- Call `assertAll()` where you want to throw collected errors.

---

## License

ISC License

Copyright (c) [2025] [Dhruv Dhiman]
