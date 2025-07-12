# magic-assert



1. Create an object of MagicAssert.  
2. Make sure to end with `assertAll()` to throw if any error is recorded.
3. While `assertAll()` is not called the execution will not stop.

---

### How to use:

```ts
import { MagicAssert } from 'magic-assert';

class Test {        
    magicAssert = new MagicAssert();
    fun () {
        this.magicAssert.isUndefined(undefined, "This should pass");
        this.magicAssert.assertAll()
    }
}

let test = new Test();
test.fun();   
```

---

### Allowed functions: 
```
equals(actual: any, expected: any, message: string): void

contains(actual: any, expected: any, message: string): void

isTrue(value: boolean, message: string): void

isFalse(value: boolean, message: string): void

notEqual(actual: any, expected: any, message: string): void

greaterThan(actual: number, expected: number, message: string): void

isLessThan(actual: number, expected: number, message: string): void

isNotNull(value: any, message: string): void

isNull(value: any, message: string): void

isUndefined(value: any, message: string): void

isDefined(value: any, message: string): void

isNumber(value: any, message: string): void

isString(value: any, message: string): void
```
