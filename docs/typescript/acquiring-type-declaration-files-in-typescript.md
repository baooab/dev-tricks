TypeScript 项目中如何获取类型声明文件？
==============================================

> Marius Schulz, [“Acquiring Type Declaration Files in TypeScript”](https://mariusschulz.com/blog/acquiring-type-declaration-files-in-typescript), October 23, 2016

TypeScript 2.0 后，获取 JavaScript 库的类型信息变得更容易了。不再需要借助像 [typings](https://github.com/typings/typings) 或 [tsd](https://github.com/DefinitelyTyped/tsd) 这样的工具，npm 上有现成的类型声明包可供使用。

[![Egghead lesson: Install TypeScript declarations from](https://mariusschulz.com/images/content/egghead_lesson_typescript_declarations-2x.nam2cekuwu.imm.png)](https://egghead.io/lessons/typescript-install-typescript-declarations-from-npm?af=9g63dt)

从 npm 下载类型声明文件
------------------------------------------------------------------------------------------------

假设要在你的 TypeScript 项目中使用 Lodash：

```bash
npm install --save lodash
```

执行完上述命令后，Lodash 被安装在 `node_modules` 目录，并且作为项目依赖被列举在 `package.json` 文件中。由于 Lodash 源码是采用 JavaScript 编写的，因此并没有提供对应的类型声明文件。

还是用 npm，安装 `@types/lodash` 包就能得到 TypeScript 所需要的类型声明了：

![npm install --save @types/lodash](https://mariusschulz.com/images/content/npm_install_types_lodash-2x.yvlxb75hxu.imm.png)

注意类型声明包的命名方式——以 `@types/` 作前缀，后面跟上原始包的名称。大多数的包都会遵从这种命名约定。如果不确定，还可以使用 [Type Search](https://www.typescriptlang.org/dt/search) 工具查找指定库的类型声明包。

使用 npm 管理类型信息的好处，就是可以让类型声明包跟项目中的其他依赖一样被列举在 `package.json` 中，使用版本号管理，还是同用一个工具。

类型声明文件在哪里？
-----------------------------------------------------------------------------------

跟其他 npm 包类似，类型声明包是安装在 `node_modules` 目录中、`@types` 目录下。以安装 Lodash 类型包为例，会有一个 `lodash` 目录，目录下有一个 `index.d.ts` 文件， 包含 Lodash 库的所有工具方法的类型定义：

![@types folder](https://mariusschulz.com/images/content/node_modules-@types-folder-2x.t2kpsqy7h2.imm.png)

TypeScript 编译器查找类型声明时，会找到 `@types` 目录，自动匹配类型，无需进行任何配置。

是谁创建了类型声明包？
-----------------------------------------------------------------------------------------

在背后，类型声明包由 [types-publisher](https://github.com/Microsoft/types-publisher) 服务自动创建，它将 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 仓库的内容发布到 npm 上。这样，贡献到 DefinitelyTyped 仓库的代码最终会被推送到 npm，等待被消费。

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
