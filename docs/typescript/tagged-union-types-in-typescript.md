TypeScript 中的标记联合类型
================================

> Marius Schulz, [“Tagged Union Types in TypeScript”](https://mariusschulz.com/blog/tagged-union-types-in-typescript), November 3, 2016

TypeScript 2.0 中实现了一个相当有用的特性：_标记联合类型_，这个特性在其他语言中还称为 _总类型（sum types）_ 或 _区别联合类型（discriminated union types）_。标记联合类型是一个联合类型，其成员类型里有一个区分属性（discriminant property）使用字面量类型来定义。

上述的定义有些抽象，接下来我们看两个例子说明下标记联合类型的使用场景。

使用标记联合类型构建支付方法
------------------------------------------------------------------------------------------------------

假设我们要构建下述可供用户选择的支付方式：

*   **现金（Cash）** 不需要额外的其他信息
*   **PayPal** 需要提供一个邮件地址
*   **信用卡（Credit card）** 需要提供卡号和安全码

针对每一种支付方式，我们创建一个 TypeScript 接口：

```ts
interface Cash {
  kind: "cash";
}

interface PayPal {
  kind: "paypal";
  email: string;
}

interface CreditCard {
  kind: "credit";
  cardNumber: string;
  securityCode: string;
}
```

注意，除了必要的一些信息，每个类型都有一个 `kind` 属性，即所谓的 _区别属性_。这是一个 [字符串字面量](./string-literal-types-in-typescript.md)（后续就会学到）。

我们还定义了一个 `PaymentMethod` 类型，它是由上述三种类型组合而成的联合类型，表示所支持的支付方式是三个 _组合类型（constituent types）_ 中任一个：

```ts
type PaymentMethod = Cash | PayPal | CreditCard;
```

现在有了支付类型，我们再创建一个接收此类型的函数，它返回一段可供人阅读的支付描述：

```ts
function describePaymentMethod(method: PaymentMethod) {
  switch (method.kind) {
    case "cash":
      // Here, method has type Cash
      return "Cash";

    case "paypal":
      // Here, method has type PayPal
      return `PayPal (${method.email})`;

    case "credit":
      // Here, method has type CreditCard
      return `Credit card (${method.cardNumber})`;
  }
}
```

首先，这个函数用到的类型注解非常少——就一个参数 `method` 用到了类型注解！除此之外，整个函数体都是纯 ES2015 代码。

在 `switch` 语句内部的每个“case”中，TypeScript 编译器都会将联合类型的范围缩小至某个具体的成员类型。以 `"paypal"` 为例，`method` 参数的类型从 `PaymentMethod` 缩小至 `PayPal`。因此，在无需添加额外类型断言（type assertion）的情况下，我们能访问 `email` 属性。

在底层，编译器会跟踪程序控制流来缩小标签联合类型的范围。除了 `switch` 语句，编译器还能处理条件语句以及赋值和 `return` 语句：

```ts
function describePaymentMethod(method: PaymentMethod) {
  if (method.kind === "cash") {
    // Here, method has type Cash
    return "Cash";
  }

  // Here, method has type PayPal | CreditCard

  if (method.kind === "paypal") {
    // Here, method has type PayPal
    return `PayPal (${method.email})`;
  }

  // Here, method has type CreditCard
  return `Credit card (${method.cardNumber})`;
}
```

这种程度的 [控制流分析](./control-flow-based-type-analysis-in-typescript.md) 使得使用标签联合类型更加顺畅。使用最少的 TypeScript 语法，仍能享受到类型检查和代码补全的好处。嗯，的确是一场非常愉悦的编码体验。

使用标记联合类型构建 Redux Action
--------------------------------------------------------------------------------------------------

标签联合类型的另一个用例就是在你的 TypeScript 项目用到 Redux 的时候。再来看另一个快速示例：包含一个 model、两个 action 和一个 reducer，是一个待办程序（相信你已经猜到了）。

我们用一个简单的 `Todo` 类型表示一个待办项。注意，这里使用了 [`readonly` 修饰符](./read-only-properties-in-typescript.md) 告诉 TypeScript 编译器属性是不可修改的：

```ts
interface Todo {
  readonly text: string;
  readonly done: boolean;
}
```

用户可以添加新的待办项或者调整已存在待办项的完成状态。为了满足这个需求，我们需要两个 Redux Action。可以这样定义类型：

```ts
interface AddTodo {
  type: "ADD_TODO";
  text: string;
}

interface ToggleTodo {
  type: "TOGGLE_TODO";
  index: number;
}
```

就跟在之前的例子中展示的那样，Redux Action 类型应该包含应用所支持的所有 Action 集合：

```ts
type ReduxAction = AddTodo | ToggleTodo;
```

在这个用例中，`type` 属性作为区别属性存在，遵循 Redux 的命名约定。现在，我们再来添加一个 reducer 操作这些 Action：

```ts
function todosReducer(
  state: ReadonlyArray<Todo> = [],
  action: ReduxAction
): ReadonlyArray<Todo> {
  switch (action.type) {
    case "ADD_TODO":
      // action has type AddTodo here
      return [...state, { text: action.text, done: false }];

    case "TOGGLE_TODO":
      // action has type ToggleTodo here
      return state.map((todo, index) => {
        if (index !== action.index) {
          return todo;
        }

        return {
          text: todo.text,
          done: !todo.done
        };
      });

    default:
      return state;
  }
}
```

同样，只有函数签名包含类型注释，剩下的都是普通的 ES2015 代码。

我们遵循与前面示例相同的逻辑。基于 Redux Action 的 `type` 属性，我们在不修改已有状态的情况下，计算出新状态。在 `switch` 语句的 `case` 中，在不借助任何类型断言的情况下就能访问特定 Action 下的 `text` 或 `index` 属性。

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
