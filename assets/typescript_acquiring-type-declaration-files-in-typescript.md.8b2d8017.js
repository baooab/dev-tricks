import{o as e,c as r,a as t}from"./app.808b26de.js";const p='{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"从 npm 下载类型声明文件","slug":"从-npm-下载类型声明文件"},{"level":2,"title":"类型声明文件在哪里？","slug":"类型声明文件在哪里？"},{"level":2,"title":"是谁创建了类型声明包？","slug":"是谁创建了类型声明包？"}],"relativePath":"typescript/acquiring-type-declaration-files-in-typescript.md","lastUpdated":1640926748094}',a={},s=t('<h1 id="typescript-项目中如何获取类型声明文件？"><a class="header-anchor" href="#typescript-项目中如何获取类型声明文件？" aria-hidden="true">#</a> TypeScript 项目中如何获取类型声明文件？</h1><blockquote><p>Marius Schulz, <a href="https://mariusschulz.com/blog/acquiring-type-declaration-files-in-typescript" target="_blank" rel="noopener noreferrer">“Acquiring Type Declaration Files in TypeScript”</a>, October 23, 2016</p></blockquote><p>TypeScript 2.0 后，获取 JavaScript 库的类型信息变得更容易了。不再需要借助像 <a href="https://github.com/typings/typings" target="_blank" rel="noopener noreferrer">typings</a> 或 <a href="https://github.com/DefinitelyTyped/tsd" target="_blank" rel="noopener noreferrer">tsd</a> 这样的工具，npm 上有现成的类型声明包可供使用。</p><p><a href="https://egghead.io/lessons/typescript-install-typescript-declarations-from-npm?af=9g63dt" target="_blank" rel="noopener noreferrer"><img src="https://mariusschulz.com/images/content/egghead_lesson_typescript_declarations-2x.nam2cekuwu.imm.png" alt="Egghead lesson: Install TypeScript declarations from"></a></p><h2 id="从-npm-下载类型声明文件"><a class="header-anchor" href="#从-npm-下载类型声明文件" aria-hidden="true">#</a> 从 npm 下载类型声明文件</h2><p>假设要在你的 TypeScript 项目中使用 Lodash：</p><div class="language-bash line-numbers-mode"><pre><code><span class="token function">npm</span> <span class="token function">install</span> --save lodash\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>执行完上述命令后，Lodash 被安装在 <code>node_modules</code> 目录，并且作为项目依赖被列举在 <code>package.json</code> 文件中。由于 Lodash 源码是采用 JavaScript 编写的，因此并没有提供对应的类型声明文件。</p><p>还是用 npm，安装 <code>@types/lodash</code> 包就能得到 TypeScript 所需要的类型声明了：</p><p><img src="https://mariusschulz.com/images/content/npm_install_types_lodash-2x.yvlxb75hxu.imm.png" alt="npm install --save @types/lodash"></p><p>注意类型声明包的命名方式——以 <code>@types/</code> 作前缀，后面跟上原始包的名称。大多数的包都会遵从这种命名约定。如果不确定，还可以使用 <a href="https://www.typescriptlang.org/dt/search" target="_blank" rel="noopener noreferrer">Type Search</a> 工具查找指定库的类型声明包。</p><p>使用 npm 管理类型信息的好处，就是可以让类型声明包跟项目中的其他依赖一样被列举在 <code>package.json</code> 中，使用版本号管理，还是同用一个工具。</p><h2 id="类型声明文件在哪里？"><a class="header-anchor" href="#类型声明文件在哪里？" aria-hidden="true">#</a> 类型声明文件在哪里？</h2><p>跟其他 npm 包类似，类型声明包是安装在 <code>node_modules</code> 目录中、<code>@types</code> 目录下。以安装 Lodash 类型包为例，会有一个 <code>lodash</code> 目录，目录下有一个 <code>index.d.ts</code> 文件， 包含 Lodash 库的所有工具方法的类型定义：</p><p><img src="https://mariusschulz.com/images/content/node_modules-@types-folder-2x.t2kpsqy7h2.imm.png" alt="@types folder"></p><p>TypeScript 编译器查找类型声明时，会找到 <code>@types</code> 目录，自动匹配类型，无需进行任何配置。</p><h2 id="是谁创建了类型声明包？"><a class="header-anchor" href="#是谁创建了类型声明包？" aria-hidden="true">#</a> 是谁创建了类型声明包？</h2><p>在背后，类型声明包由 <a href="https://github.com/Microsoft/types-publisher" target="_blank" rel="noopener noreferrer">types-publisher</a> 服务自动创建，它将 <a href="https://github.com/DefinitelyTyped/DefinitelyTyped" target="_blank" rel="noopener noreferrer">DefinitelyTyped</a> 仓库的内容发布到 npm 上。这样，贡献到 DefinitelyTyped 仓库的代码最终会被推送到 npm，等待被消费。</p><p>本篇文章是 <a href="https://mariusschulz.com/blog/series/typescript-evolution" target="_blank" rel="noopener noreferrer">TypeScript Evolution</a> 系列中的一篇。</p>',19);a.render=function(t,p,a,n,o,i){return e(),r("div",null,[s])};export default a;export{p as __pageData};
