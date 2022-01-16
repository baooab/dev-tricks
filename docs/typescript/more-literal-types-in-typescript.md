TypeScript 2.0 中增加的字面量类型
================================

> Marius Schulz, [“More Literal Types in TypeScript”](https://mariusschulz.com/blog/more-literal-types-in-typescript), November 10, 2016

TypeScript 1.8 引入了 [字符串字面量](https://mariusschulz.com/blog/string-literal-types-in-typescript)，将变量限制为有限的字符串集合。TypeScript 2.0 中又向类型系统中新增了下面三个字面量类型：

*   [布尔字面量类型](#boolean-literal-types)
*   [数值字面量类型](#numeric-literal-types)
*   [枚举字面量类型](#enum-literal-types)

接下来，我们将逐个进行讲解，并搭配一些实际的案例。

布尔字面量类型
------------------------------------------------

下面的例子中定义了两个常量：`TRUE` 和 `FALSE`，分别被赋值 `true` 和 `false`。

```ts
const TRUE: true = true; // OK
const FALSE: false = false; // OK=
```

尝试给每个变量赋值相反的值会导致类型错误：

```ts
const TRUE: true = false;
// Error: Type 'false' is not assignable to type 'true'

const FALSE: false = true;
// Error: Type 'true' is not assignable to type 'false'
```

随着布尔字面量类型的引入，预置 `boolean` 类型等价于联合类型 `true | false`：

```ts
let value: true | false; // Type boolean
```

While boolean literal types are rarely useful in isolation, they work great in conjunction with [tagged union types](/blog/tagged-union-types-in-typescript) and [control flow based type analysis](/blog/control-flow-based-type-analysis-in-typescript). For instance, a generic `Result<T>` type that either holds a value of type `T` or an error message of type `string` can be defined as follows:

布尔字面量类型很少单独使用，不过可以跟 [标签联合类型](./tagged-union-types-in-typescript.md) 和 [基于类型分析的控制流](./control-flow-based-type-analysis-in-typescript.md) 很好的配合使用。比如，我们定义了一个范型 `Reresult<T>`，既支持接收类型 `T` 的值，也支持接收字符串类型的值作为错误信息：

```ts
type Result<T> =
    | { success: true; value: T }
    | { success: false; error: string };
```

有一个接受单参数的函数。

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

注意，启用 `strictNullChecks` 选项的时候，`string` 是 [非空类型](./non-nullable-types-in-typescript.md)。为了让函数的 `input` 参数接受一个可为空类型的值，`null` 和 `undefined` 必须显式地包含在联合类型中。

现在调用 `parseEmailFunction`：

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

下面是在 [Visual Studio Code](https://code.visualstudio.com/) 编辑器中的报错信息。注意，一些属性访问因为是无效的，会标红线提示：

![TypeScript checking for invalid property accesses](https://mariusschulz.com/images/content/typescript_boolean_literal_discriminant_property-2x.p4d5gfznrb.imm.png)

`parsed.success` 是 [区别属性](./tagged-union-types-in-typescript.md)，所以在判断后，编译器只会允许我们访问 `value` 或 `error` 属性：

* 如果 `parsed.success` 为 `true`，`parsed` 类型必然是 `{ success: true; value: string }`，所以可以访问 `value`，但不能访问 `error`。
* 如果 `parsed.success` 为 `false`，`parsed` 类型必然是 `{ success: true; error: string }`，所以可以访问 `error`，但不能访问 `value`。

顺便说一下，你有没有注意到整个代码示例中唯一的 TypeScript 构件就是 `Result<T>` 声明和函数签名中的类型注解？其余的代码就是普通的 JavaScript。正是基于控制流的类型分析，让整块代码仍旧是完全类型化的。

数值字面量类型
------------------------------------------------

类似 [字符串字面量](./string-literal-types-in-typescript.md)，我们可以将数值变量限制由已知值组成的有限集合:

```ts
let zeroOrOne: 0 | 1;

zeroOrOne = 0;
// OK

zeroOrOne = 1;
// OK

zeroOrOne = 2;
// Error: Type '2' is not assignable to type '0 | 1'
```

实践中，我们可以在处理端口号时使用数字字面量。不安全的 HTTP 使用端口 80，而 HTTPS 使用端口 443。我们可以编写一个 `getPort` 函数，并在函数签名中返回两个可能的返回值:

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

如果我们将字面量类型与 [函数重载](https://mariusschulz.com/blog/function-overloads-in-typescript) 结合起来会更加有趣。通过给 `getPort` 函数不同的重载提供更具体的类型:

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

现在编译器可以帮助我们检测总是为 `false` 的条件，例如将 `httpPort` 和 `443` 两个值进行比较:

![TypeScript flagging a condition that's always false](https://mariusschulz.com/images/content/typescript_control_flow_contradiction-2x.kpi7hrylto.imm.png)

由于 `httpPort` 的类型是 `80`，它只可能是 80，不会等于 443。这种情况下，TypeScript 编译器可以帮助你检测出有 bug 的逻辑（buggy logic）或是死代码（dead code）。

枚举字面量类型
------------------------------------------

最后，我们还可以使用枚举作为字面量类型。接着前面的示例，我们将实现一个函数，该函数从给定的端口（80 或 443）映射到相应的协议（分别是 HTTP 或 HTTPS）。为此，我们首先声明一个[const enum](https://www.typescriptlang.org/docs/handbook/enums.html) 来模拟两个端口号:

```ts
const enum HttpPort {
    Http = 80,
    Https = 443
}
```

现在，`getScheme` 函数同样使用函数重载进行类型注释:

```ts
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
```

Constant enumerations have no runtime manifestation (unless you provide the `preserveConstEnums` compiler option) — that is, the constant values of the enum cases will be inlined wherever they are used. Here's the compiled JavaScript code, with comments removed:

常量枚举没有运行时表现（除非提供 `PreserveConstenums` 编译器选项）——也就是说，枚举里的常量值会直接替换到行内，以下就是编译出来的 JavaScript 代码（移除了注释的）：

```ts
function getScheme(port) {
    switch (port) {
        case 80:
            return "http";
        case 443:
            return "https";
    }
}
var scheme = getScheme(80);
```

很简洁，不是吗？

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
