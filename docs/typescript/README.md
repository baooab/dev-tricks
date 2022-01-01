# [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列文章

by Marius Schulz

1. [非空类型(Non-Nullable Types)](./non-nullable-types-in-typescript.md)：TypeScript 2.0 增加了 `--strictNullChecks` flag，支持将 `null` 和 `undefined` 作为单独类型处理。
1. [基于控制流的类型分析(Control Flow Based Type Analysis)](./control-flow-based-type-analysis-in-typescript.md)：TypeScript 2.0 新增特性。联合类型变量在经过 `if` 判断后，类型范围会变小。
1. [获取类型声明文件(Acquiring Type Declaration Files)](./acquiring-type-declaration-files-in-typescript.md)：TypeScript 2.0 后，如果项目中用到了 Lodash 库，想得到类型支持，从 npm 直接安装 `@types/lodash` 声明包即可。
1. [只读属性(Read-Only Properties)](./read-only-properties-in-typescript.md)：TypeScript 2.0 为类型系统增加了一个 `readonly` 修饰符，用于声明不能被修改的属性。
1. [标记联合类型(Tagged Union Types)](./tagged-union-types-in-typescript.md): 还是 TypeScript 2.0 引入的一个有用的特性。定义联合类型时，每个成员类型都包含同一个属性，用唯一的一个字面量类型做区分。在不借助任何类型断言的情况下，就能将联合类型的范围缩小至某个具体的成员类型。
1. [WIP][TypeScript 2.0 中增加的字面量类型(More Literal Types)](./more-literal-types-in-typescript.md): 之前只有字符串字面量类型，现在增加了布尔、数值和枚举字面量类型。