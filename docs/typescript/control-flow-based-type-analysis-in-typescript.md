TypeScript：基于控制流的类型分析
==============================================

> Marius Schulz, [“Control Flow Based Type Analysis in TypeScript”](https://mariusschulz.com/blog/control-flow-based-type-analysis-in-typescript), September 30, 2016

[TypeScript 2.0](https://blogs.msdn.microsoft.com/typescript/2016/09/22/announcing-typescript-2-0/) 带来了很多新特新。除了已经介绍的 [非空类型](./non-nullable-types-in-typescript.md)，还有基于控制流的类型分析。

基于控制流的类型分析
----------------------------------------------------------------------

官方的 [What's new in TypeScript](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#control-flow-based-type-analysis) 页面总结了基于控制流的类型分析：

> With TypeScript 2.0, the type checker analyses all possible flows of control in statements and expressions to produce the most specific type possible (the _narrowed type_) at any given location for a local variable or parameter that is declared to have a union type.

这是一个非常冗长的解释。下面，我们用一个例子来说明 TypeScript 是如何理解变量赋值，以及缩小变量类型范围的。

```ts
let command: string | string[];

command = "pwd";
command.toLowerCase(); // Here, command is of type 'string'

command = ["ls", "-la"];
command.join(" "); // Here, command is of type 'string[]'
``` 

注意，所有的代码都处在同一个作用域中。同样，类型检查器也会根据变量 `command` 所处的位置，判定它应该是什么具体类型：

*   `"pwd"` 赋值为字符串后，就不再可能是一个字符串数组了（联合类型中唯一的另一个选项）。因此，TypeScript 认为 `command` 是一个 `string` 类型的变量，也就可以调用 `toLowserCase()` 方法了。
*   After the string array `["ls", "-la"]` is assigned, the `command` variable is no longer treated as a string. It is now known to be a string array, so the call to the `join` method succeeds.
*   同理，`"pwd"` 赋值为字符串数组后，就不再可能是一个字符串了。因此，就调用数组方法 `join()` 了。

同样是根据控制流分析，下面函数里的类型检查在 TypeScript 2.0 看来也是正确的：

```ts
function composeCommand(command: string | string[]): string {
    if (typeof command === "string") {
    return command;
    }

    return command.join(" ");
}
```

The compiler now understands that if the `command` parameter is of type `string`, the function always returns early from within the `if`\-statement. Because of the early exit behavior, the type of the `command` parameter is narrowed to `string[]` after the `if`\-statement. As a result, the call to the `join` method type-checks correctly.

Prior to TypeScript 2.0, the compiler was not able to deduce the above semantics. Therefore, the `string` type was not removed from the union type of the `command` variable, and the following compile-time error was produced:

```
Property 'join' does not exist on type 'string | string[]'.
```

严格空值检查
------------------------------------------

Control flow based type analysis is particularly helpful when used in conjunction with nullable types, which are represented using union types including `null` or `undefined`. Usually, we need to check whether a variable of a nullable type has a non-null value before we can work with it:

```ts
type Person = {
    firstName: string;
    lastName?: string | null | undefined;
};

function getFullName(person: Person): string {
    const { firstName, lastName } = person;

    // Here, we check for a falsy value of the `lastName` property,
    // which covers `null` and `undefined` (and other values like "")
    if (!lastName) {
    return firstName;
    }

    return `${firstName} ${lastName}`;
}
```

Here, the `Person` type defines a non-nullable `firstName` property and a nullable `lastName` property. If we compose a full name out of both, we need to check whether `lastName` is `null` or `undefined` to avoid appending the string `"null"` or `"undefined"` to the first name.

For the purpose of clarity, I added the `undefined` type to the union type of the `lastName` property, although that's a redundant piece of information. In strict null checking mode, the `undefined` type is added automatically to the union type of optional properties, so we don't have to explicitly write it out. For more information, please refer to my previous post about [non-nullable types](/blog/non-nullable-types-in-typescript).

明确赋值分析
--------------------------------------------------------------

另一个基于控制流的新特性是 **明确赋值分析（definite assignment analysis）**。在严格空值检查模式下，本地变量在使用前必须要先赋值：

```ts
let name: string;

// Error: Variable 'name' is used before being assigned.
console.log(name);
``` 

当然，如果变量允许为空（比如允许 `undefined`），就不会有问题：

```ts
let name: string | undefined;
console.log(name); // No error
```

明确赋值分析是另一个避免空调用 BUG 的保护措施。这个功能是为了保证任何非空变量在使用前被正确的初始化了。

 总结
--------------------

基于控制流的类型分析是 TypeScript 类型系统一个特别强大的功能添加。类型检查器理解控制流中的赋值和分支语义，极大地减少了使用 type guard 的必要。通过消除“null”和“undefined”类型，可以方便地处理可为空变量。最后，控制流分析避免了在使用变量前没有明确赋值的问题。

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。