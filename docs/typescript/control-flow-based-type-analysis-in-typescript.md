Control Flow Based Type Analysis in TypeScript
==============================================

> Marius Schulz, [“Control Flow Based Type Analysis in TypeScript”](https://mariusschulz.com/blog/control-flow-based-type-analysis-in-typescript), September 30, 2016

The [recent release](https://blogs.msdn.microsoft.com/typescript/2016/09/22/announcing-typescript-2-0/) of TypeScript 2.0 shipped with plenty of new features. I previously wrote about the new [non-nullable types](/blog/non-nullable-types-in-typescript), which go hand in hand with another feature we're going to look at in this post: type analysis based on control flow.

Control Flow Based Type Analysis
----------------------------------------------------------------------

The official [What's new in TypeScript](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#control-flow-based-type-analysis) page summarizes control flow based type analysis as follows:

> With TypeScript 2.0, the type checker analyses all possible flows of control in statements and expressions to produce the most specific type possible (the _narrowed type_) at any given location for a local variable or parameter that is declared to have a union type.

That's a pretty dense explanation. Here's an example that illustrates how TypeScript understands the effect of assignments to a local variable, and how it _narrows_ the type of that variable accordingly:

```ts
let command: string | string[];

command = "pwd";
command.toLowerCase(); // Here, command is of type 'string'

command = ["ls", "-la"];
command.join(" "); // Here, command is of type 'string[]'
``` 

Note that all code resides within the same scope. Still, the type checker uses the most specific type possible for the `command` variable at any given location:

*   After the string `"pwd"` has been assigned, there's no way for the `command` variable to be a string array (the only other option within the union type). Therefore, TypeScript treats `command` as a variable of type `string` and allows the call to the `toLowerCase()` method.
*   After the string array `["ls", "-la"]` is assigned, the `command` variable is no longer treated as a string. It is now known to be a string array, so the call to the `join` method succeeds.

Because of the same control flow analysis, the following function type-checks correctly in TypeScript 2.0:

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

Strict Null Checks
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

Definite Assignment Analysis
--------------------------------------------------------------

Another new feature built on top of control flow is **definite assignment analysis**. In strict null checking mode, local variables cannot be referenced before they have been assigned:

```ts
let name: string;

// Error: Variable 'name' is used before being assigned.
console.log(name);
``` 

An exception to this rule are local variables whose type includes `undefined`:

```ts
let name: string | undefined;
console.log(name); // No error
``` 

Definite assignment analysis is another protection measure against nullability bugs. The idea is to make sure that every non-nullable local variable has been initialized properly before it's being used.

Summary
--------------------

Control flow based type analysis is a powerful addition to TypeScript's type system. The type checker now understands the semantics of assignments and jumps in control flow, thereby greatly reducing the need for type guards. Working with nullable variables can be facilitated by the elimination of the `null` and `undefined` types. Finally, control flow analysis prevents referencing variables that have not definitely been assigned at the given location.

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。