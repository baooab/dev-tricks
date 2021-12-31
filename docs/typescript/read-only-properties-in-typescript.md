TypeScript 中的只读属性
==================================

> Marius Schulz, [“Read-Only Properties in TypeScript”](https://mariusschulz.com/blog/read-only-properties-in-typescript), October 31, 2016


In TypeScript 2.0, the `readonly` modifier was added to the language. Properties marked with `readonly` can only be assigned to during initialization or from within a constructor of the same class. All other assignments are disallowed.

增加了 `readonly` 修饰符，用于标记只读属性。只读属性仅允许两种场景下的赋值，一种是在初始化的时候，另一种是在类的构造函数中，其余场景都不允许。

Let's take a look at an example. Here's a simple `Point` type that declares two read-only properties, `x` and `y`:

我们来看个例子。有一个声明了两个只读属性 `x` 和 `y` 的简单类型 `Point：

```ts
type Point = {
    readonly x: number;
    readonly y: number;
};
```

We can now create an object representing the point (0|0), the origin, and initialize both `x` and `y` with the value `0`:

现在创建一个表示原点坐标的 origin 对象：

```ts
const origin: Point = { x: 0, y: 0 };
```

However, because `x` and `y` are marked `readonly`, we cannot change the value of either property afterwards:

因为 `x` 和 `y` 都被声明为只读的，所以它们是不能被修改的：

```ts
// Error: Left-hand side of assignment expression
// cannot be a constant or read-only property
origin.x = 100;
```

A More Realistic Example
一个更实际的例子
------------------------------------------------------

While the above example might seem contrived (and it is), consider a function like the following:

上面的例子可能不太有说服力，考虑下面的函数：

```ts
function moveX(p: Point, offset: number): Point {
    p.x += offset;
    return p;
}
```

The `moveX` function should not modify the `x` property of the point it was given. Because of the `readonly` modifier, the TypeScript compiler will yell at you if you try:

`moveX` 函数不能修改给定坐标点的 `x` 属性，否则 TypeScript 编译器会抱怨的：

![Forbidden assignment to readonly property in TypeScript](https://mariusschulz.com/images/content/typescript_readonly_properties-2x.a5pst655tj.imm.png)

Instead, `moveX` should return a new point with updated property values, which could look like this:

相反，`moveX` 应该返回一个更新了属性值的新坐标点，类似这样：

```ts
function moveX(p: Point, offset: number): Point {
    return {
    x: p.x + offset,
    y: p.y
    };
}
```

Now the compiler is happy because we're no longer trying to assign a value to a read-only property. We're creating a new point whose properties are initialized with updated values, which is perfectly fine.

现在编译器就很开心了，因为我们没有修改只读属性，而是返回了一个新的坐标点：

Read-Only Class Properties
只读类属性
----------------------------------------------------------

You can also apply the `readonly` modifier to properties declared within a class. Here's a `Circle` class with a read-only `radius` property and a gettable `area` property, which is implicitly read-only because there's no setter:

也能为类属性应用 `readonly` 修饰符。下面的 Circle 类有一个只读的 radius 属性和一个获取属性（getter） area：


```ts
class Circle {
    readonly radius: number;

    constructor(radius: number) {
    this.radius = radius;
    }

    get area() {
    return Math.PI * this.radius ** 2;
    }
}
```

Note that the radius is squared using the [ES2016 exponentiation operator](/blog/the-exponentiation-operator-in-javascript). Both the `radius` and the `area` property can be read from outside the class (because neither one is marked `private`), but not written to (because both are marked `readonly`):

注意，这里用到了 ES2016 的新操作符。两个属性都能被外部访问，又是不能被修改的：

```ts
const unitCircle = new Circle(1);
unitCircle.radius; // 1
unitCircle.area; // 3.141592653589793

// Error: Left-hand side of assignment expression
// cannot be a constant or read-only property
unitCircle.radius = 42;

// Error: Left-hand side of assignment expression
// cannot be a constant or read-only property
unitCircle.area = 42;
```

Read-Only Index Signatures
只读索引签名
----------------------------------------------------------

Additionally, index signatures can be marked with the `readonly` modifier. The `ReadonlyArray<T>` type makes use of such an index signature to prevent assignments to indexed properties:

而且，索引签名也能用 `readonly` 修饰符标记为只读的。

```ts
interface ReadonlyArray<T> {
    readonly length: number;
    // ...
    readonly [n: number]: T;
}
```

Because of the read-only index signature, the compiler flags the following assignment as invalid:

因为索引是只读的，所以编译器认为下面的赋值是无效的：

```ts
const primesBelow10: ReadonlyArray<number> = [2, 3, 5, 7];

// Error: Left-hand side of assignment expression
// cannot be a constant or read-only property
primesBelow10[4] = 11;
```

`readonly` vs. Immutability
`readonly` vs. 不可修改
---------------------------------------------------------

The `readonly` modifier is part of TypeScript's type system. It's only used by the compiler to check for illegal property assignments. Once the TypeScript code has been compiled to JavaScript, all notions of `readonly` are gone. Feel free to play around with this [little sample](https://www.typescriptlang.org/play?#code/C4TwDgpgBACg9gSwHbCgXigbwLACgoFQBOEAhgCZxIA2IUAHgFxRICuAtgEYREDcehYmUo06IZmy49+uAL4y8AYyoBnVHCIIA5smbxkqDJgbMADABoo4qKajy8QA) to see how read-only properties are transpiled.

readonly 修饰符是 TypeScript 类型系统的一部分。只用来帮助编译器检查属性赋值是否合法。一旦编译成 JavaScript 代码后，`readonly` 标记会被移除。

Because `readonly` is only a compile-time artifact, there's no protection against property assignments at runtime whatsoever. That said, it's another feature of the type system that helps you write correct code by having the compiler check for unintended property assignments from within your TypeScript code base.

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
