Tagged Union Types in TypeScript
================================

> Marius Schulz, [“Tagged Union Types in TypeScript”](https://mariusschulz.com/blog/tagged-union-types-in-typescript), November 3, 2016


TypeScript 2.0 implements a rather useful feature: _tagged union types_, which you might know as _sum types_ or _discriminated union types_ from other programming languages. A tagged union type is a union type whose member types all define a discriminant property of a literal type.

Because the above definition is rather theoretical, we're going to be looking at two examples that illustrate how tagged union types would be used in practice.

[#](#modeling-payment-methods-with-tagged-union-types)Modeling Payment Methods with Tagged Union Types
------------------------------------------------------------------------------------------------------

Let's say we want to model the following payment methods that users of a system can choose from:

*   **Cash** without further information,
*   **PayPal** with a given email address, or
*   **Credit card** with a given card number and security code.

For each of these payment methods, we can create a TypeScript interface:

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

Note that, in addition to the required information, each type has a `kind` property — the so-called _discriminant property_. It's of a [string literal type](/blog/string-literal-types-in-typescript) in each case here. We'll look at the discriminant property in a minute.

Let's now also define a `PaymentMethod` type that is the union of the three types we just defined. This way, we're stating that every payment method must have exactly one of the three given _constituent types_:

    type PaymentMethod = Cash | PayPal | CreditCard;

Now that our types are in place, let's write a function that accepts a payment method and returns a human-readable description of it:

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

First of all, notice how few type annotations the function contains — just a single one for its `method` parameter! Besides that, the body of the function is pure ES2015 code.

Within each case of the `switch` statement, the TypeScript compiler narrows the union type to one of its member types. For instance, within the `"paypal"` case, the type of the `method` parameter is narrowed from `PaymentMethod` to `PayPal`. Therefore, we can access the `email` property without having to add a type assertion.

In essence, the compiler tracks the program control flow to narrow the tagged union types. Other than `switch` statements, it understands conditions as well as the effects of assignments and returns:

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

This degree of [control flow analysis](/blog/control-flow-based-type-analysis-in-typescript) makes working with tagged union types smooth. With minimal TypeScript syntax overhead, you can write almost plain JavaScript and still benefit from type checking and code completion. A pleasant editing experience, indeed!

[#](#modeling-redux-actions-with-tagged-union-types)Modeling Redux Actions with Tagged Union Types
--------------------------------------------------------------------------------------------------

Another use case where tagged union types shine is when you're using Redux in your TypeScript applications. Let's construct another quick example, consisting of a model, two actions, and a reducer for — you guessed it — a todo application.

Here's a simplified `Todo` type that represents a single todo. Note how we're using the [`readonly` modifier](/blog/read-only-properties-in-typescript) to have the TypeScript compiler check for unintended property mutation:

    interface Todo {
      readonly text: string;
      readonly done: boolean;
    }

Users can add new todos and toggle the completion status of existing ones. For these requirements, we're going to need two Redux actions, which we can type as follows:

    interface AddTodo {
      type: "ADD_TODO";
      text: string;
    }
    
    interface ToggleTodo {
      type: "TOGGLE_TODO";
      index: number;
    }

As in the previous example, a Redux action can now be modelled as the union of all actions our application supports:

    type ReduxAction = AddTodo | ToggleTodo;

In this case, the `type` property serves as the discriminant property and follows the naming scheme common in Redux. Let's now add a reducer which works with these two actions:

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

Again, only the function signature contains type annotations. The remainder of the code is plain ES2015 and in no way specific to TypeScript.

We're following the same logic as in the previous example here. Based on the `type` property of the Redux action, we compute the new state without modifying the existing one. Within the cases of the `switch` statements, we can access the `text` and and `index` properties specific to each action type without any type assertions.

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
