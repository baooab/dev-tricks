# [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列文章

by Marius Schulz

1. [非空类型(Non-Nullable Types)](./non-nullable-types-in-typescript.md)：TypeScript 2.0 增加了 `--strictNullChecks` flag，支持将 `null` 和 `undefined` 作为单独类型处理。
1. [基于控制流的类型分析(Control Flow Based Type Analysis)](./control-flow-based-type-analysis-in-typescript.md)：TypeScript 2.0 新增特性。联合类型变量在经过 `if` 判断后，类型范围会变小。