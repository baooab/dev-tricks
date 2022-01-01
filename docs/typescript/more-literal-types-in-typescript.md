TypeScript 2.0 中增加的字面量类型
================================

> Marius Schulz, [“More Literal Types in TypeScript”](https://mariusschulz.com/blog/more-literal-types-in-typescript), November 10, 2016

TypeScript 1.8 introduced [string literal types](/blog/string-literal-types-in-typescript) for restricting variables to a finite set of possible string values. With TypeScript 2.0, literal types are no longer restricted to string literals. The following literal types have been added to the type system:

*   [Boolean literal types](#boolean-literal-types)
*   [Numeric literal types](#numeric-literal-types)
*   [Enum literal types](#enum-literal-types)

In the following sections, we're going to be looking at a practical example for each of these new literal types.

Boolean Literal Types
布尔字面量类型
------------------------------------------------

The following example defines two constants, `TRUE` and `FALSE`, which hold the values `true` and `false`, respectively:

```ts
const TRUE: true = true; // OK
const FALSE: false = false; // OK
```

Trying to assign the opposite boolean value to each of the local variables results in a type error:

```ts
const TRUE: true = false;
// Error: Type 'false' is not assignable to type 'true'

const FALSE: false = true;
// Error: Type 'true' is not assignable to type 'false'
```

With the introduction of boolean literal types, the predefined `boolean` type is now equivalent to the `true | false` union type:

```ts
let value: true | false; // Type boolean
```

While boolean literal types are rarely useful in isolation, they work great in conjunction with [tagged union types](/blog/tagged-union-types-in-typescript) and [control flow based type analysis](/blog/control-flow-based-type-analysis-in-typescript). For instance, a generic `Result<T>` type that either holds a value of type `T` or an error message of type `string` can be defined as follows:

```ts
type Result<T> =
    | { success: true; value: T }
    | { success: false; error: string };
```

Here's a function that accepts a parameter .

```ts
function parseEmailAddress(
    input: string | null | undefined
): Result<string> {
    // If the input is null, undefined, or the empty string
    // (all of which are falsy values), we return early.
    if (!input) {
    return {
        success: false,
        error: "The email address cannot be empty."
    };
    }

    // We're only checking that the input matches the pattern
    //   <something> @ <something> DOT <something>
    // to keep it simple. Properly validating email addresses
    // via regex is hard, so let's not even try here.
    if (!/^\S[email protected]\S+\.\S+$/.test(input)) {
    return {
        success: false,
        error: "The email address has an invalid format."
    };
    }

    // At this point, control flow based type analysis
    // has determined that the input has type string.
    // Thus, we can assign input to the value property.
    return {
    success: true,
    value: input
    };
}
```

Note that with the `strictNullChecks` option enabled, `string` is a [non-nullable type](/blog/non-nullable-types-in-typescript). In order for the function to accept a value of a nullable type for its `input` parameter, the `null` and `undefined` types must explicitly be included in the union type.

We can now call the `parseEmailFunction` as follows:

```ts
const parsed = parseEmailAddress("[email protected]");

if (parsed.success) {
    parsed.value; // OK
    parsed.error; // Error
} else {
    parsed.value; // Error
    parsed.error; // OK
}
```

Here's a screenshot of [Visual Studio Code](https://code.visualstudio.com/) rendering the above code snippet. Notice that some property access expressions are underlined with red squigglies:

![TypeScript checking for invalid property accesses](https://mariusschulz.com/images/content/typescript_boolean_literal_discriminant_property-2x.p4d5gfznrb.imm.png)

What's great about this is that the compiler only lets us the `value` or `error` properties after we've checked `parsed.success`, our [discriminant property](/blog/tagged-union-types-in-typescript):

*   If `parsed.success` is `true`, `parsed` must have type `{ success: true; value: string }`. We can access `value` in this case, but not `error`.
*   If `parsed.success` is `false`, `parsed` must have type `{ success: false; error: string }`. We can access `error` in this case, but not `value`.

By the way, did you notice that the only TypeScript artifacts in this entire code example are the declaration of `Result<T>` and the type annotations in the function signature? The remainder of the code is plain, idiomatic JavaScript that is still fully typed due to control flow based type analysis.

Numeric Literal Types
数值字面量类型
------------------------------------------------

Similar to [string literal types](/blog/string-literal-types-in-typescript), we can restrict numeric variables to a finite set of known values:

```ts
let zeroOrOne: 0 | 1;

zeroOrOne = 0;
// OK

zeroOrOne = 1;
// OK

zeroOrOne = 2;
// Error: Type '2' is not assignable to type '0 | 1'
```

In practice, we could use a numeric literal when working with port numbers, for example. Unsecured HTTP uses port 80, while HTTPS uses port 443. We can write a `getPort` function and encode the only two possible return values in its function signature:

```ts
function getPort(scheme: "http" | "https"): 80 | 443 {
    switch (scheme) {
    case "http":
        return 80;
    case "https":
        return 443;
    }
}

const httpPort = getPort("http"); // Type 80 | 443
```

It gets even more interesting if we combine literal types with [TypeScript's function overloads](/blog/function-overloads-in-typescript). That way, we can give more specific types to different overloads of the `getPort` function:

```ts
function getPort(scheme: "http"): 80;
function getPort(scheme: "https"): 443;
function getPort(scheme: "http" | "https"): 80 | 443 {
    switch (scheme) {
    case "http":
        return 80;
    case "https":
        return 443;
    }
}

const httpPort = getPort("http"); // Type 80
const httpsPort = getPort("https"); // Type 443
```

Now, the compiler can help us when it detects conditions that are always return the value `false`, for example when comparing `httpPort` to the value `443`:

![TypeScript flagging a condition that's always false](https://mariusschulz.com/images/content/typescript_control_flow_contradiction-2x.kpi7hrylto.imm.png)

Since `httpPort` has type `80`, it always contains the value 80, which of course is never equal to the value 443. In cases like these, the TypeScript compiler can help you detect both buggy logic and dead code.

Enum Literal Types
枚举字面量类型
------------------------------------------

Finally, we can also use enumerations as literal types. Continuing our example from before, we'll be implementing a function that maps from a given port (80 or 443) to the corresponding scheme (HTTP or HTTPS, respectively). To do that, we'll first declare a [const enum](https://www.typescriptlang.org/docs/handbook/enums.html) which models the two port numbers:

    const enum HttpPort {
      Http = 80,
      Https = 443
    }

Now comes our `getScheme` function, again using function overloads for specialized type annotations:

    function getScheme(port: HttpPort.Http): "http";
    function getScheme(port: HttpPort.Https): "https";
    function getScheme(port: HttpPort): "http" | "https" {
      switch (port) {
        case HttpPort.Http:
          return "http";
        case HttpPort.Https:
          return "https";
      }
    }
    
    const scheme = getScheme(HttpPort.Http);
    // Type "http"

Constant enumerations have no runtime manifestation (unless you provide the `preserveConstEnums` compiler option) — that is, the constant values of the enum cases will be inlined wherever they are used. Here's the compiled JavaScript code, with comments removed:

    function getScheme(port) {
      switch (port) {
        case 80:
          return "http";
        case 443:
          return "https";
      }
    }
    var scheme = getScheme(80);

Super clean, isn't it?

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
