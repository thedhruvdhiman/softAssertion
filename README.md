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

    fun() {
        this.assert.equals('magic', 'assert', 'Custom message in case of a failure');
        this.assert.assertAll();
    }
}

const foo = new Foo();
foo.fun();
```

The output will be as follows:

```text
Custom message in case of a failure
Actual: magic is not equal to Expected: assert

// Followed by error stack
```

**Notes:**
- Always call `assertAll()` at the end to throw collected errors.
- If `assertAll()` is not called, execution continues even if assertions fail.

---

## Function Reference


Assertion methods record errors but do not throw immediately, strict assertion methods throw error immediately.

Call `assertAll()` to throw if any errors were recorded.

---

> Note: If you use strict assert anywhere in your code, that will throw error immediately (in case of a failure in condition), followed with the previously recorded errors.

In that case, any assertion which are performed after the strict assert will not be executed.

---

## Best Practices

- Use descriptive messages for each assertion to make debugging easier.
- Call `assertAll()` where you want to throw collected errors.

---

## License

ISC License

Copyright (c) [2025] [Dhruv Dhiman]
