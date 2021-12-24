TypeScript 中的非空类型
================================

> Marius Schulz, [“Non-Nullable Types in TypeScript”](https://mariusschulz.com/blog/non-nullable-types-in-typescript), September 28, 2016

[TypeScript 2.0](https://blogs.msdn.microsoft.com/typescript/2016/09/22/announcing-typescript-2-0/) 引入了很多新特性。本篇，我将介绍 **非空类型**，这是对类型系统的基础功能提升，帮助我们避免了编译期间的空值错误（nullability errors）。

[#](#the-null-and-undefined-values) `null` 和 `undefined`
--------------------------------------------------------------------

TypeScript 2.0 之前，类型检查器（type checker）允许将 `null` 和 `undefined` 赋值给 _任意_ 类型。这包括字符串、数值和布尔值在内的原始类型：

    let name: string;
    name = "Marius";  // OK
    name = null;      // OK
    name = undefined; // OK
    
    let age: number;
    age = 24;        // OK
    age = null;      // OK
    age = undefined; // OK
    
    let isMarried: boolean;
    isMarried = true;      // OK
    isMarried = false;     // OK
    isMarried = null;      // OK
    isMarried = undefined; // OK
 
以 `number` 类型为例。它所表示的范围不仅包括 [IEEE 754 浮点数值](https://en.wikipedia.org/wiki/IEEE_floating_point)，还包括 `null` 和 `undefined`：

![Domains of TypeScript's number type](https://mariusschulz.com/images/content/typescript_number_domain_with_null_and_undefined-2x.vzfjhvlgca.imm.png)

对象、数组和函数类型也是如此。但在这种类型系统下，无法表示非空的变量。幸运的是，TypeScript 2.0 修复了这个问题。

[#](#strict-null-checking)严格空检查
----------------------------------------------

TypeScritp 2.0 添加了对 **非空类型（non-nullable types）** 的支持。命令行中使用 `--strictNullChecks` flag 就能启用 **严格空检查（strict null checking）** 模式，或者在项目的 _tsconfig.json_ 文件中增加 `strictNullChecks` 编译选项：


    {
      "compilerOptions": {
        "strictNullChecks": true
        // ...
      }
    }

严格空检查模式下，`null` 和 `undefined` 不再能够赋值给任意类型。`null` 和 `undefined` 都归属在各自类型之下：

![Domains of TypeScript's number, null, and undefined types](https://mariusschulz.com/images/content/typescript_number_domain_without_null_and_undefined-2x.ni7cmeejbe.imm.png)

启用严格空检查模式后，将 `null` 和 `undefined` 赋值给任何变量都会导致错误：

    // 使用 --strictNullChecks flag 编译的结果
    
    let name: string;
    name = "Marius";  // OK
    name = null;      // Error
    name = undefined; // Error
    
    let age: number;
    age = 24;        // OK
    age = null;      // Error
    age = undefined; // Error
    
    let isMarried: boolean;
    isMarried = true;      // OK
    isMarried = false;     // OK
    isMarried = null;      // Error
    isMarried = undefined; // Error

那么，我们如何在 TypeScript 2.0 中表示可为空变量呢？ 

[#](#modeling-nullability-with-union-types)使用联合类型构建可为空变量
--------------------------------------------------------------------------------

由于启用严格空检查后，各个类型默认都是非空的，所以，我们需要明确告诉类型检查器一个变量是可为空的。这可以通过将 `null` 和 `undefined` 混入联合类型做到的：

    let name: string | null;
    name = "Marius";  // OK
    name = null;      // OK
    name = undefined; // Error

注意，`undefined` 并不是可以赋值给变量 `name` 的有效值，因为联合类型中并没有包含 `undefined`。

这种表示可为空变量的方式非常直观。我们以一个简单的 `User` 类型为例：

    type User = {
      firstName: string;
      lastName: string | undefined;
    };
    
    let jane: User = { firstName: "Jane", lastName: undefined };
    let john: User = { firstName: "John", lastName: "Doe" };

我们可以通过在 `lastName` 后面加 `?` 的方式将属性标记为可选的。除此之外，`undefined` 会自动添加到联合类型。因此，下面的赋值都是类型正确（type-correct）的：

    type User = {
      firstName: string;
      lastName?: string;
    };
    
    // We can assign a string to the "lastName" property
    let john: User = { firstName: "John", lastName: "Doe" };
    
    // ... or we can explicitly assign the value undefined
    let jane: User = { firstName: "Jane", lastName: undefined };
    
    // ... or we can not define the property at all
    let jake: User = { firstName: "Jake" };
    

[#](#property-access-with-nullable-types)访问可为空属性
----------------------------------------------------------------------------

如果一个对象变量是可为空的，直接访问它的任意属性都会导致编译期错误（compil-time error）：

    function getLength(s: string | null) {
      // Error: Object is possibly 'null'.
      return s.length;
    }

访问属性前，需要使用 type guard 保证访问对象属性是安全的：

    function getLength(s: string | null) {
      if (s === null) {
        return 0;
      }
    
      return s.length;

TypeScript 理解 JavaScript 的真值语义（truthiness semantics），支持条件表达式中的 type guard。因此，下面这种检查方式也是可以的：

    function getLength(s: string | null) {
      return s ? s.length : 0;
    }
    

[#](#function-invocations-with-nullable-types)调用可为空函数
--------------------------------------------------------------------------------------

如果一个函数是可为空的，直接调用它就会导致编译期错误（compil-time error）。以下面的 `callback` 参数为例：

    function doSomething(callback?: () => void) {
      // Error: Object is possibly 'undefined'.
      callback();
    }

类似于访问对象属性前的检查，在调用函数前也要先检查，以便确保不是空值：

    function doSomething(callback?: () => void) {
      if (callback) {
        callback();
      }
    }

如果喜欢，还能通过 `typeof` 操作符的返回值确保不是空值：

    function doSomething(callback?: () => void) {
      if (typeof callback === "function") {
        callback();
      }
    }
    

[#](#summary)总结
--------------------

非空类型是 TypeScript 类型系统中非常基础和有价值的一个功能。它允许我们明确指定变量或属性是不是可为空，确保属性访问和函数调用是安全的，避免了编译期间的空值错误。

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。