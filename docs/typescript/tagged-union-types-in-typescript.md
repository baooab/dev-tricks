TypeScript 中的标记联合类型
================================

> Marius Schulz, [“Tagged Union Types in TypeScript”](https://mariusschulz.com/blog/tagged-union-types-in-typescript), November 3, 2016

TypeScript 2.0 implements a rather useful feature: _tagged union types_, which you might know as _sum types_ or _discriminated union types_ from other programming languages. A tagged union type is a union type whose member types all define a discriminant property of a literal type.

TypeScript 2.0 中实现了一个相当有用的特性：_标记联合类型_，在其他语言中类似特性还称为 _总类型（sum types）_ 或 _区别联合类型（discriminated union types）_。标记联合类型是一个联合类型，其成员类型里都用一个字面量类型定义了一个区分属性。

Because the above definition is rather theoretical, we're going to be looking at two examples that illustrate how tagged union types would be used in practice.

上述的定义有些抽象，接下来我们看两个例子说明下标记联合类型的使用场景。

使用标记联合类型构建支付方法
------------------------------------------------------------------------------------------------------

假设我们要构建下述可供用户选择的支付方式：

*   **现金（Cash）** 不需要额外的其他信息，
*   **PayPal** 需要提供一个邮件地址，或者
*   **信用卡（Credit card）** 需要提供卡号和安全码。

For each of these payment methods, we can create a TypeScript interface:

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

Note that, in addition to the required information, each type has a `kind` property — the so-called _discriminant property_. It's of a [string literal type](/blog/string-literal-types-in-typescript) in each case here. We'll look at the discriminant property in a minute.

注意，处理必要的信息，每个类型都有一个 `kind` 属性——所谓的 _区别属性_。是一个字符串字面量。我们马上就能看到。

Let's now also define a `PaymentMethod` type that is the union of the three types we just defined. This way, we're stating that every payment method must have exactly one of the three given _constituent types_:

我们还定义一个 `PaymentMethod` 类型，它是由上述三种类型组合而成的联合类型。我们就声明了每种支付方法必须恰好是三个 _组合类型（constituent types）_ 中的一个：

```ts
type PaymentMethod = Cash | PayPal | CreditCard;
```

Now that our types are in place, let's write a function that accepts a payment method and returns a human-readable description of it:

现在有了支付类型，我们再创建一个接收此类型的函数，它返回可供人阅读的一段支付方式描述：

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

First of all, notice how few type annotations the function contains — just a single one for its `method` parameter! Besides that, the body of the function is pure ES2015 code.

Within each case of the `switch` statement, the TypeScript compiler narrows the union type to one of its member types. For instance, within the `"paypal"` case, the type of the `method` parameter is narrowed from `PaymentMethod` to `PayPal`. Therefore, we can access the `email` property without having to add a type assertion.

In essence, the compiler tracks the program control flow to narrow the tagged union types. Other than `switch` statements, it understands conditions as well as the effects of assignments and returns:

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

This degree of [control flow analysis](/blog/control-flow-based-type-analysis-in-typescript) makes working with tagged union types smooth. With minimal TypeScript syntax overhead, you can write almost plain JavaScript and still benefit from type checking and code completion. A pleasant editing experience, indeed!

使用标记联合类型构建 Redux Actions
--------------------------------------------------------------------------------------------------

Another use case where tagged union types shine is when you're using Redux in your TypeScript applications. Let's construct another quick example, consisting of a model, two actions, and a reducer for — you guessed it — a todo application.

Here's a simplified `Todo` type that represents a single todo. Note how we're using the [`readonly` modifier](/blog/read-only-properties-in-typescript) to have the TypeScript compiler check for unintended property mutation:

```ts
interface Todo {
  readonly text: string;
  readonly done: boolean;
}
```

Users can add new todos and toggle the completion status of existing ones. For these requirements, we're going to need two Redux actions, which we can type as follows:

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

As in the previous example, a Redux action can now be modelled as the union of all actions our application supports:

```ts
type ReduxAction = AddTodo | ToggleTodo;
```

In this case, the `type` property serves as the discriminant property and follows the naming scheme common in Redux. Let's now add a reducer which works with these two actions:

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

Again, only the function signature contains type annotations. The remainder of the code is plain ES2015 and in no way specific to TypeScript.

We're following the same logic as in the previous example here. Based on the `type` property of the Redux action, we compute the new state without modifying the existing one. Within the cases of the `switch` statements, we can access the `text` and and `index` properties specific to each action type without any type assertions.

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
