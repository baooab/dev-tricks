Acquiring Type Declaration Files in TypeScript
==============================================

> Marius Schulz, [“Acquiring Type Declaration Files in TypeScript”](https://mariusschulz.com/blog/acquiring-type-declaration-files-in-typescript), October 23, 2016


In TypeScript 2.0, it has become significantly easier to acquire type information for JavaScript libraries. There's no longer a need for additional tools such as [typings](https://github.com/typings/typings) or [tsd](https://github.com/DefinitelyTyped/tsd). Instead, type declaration packages are directly available on npm.

[![Egghead lesson: Install TypeScript declarations from](https://mariusschulz.com/images/content/egghead_lesson_typescript_declarations-2x.nam2cekuwu.imm.png)](https://egghead.io/lessons/typescript-install-typescript-declarations-from-npm?af=9g63dt)

从 npm 下载类型声明文件
------------------------------------------------------------------------------------------------

Let's assume you want to use Lodash in one of your TypeScript projects:

```bash
npm install --save lodash
```

After running this command, Lodash is installed into the `node_modules` folder and is also listed as a dependency within your project's `package.json` file. However, there's no type information available for TypeScript because Lodash is written in JavaScript and doesn't ship with type declaration files.

Using npm again, you can now install the `@types/lodash` package which contains the corresponding type declarations that TypeScript needs:

![npm install --save @types/lodash](https://mariusschulz.com/images/content/npm_install_types_lodash-2x.yvlxb75hxu.imm.png)

Note how the type declaration package is named after the original npm package, prefixed with `@types/`. Most packages should follow this convention, but you can always fall back to [Type Search](https://www.typescriptlang.org/dt/search) to find the name of the type declaration package for a given library.

The benefit of using npm for managing type information is that type declaration packages will be listed in your `package.json` alongside your other dependencies. In addition, they can be properly versioned, just like any other npm package. Plus, you only need a single package manager, npm, that is set up already anyway.

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