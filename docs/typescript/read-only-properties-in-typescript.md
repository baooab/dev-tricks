TypeScript 中的只读属性
==================================

> Marius Schulz, [“Read-Only Properties in TypeScript”](https://mariusschulz.com/blog/read-only-properties-in-typescript), October 31, 2016

TypeScript 2.0 增加了 `readonly` 修饰符，用于标记只读属性。只读属性仅允许两种场景下的赋值，一种是在初始化的时候，另一种是在类的构造函数中，其余场景都不允许赋值。

我们来看个例子。有一个声明了两个只读属性 `x` 和 `y` 的简单类型 `Point`：

```ts
type Point = {
    readonly x: number;
    readonly y: number;
};
```

现在创建一个表示原点坐标的 `origin` 对象，`x` 和 `y` 的初始值都为 `0`：

```ts
const origin: Point = { x: 0, y: 0 };
```

因为 `x` 和 `y` 都被声明为只读的，所以它们是不能被修改的：

```ts
// Error: Left-hand side of assignment expression
// cannot be a constant or read-only property
origin.x = 100;
```

一个更实际的例子
------------------------------------------------------

上面的例子可能不太有说服力(确实)，考虑下面的函数：

```ts
function moveX(p: Point, offset: number): Point {
    p.x += offset;
    return p;
}
```

`moveX` 函数不能修改给定坐标点的 `x` 属性，因为这个属性是只读的，否则 TypeScript 编译器会抱怨的：

![Forbidden assignment to readonly property in TypeScript](https://mariusschulz.com/images/content/typescript_readonly_properties-2x.a5pst655tj.imm.png)

相反，`moveX` 应该返回一个更新后的新坐标点，类似这样：

```ts
function moveX(p: Point, offset: number): Point {
    return {
        x: p.x + offset,
        y: p.y
    };
}
```

现在编译器就很开心了，因为我们没有修改只读属性，而是返回了一个新的坐标点：

只读类属性
----------------------------------------------------------

我们还可以为类的属性应用 `readonly` 修饰符。下面的 `Circle` 类有一个只读属性 `radius` 和一个获取属性 `area`（也是只读的，因为没有 setter）：


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

注意，这里用到了 [ES2016 新的指数操作符](https://mariusschulz.com/blog/the-exponentiation-operator-in-javascript)。`radius` 和 `area` 属性都能被外部访问（没有标记为 `private`），同时又不能被修改（都是只读的）：

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

只读索引签名
----------------------------------------------------------

而且，索引签名也能用 `readonly` 修饰符标记成只读的，从而来避免索引属性被赋值。下面的 `ReadonlyArray<T>` 就是一个例子：

```ts
interface ReadonlyArray<T> {
    readonly length: number;
    // ...
    readonly [n: number]: T;
}
```

因为索引是只读的，所以编译器认为下面的赋值是无效的：

```ts
const primesBelow10: ReadonlyArray<number> = [2, 3, 5, 7];

// Error: Left-hand side of assignment expression
// cannot be a constant or read-only property
primesBelow10[4] = 11;
```

`readonly` vs. 不可变
---------------------------------------------------------

`readonly` 修饰符是 TypeScript 类型系统的一部分，只用来帮助编译器检查属性赋值是否合法。一旦编译成 JavaScript 代码后，`readonly` 标记会被移除。可以尝试 [这个简单的例子](https://www.typescriptlang.org/play?#code/C4TwDgpgBACg9gSwHbCgXigbwLACgoFQBOEAhgCZxIA2IUAHgFxRICuAtgEYREDcehYmUo06IZmy49+uAL4y8AYyoBnVHCIIA5smbxkqDJgbMADABoo4qKajy8QA) 看下只读属性是如何被转译的。

因为 `readonly` 只是一个编译器设施，所以是无法为运行时提供保障的。也就是说，它是类型系统的另一个特性，通过让编译器检查 TypeScript 代码中意外的属性赋值，来帮助你写出正确的代码。

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
