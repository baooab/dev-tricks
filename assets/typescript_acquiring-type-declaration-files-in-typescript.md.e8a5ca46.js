import{o as e,c as t,a}from"./app.808b26de.js";const n='{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"从 npm 下载类型声明文件","slug":"从-npm-下载类型声明文件"},{"level":2,"title":"类型声明文件在哪里？","slug":"类型声明文件在哪里？"},{"level":2,"title":"是谁创建了类型声明包？","slug":"是谁创建了类型声明包？"}],"relativePath":"typescript/acquiring-type-declaration-files-in-typescript.md","lastUpdated":1640655145806}',i={},r=a('<h1 id="acquiring-type-declaration-files-in-typescript"><a class="header-anchor" href="#acquiring-type-declaration-files-in-typescript" aria-hidden="true">#</a> Acquiring Type Declaration Files in TypeScript</h1><blockquote><p>Marius Schulz, <a href="https://mariusschulz.com/blog/acquiring-type-declaration-files-in-typescript" target="_blank" rel="noopener noreferrer">“Acquiring Type Declaration Files in TypeScript”</a>, October 23, 2016</p></blockquote><p>In TypeScript 2.0, it has become significantly easier to acquire type information for JavaScript libraries. There&#39;s no longer a need for additional tools such as <a href="https://github.com/typings/typings" target="_blank" rel="noopener noreferrer">typings</a> or <a href="https://github.com/DefinitelyTyped/tsd" target="_blank" rel="noopener noreferrer">tsd</a>. Instead, type declaration packages are directly available on npm.</p><p><a href="https://egghead.io/lessons/typescript-install-typescript-declarations-from-npm?af=9g63dt" target="_blank" rel="noopener noreferrer"><img src="https://mariusschulz.com/images/content/egghead_lesson_typescript_declarations-2x.nam2cekuwu.imm.png" alt="Egghead lesson: Install TypeScript declarations from"></a></p><h2 id="从-npm-下载类型声明文件"><a class="header-anchor" href="#从-npm-下载类型声明文件" aria-hidden="true">#</a> 从 npm 下载类型声明文件</h2><p>Let&#39;s assume you want to use Lodash in one of your TypeScript projects:</p><div class="language-bash line-numbers-mode"><pre><code><span class="token function">npm</span> <span class="token function">install</span> --save lodash\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>After running this command, Lodash is installed into the <code>node_modules</code> folder and is also listed as a dependency within your project&#39;s <code>package.json</code> file. However, there&#39;s no type information available for TypeScript because Lodash is written in JavaScript and doesn&#39;t ship with type declaration files.</p><p>Using npm again, you can now install the <code>@types/lodash</code> package which contains the corresponding type declarations that TypeScript needs:</p><p><img src="https://mariusschulz.com/images/content/npm_install_types_lodash-2x.yvlxb75hxu.imm.png" alt="npm install --save @types/lodash"></p><p>Note how the type declaration package is named after the original npm package, prefixed with <code>@types/</code>. Most packages should follow this convention, but you can always fall back to <a href="https://www.typescriptlang.org/dt/search" target="_blank" rel="noopener noreferrer">Type Search</a> to find the name of the type declaration package for a given library.</p><p>The benefit of using npm for managing type information is that type declaration packages will be listed in your <code>package.json</code> alongside your other dependencies. In addition, they can be properly versioned, just like any other npm package. Plus, you only need a single package manager, npm, that is set up already anyway.</p><h2 id="类型声明文件在哪里？"><a class="header-anchor" href="#类型声明文件在哪里？" aria-hidden="true">#</a> 类型声明文件在哪里？</h2><p>Like any other npm package, the type declaration packages are installed in the <code>node_modules</code> folder. Within it, there&#39;s a <code>@types</code> folder which contains all typings. In the above example, it&#39;ll contain a <code>lodash</code> folder, within which you&#39;ll find the <code>index.d.ts</code> file with all the Lodash type information:</p><p><img src="https://mariusschulz.com/images/content/node_modules-@types-folder-2x.t2kpsqy7h2.imm.png" alt="@types folder"></p><p>The TypeScript compiler understands this convention and will pick up type declarations within the <code>@types</code> folder automatically. There&#39;s no need to update the <code>tsconfig.json</code> or any other configuration file.</p><h2 id="是谁创建了类型声明包？"><a class="header-anchor" href="#是谁创建了类型声明包？" aria-hidden="true">#</a> 是谁创建了类型声明包？</h2><p>Behind the scenes, the type declaration packages are automatically created by the <a href="https://github.com/Microsoft/types-publisher" target="_blank" rel="noopener noreferrer">types-publisher</a> service. It publishes the contents of the <a href="https://github.com/DefinitelyTyped/DefinitelyTyped" target="_blank" rel="noopener noreferrer">DefinitelyTyped</a> repository to npm. That way, typings contributed to DefinitelyTyped end up on npm, ready for consumption.</p><p>在背后，类型声明包会由 <a href="https://github.com/Microsoft/types-publisher" target="_blank" rel="noopener noreferrer">types-publisher</a> 服务自动创建。它将 <a href="https://github.com/DefinitelyTyped/DefinitelyTyped" target="_blank" rel="noopener noreferrer">DefinitelyTyped</a> 仓库的内容发布到 npm。这样，贡献到 DefinitelyTyped 仓库代码最终被推送到 npm，等待被消费。</p><p>本篇文章是 <a href="https://mariusschulz.com/blog/series/typescript-evolution" target="_blank" rel="noopener noreferrer">TypeScript Evolution</a> 系列中的一篇。</p>',20);i.render=function(a,n,i,o,s,p){return e(),t("div",null,[r])};export default i;export{n as __pageData};