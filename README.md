# magic-assert

`magic-assert` is a lightweight assertion library for TypeScript and JavaScript, designed to collect assertion errors and throw them all at once. This allows your code to continue executing until you explicitly check for failures.

## Features

- Collects multiple assertion errors before throwing.
- Simple API for common assertions.
- Works seamlessly with TypeScript and JavaScript.

---

## Usage

```ts
import { MagicAssert } from 'magic-assert';

class Test {        
    private magicAssert = new MagicAssert();

    fun() {
        this.magicAssert.isUndefined(undefined, "This should pass");
        this.magicAssert.isTrue(true, "This should also pass");
        // Add more assertions as needed
        this.magicAssert.assertAll(); // Throws if any assertion failed
    }
}

const test = new Test();
test.fun();
```

**Notes:**
- Always call `assertAll()` at the end to throw collected errors.
- If `assertAll()` is not called, execution continues even if assertions fail.

---

## API Reference

All assertion methods record errors but do not throw immediately. Call `assertAll()` to throw if any errors were recorded.

```ts

equals(actual: string | number | boolean, expected: string | number | boolean, message: string): void
includes(actual: string, expected: string, message: string): void
isTrue(value: boolean, message: string): void
isFalse(value: boolean, message: string): void
notEqual(actual: string | number | boolean, expected: string | number | boolean, message: string): void
greaterThan(actual: number, expected: number, message: string): void
isLessThan(actual: number, expected: number, message: string): void
notNull(value: any, message: string): void
isNull(value: any, message: string): void
isUndefined(value: any, message: string): void
isDefined(value: any, message: string): void
isNumber(value: any, message: string): void
isString(value: any, message: string): void
assertAll(): void

```

---

## TypeScript Integration

If you encounter issues with TypeScript declarations, you can create a custom module declaration:

Create a `magic-assert.d.ts` file in your project root:

```ts
declare module 'magic-assert' {
    export class MagicAssert {
        // Add required function signatures as needed
    }
}
```

Now you can import and use `MagicAssert` anywhere in your project:

```ts
import { MagicAssert } from 'magic-assert';

class Foo {
    private magic = new MagicAssert();
}
```

---

## Best Practices

- Use descriptive messages for each assertion to make debugging easier.
- Group related assertions together before calling `assertAll()`.

---

## License

ISC License

Copyright (c) [2025] [Dhruv Dhiman]

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
