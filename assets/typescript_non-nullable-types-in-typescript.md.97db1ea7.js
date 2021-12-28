import{o as n,c as s,a}from"./app.808b26de.js";const p='{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"null 和 undefined","slug":"null-和-undefined"},{"level":2,"title":"严格空值检查","slug":"严格空值检查"},{"level":2,"title":"使用联合类型构建可为空变量","slug":"使用联合类型构建可为空变量"},{"level":2,"title":"访问可为空属性","slug":"访问可为空属性"},{"level":2,"title":"调用可为空函数","slug":"调用可为空函数"},{"level":2,"title":"总结","slug":"总结"}],"relativePath":"typescript/non-nullable-types-in-typescript.md","lastUpdated":1640654800449}',e={},t=a('<h1 id="typescript-中的非空类型"><a class="header-anchor" href="#typescript-中的非空类型" aria-hidden="true">#</a> TypeScript 中的非空类型</h1><blockquote><p>Marius Schulz, <a href="https://mariusschulz.com/blog/non-nullable-types-in-typescript" target="_blank" rel="noopener noreferrer">“Non-Nullable Types in TypeScript”</a>, September 28, 2016</p></blockquote><p><a href="https://blogs.msdn.microsoft.com/typescript/2016/09/22/announcing-typescript-2-0/" target="_blank" rel="noopener noreferrer">TypeScript 2.0</a> 引入了很多新特性。本篇，我将介绍 <strong>非空类型</strong>，这是对类型系统的基础功能提升，帮助我们避免了编译期间的空值错误（nullability errors）。</p><h2 id="null-和-undefined"><a class="header-anchor" href="#null-和-undefined" aria-hidden="true">#</a> <code>null</code> 和 <code>undefined</code></h2><p>TypeScript 2.0 之前，类型检查器（type checker）允许将 <code>null</code> 和 <code>undefined</code> 赋值给 <em>任意</em> 类型。这包括字符串、数值和布尔值在内的原始类型：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">let</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\nname <span class="token operator">=</span> <span class="token string">&quot;Marius&quot;</span><span class="token punctuation">;</span>  <span class="token comment">// OK</span>\nname <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>      <span class="token comment">// OK</span>\nname <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// OK</span>\n\n<span class="token keyword">let</span> age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>\nage <span class="token operator">=</span> <span class="token number">24</span><span class="token punctuation">;</span>        <span class="token comment">// OK</span>\nage <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>      <span class="token comment">// OK</span>\nage <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// OK</span>\n\n<span class="token keyword">let</span> isMarried<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>\nisMarried <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>      <span class="token comment">// OK</span>\nisMarried <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>     <span class="token comment">// OK</span>\nisMarried <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>      <span class="token comment">// OK</span>\nisMarried <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// OK</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>以 <code>number</code> 类型为例。它所表示的范围不仅包括 <a href="https://en.wikipedia.org/wiki/IEEE_floating_point" target="_blank" rel="noopener noreferrer">IEEE 754 浮点数值</a>，还包括 <code>null</code> 和 <code>undefined</code>：</p><p><img src="https://mariusschulz.com/images/content/typescript_number_domain_with_null_and_undefined-2x.vzfjhvlgca.imm.png" alt="Domains of TypeScript&#39;s number type"></p><p>对象、数组和函数类型也是如此。但在这种类型系统下，无法表示非空的变量。幸运的是，TypeScript 2.0 修复了这个问题。</p><h2 id="严格空值检查"><a class="header-anchor" href="#严格空值检查" aria-hidden="true">#</a> 严格空值检查</h2><p>TypeScritp 2.0 添加了对 <strong>非空类型（non-nullable types）</strong> 的支持。命令行中使用 <code>--strictNullChecks</code> flag 就能启用 <strong>严格空值检查（strict null checking）</strong> 模式，或者在项目的 <em>tsconfig.json</em> 文件中增加 <code>strictNullChecks</code> 编译选项：</p><div class="language-json line-numbers-mode"><pre><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;strictNullChecks&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>\n    <span class="token comment">// ...</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>严格空值检查模式下，<code>null</code> 和 <code>undefined</code> 不再能够赋值给任意类型。<code>null</code> 和 <code>undefined</code> 都归属在各自类型之下：</p><p><img src="https://mariusschulz.com/images/content/typescript_number_domain_without_null_and_undefined-2x.ni7cmeejbe.imm.png" alt="Domains of TypeScript&#39;s number, null, and undefined types"></p><p>启用严格空值检查模式后，将 <code>null</code> 和 <code>undefined</code> 赋值给任何变量都会导致错误：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token comment">// 使用 --strictNullChecks flag 编译的结果</span>\n    \n<span class="token keyword">let</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\nname <span class="token operator">=</span> <span class="token string">&quot;Marius&quot;</span><span class="token punctuation">;</span>  <span class="token comment">// OK</span>\nname <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>      <span class="token comment">// Error</span>\nname <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// Error</span>\n\n<span class="token keyword">let</span> age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>\nage <span class="token operator">=</span> <span class="token number">24</span><span class="token punctuation">;</span>        <span class="token comment">// OK</span>\nage <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>      <span class="token comment">// Error</span>\nage <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// Error</span>\n\n<span class="token keyword">let</span> isMarried<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>\nisMarried <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>      <span class="token comment">// OK</span>\nisMarried <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>     <span class="token comment">// OK</span>\nisMarried <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>      <span class="token comment">// Error</span>\nisMarried <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// Error</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>那么，我们如何在 TypeScript 2.0 中表示可为空变量呢？</p><h2 id="使用联合类型构建可为空变量"><a class="header-anchor" href="#使用联合类型构建可为空变量" aria-hidden="true">#</a> 使用联合类型构建可为空变量</h2><p>由于启用严格空值检查后，各个类型默认都是非空的，所以，我们需要明确告诉类型检查器一个变量是可为空的。这可以通过将 <code>null</code> 和 <code>undefined</code> 混入联合类型做到：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">let</span> name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\nname <span class="token operator">=</span> <span class="token string">&quot;Marius&quot;</span><span class="token punctuation">;</span>  <span class="token comment">// OK</span>\nname <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>      <span class="token comment">// OK</span>\nname <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// Error</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>注意，<code>undefined</code> 并不是可以赋值给变量 <code>name</code> 的有效值，因为联合类型中并没有包含 <code>undefined</code>。</p><p>这种表示可为空变量的方式非常直观。我们以一个简单的 <code>User</code> 类型为例：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">type</span> <span class="token class-name">User</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  firstName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  lastName<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> jane<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">{</span> firstName<span class="token operator">:</span> <span class="token string">&quot;Jane&quot;</span><span class="token punctuation">,</span> lastName<span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> john<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">{</span> firstName<span class="token operator">:</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> lastName<span class="token operator">:</span> <span class="token string">&quot;Doe&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>可以通过在 <code>lastName</code> 后面加 <code>?</code> 的方式将属性标记为可选的。而且，<code>undefined</code> 会自动添加到联合类型。因此，下面的赋值都是类型正确（type-correct）的：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">type</span> <span class="token class-name">User</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  firstName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  lastName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// We can assign a string to the &quot;lastName&quot; property</span>\n<span class="token keyword">let</span> john<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">{</span> firstName<span class="token operator">:</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> lastName<span class="token operator">:</span> <span class="token string">&quot;Doe&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// ... or we can explicitly assign the value undefined</span>\n<span class="token keyword">let</span> jane<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">{</span> firstName<span class="token operator">:</span> <span class="token string">&quot;Jane&quot;</span><span class="token punctuation">,</span> lastName<span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// ... or we can not define the property at all</span>\n<span class="token keyword">let</span> jake<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">{</span> firstName<span class="token operator">:</span> <span class="token string">&quot;Jake&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="访问可为空属性"><a class="header-anchor" href="#访问可为空属性" aria-hidden="true">#</a> 访问可为空属性</h2><p>如果一个对象变量是可为空的，直接访问它的任意属性都会导致编译期错误（compil-time error）：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">getLength</span><span class="token punctuation">(</span>s<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Error: Object is possibly &#39;null&#39;.</span>\n  <span class="token keyword">return</span> s<span class="token punctuation">.</span>length<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>访问属性前，需要使用 type guard 保证访问对象属性是安全的：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">getLength</span><span class="token punctuation">(</span>s<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> s<span class="token punctuation">.</span>length<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>TypeScript 理解 JavaScript 的真值语义（truthiness semantics），支持条件表达式中的 type guard。因此，下面这种检查方式也是可以的：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">getLength</span><span class="token punctuation">(</span>s<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> s <span class="token operator">?</span> s<span class="token punctuation">.</span>length <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="调用可为空函数"><a class="header-anchor" href="#调用可为空函数" aria-hidden="true">#</a> 调用可为空函数</h2><p>如果一个函数是可为空的，直接调用它就会导致编译期错误。以下面的 <code>callback</code> 参数为例：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span>callback<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Error: Object is possibly &#39;undefined&#39;.</span>\n  <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>类似于访问对象属性前的检查，在调用函数前也要先检查，以便确保不是空值：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span>callback<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果喜欢，还能通过 <code>typeof</code> 操作符确保返回值不是空值：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span>callback<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> callback <span class="token operator">===</span> <span class="token string">&quot;function&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="总结"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>非空类型是 TypeScript 类型系统中非常基础和有价值的一个功能。它允许我们明确指定变量或属性是不是可为空，确保属性访问和函数调用是安全的，避免了编译期间的空值错误。</p><p>本篇文章是 <a href="https://mariusschulz.com/blog/series/typescript-evolution" target="_blank" rel="noopener noreferrer">TypeScript Evolution</a> 系列中的一篇。</p>',42);e.render=function(a,p,e,o,c,l){return n(),s("div",null,[t])};export default e;export{p as __pageData};
