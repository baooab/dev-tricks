Acquiring Type Declaration Files in TypeScript
获取类型声明文件
==============================================

> Marius Schulz, [“Acquiring Type Declaration Files in TypeScript”](https://mariusschulz.com/blog/acquiring-type-declaration-files-in-typescript), October 23, 2016


In TypeScript 2.0, it has become significantly easier to acquire type information for JavaScript libraries. There's no longer a need for additional tools such as [typings](https://github.com/typings/typings) or [tsd](https://github.com/DefinitelyTyped/tsd). Instead, type declaration packages are directly available on npm.

获取 JavaScript 库的类型信息变得更容易了。不再需要借助额外的工具，npm 上有现成的类型声明包可供使用。

[![Egghead lesson: Install TypeScript declarations from](https://mariusschulz.com/images/content/egghead_lesson_typescript_declarations-2x.nam2cekuwu.imm.png)](https://egghead.io/lessons/typescript-install-typescript-declarations-from-npm?af=9g63dt)

从 npm 下载类型声明文件
------------------------------------------------------------------------------------------------

Let's assume you want to use Lodash in one of your TypeScript projects:

假设要在你的 TypeScript 项目中使用 Lodash：

```bash
npm install --save lodash
```

After running this command, Lodash is installed into the `node_modules` folder and is also listed as a dependency within your project's `package.json` file. However, there's no type information available for TypeScript because Lodash is written in JavaScript and doesn't ship with type declaration files.

执行完上述命令后，Lodash 被安装在 `node_modules` 目录，并且作为项目依赖被列举在 `package.json` 文件中。由于 Lodash 源码是采用 JavaScript 编写的，因此并没有对应的类型声明文件提供。

Using npm again, you can now install the `@types/lodash` package which contains the corresponding type declarations that TypeScript needs:

还是用 npm，安装 `@types/lodash` 包就能得到 TypeScript 所需要的类型声明信息了：

![npm install --save @types/lodash](https://mariusschulz.com/images/content/npm_install_types_lodash-2x.yvlxb75hxu.imm.png)

Note how the type declaration package is named after the original npm package, prefixed with `@types/`. Most packages should follow this convention, but you can always fall back to [Type Search](https://www.typescriptlang.org/dt/search) to find the name of the type declaration package for a given library.

注意类型声明包的命名方式，以 `@types/` 作为前缀，后面跟上原始包的名称。大多数的包都会遵从这种命名约定，当然也可以使用 Type Search 工具查找指定库的类型声明包。

The benefit of using npm for managing type information is that type declaration packages will be listed in your `package.json` alongside your other dependencies. In addition, they can be properly versioned, just like any other npm package. Plus, you only need a single package manager, npm, that is set up already anyway.

使用 npm 管理类型信息的好处，就是可以跟项目中的其他依赖一样被列举在 `package.json` 中，能用版本管理，还是同用一个工具。

类型声明文件在哪里？
-----------------------------------------------------------------------------------

Like any other npm package, the type declaration packages are installed in the `node_modules` folder. Within it, there's a `@types` folder which contains all typings. In the above example, it'll contain a `lodash` folder, within which you'll find the `index.d.ts` file with all the Lodash type information:

![@types folder](https://mariusschulz.com/images/content/node_modules-@types-folder-2x.t2kpsqy7h2.imm.png)

The TypeScript compiler understands this convention and will pick up type declarations within the `@types` folder automatically. There's no need to update the `tsconfig.json` or any other configuration file.

是谁创建了类型声明包？
-----------------------------------------------------------------------------------------

Behind the scenes, the type declaration packages are automatically created by the [types-publisher](https://github.com/Microsoft/types-publisher) service. It publishes the contents of the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repository to npm. That way, typings contributed to DefinitelyTyped end up on npm, ready for consumption.

在背后，类型声明包会由 [types-publisher](https://github.com/Microsoft/types-publisher) 服务自动创建。它将 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 仓库的内容发布到 npm。这样，贡献到 DefinitelyTyped 仓库代码最终被推送到 npm，等待被消费。

本篇文章是 [TypeScript Evolution](https://mariusschulz.com/blog/series/typescript-evolution) 系列中的一篇。
