import{o as n,c as s,a}from"./app.808b26de.js";const e='{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"一个更实际的例子","slug":"一个更实际的例子"},{"level":2,"title":"只读类属性","slug":"只读类属性"},{"level":2,"title":"只读索引签名","slug":"只读索引签名"},{"level":2,"title":"readonly vs. 不可变","slug":"readonly-vs-不可变"}],"relativePath":"typescript/read-only-properties-in-typescript.md","lastUpdated":1641020578280}',p={},o=a('<h1 id="typescript-中的只读属性"><a class="header-anchor" href="#typescript-中的只读属性" aria-hidden="true">#</a> TypeScript 中的只读属性</h1><blockquote><p>Marius Schulz, <a href="https://mariusschulz.com/blog/read-only-properties-in-typescript" target="_blank" rel="noopener noreferrer">“Read-Only Properties in TypeScript”</a>, October 31, 2016</p></blockquote><p>TypeScript 2.0 增加了 <code>readonly</code> 修饰符，用于标记只读属性。只读属性仅允许两种场景下的赋值，一种是在初始化的时候，另一种是在类的构造函数中，其余场景都不允许赋值。</p><p>我们来看个例子。有一个声明了两个只读属性 <code>x</code> 和 <code>y</code> 的简单类型 <code>Point</code>：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">type</span> <span class="token class-name">Point</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token keyword">readonly</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>\n    <span class="token keyword">readonly</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>现在创建一个表示原点坐标的 <code>origin</code> 对象，<code>x</code> 和 <code>y</code> 的初始值都为 <code>0</code>：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">const</span> origin<span class="token operator">:</span> Point <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>因为 <code>x</code> 和 <code>y</code> 都被声明为只读的，所以它们是不能被修改的：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token comment">// Error: Left-hand side of assignment expression</span>\n<span class="token comment">// cannot be a constant or read-only property</span>\norigin<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="一个更实际的例子"><a class="header-anchor" href="#一个更实际的例子" aria-hidden="true">#</a> 一个更实际的例子</h2><p>上面的例子可能不太有说服力(确实)，考虑下面的函数：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">moveX</span><span class="token punctuation">(</span>p<span class="token operator">:</span> Point<span class="token punctuation">,</span> offset<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> Point <span class="token punctuation">{</span>\n    p<span class="token punctuation">.</span>x <span class="token operator">+=</span> offset<span class="token punctuation">;</span>\n    <span class="token keyword">return</span> p<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>moveX</code> 函数不能修改给定坐标点的 <code>x</code> 属性，因为这个属性是只读的，否则 TypeScript 编译器会抱怨的：</p><p><img src="https://mariusschulz.com/images/content/typescript_readonly_properties-2x.a5pst655tj.imm.png" alt="Forbidden assignment to readonly property in TypeScript"></p><p>相反，<code>moveX</code> 应该返回一个更新后的新坐标点，类似这样：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">moveX</span><span class="token punctuation">(</span>p<span class="token operator">:</span> Point<span class="token punctuation">,</span> offset<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> Point <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        x<span class="token operator">:</span> p<span class="token punctuation">.</span>x <span class="token operator">+</span> offset<span class="token punctuation">,</span>\n        y<span class="token operator">:</span> p<span class="token punctuation">.</span>y\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>现在编译器就很开心了，因为我们没有修改只读属性，而是返回了一个新的坐标点：</p><h2 id="只读类属性"><a class="header-anchor" href="#只读类属性" aria-hidden="true">#</a> 只读类属性</h2><p>我们还可以为类的属性应用 <code>readonly</code> 修饰符。下面的 <code>Circle</code> 类有一个只读属性 <code>radius</code> 和一个获取属性 <code>area</code>（也是只读的，因为没有 setter）：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token punctuation">{</span>\n    <span class="token keyword">readonly</span> radius<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">constructor</span><span class="token punctuation">(</span>radius<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>radius <span class="token operator">=</span> radius<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">get</span> <span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>radius <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>注意，这里用到了 <a href="https://mariusschulz.com/blog/the-exponentiation-operator-in-javascript" target="_blank" rel="noopener noreferrer">ES2016 新的指数操作符</a>。<code>radius</code> 和 <code>area</code> 属性都能被外部访问（没有标记为 <code>private</code>），同时又不能被修改（都是只读的）：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">const</span> unitCircle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nunitCircle<span class="token punctuation">.</span>radius<span class="token punctuation">;</span> <span class="token comment">// 1</span>\nunitCircle<span class="token punctuation">.</span>area<span class="token punctuation">;</span> <span class="token comment">// 3.141592653589793</span>\n\n<span class="token comment">// Error: Left-hand side of assignment expression</span>\n<span class="token comment">// cannot be a constant or read-only property</span>\nunitCircle<span class="token punctuation">.</span>radius <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Error: Left-hand side of assignment expression</span>\n<span class="token comment">// cannot be a constant or read-only property</span>\nunitCircle<span class="token punctuation">.</span>area <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="只读索引签名"><a class="header-anchor" href="#只读索引签名" aria-hidden="true">#</a> 只读索引签名</h2><p>而且，索引签名也能用 <code>readonly</code> 修饰符标记成只读的，从而来避免索引属性被赋值。下面的 <code>ReadonlyArray&lt;T&gt;</code> 就是一个例子：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">interface</span> <span class="token class-name">ReadonlyArray<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">readonly</span> length<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>\n    <span class="token comment">// ...</span>\n    <span class="token keyword">readonly</span> <span class="token punctuation">[</span>n<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>因为索引是只读的，所以编译器认为下面的赋值是无效的：</p><div class="language-ts line-numbers-mode"><pre><code><span class="token keyword">const</span> primesBelow10<span class="token operator">:</span> ReadonlyArray<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Error: Left-hand side of assignment expression</span>\n<span class="token comment">// cannot be a constant or read-only property</span>\nprimesBelow10<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="readonly-vs-不可变"><a class="header-anchor" href="#readonly-vs-不可变" aria-hidden="true">#</a> <code>readonly</code> vs. 不可变</h2><p><code>readonly</code> 修饰符是 TypeScript 类型系统的一部分，只用来帮助编译器检查属性赋值是否合法。一旦编译成 JavaScript 代码后，<code>readonly</code> 标记会被移除。可以尝试 <a href="https://www.typescriptlang.org/play?#code/C4TwDgpgBACg9gSwHbCgXigbwLACgoFQBOEAhgCZxIA2IUAHgFxRICuAtgEYREDcehYmUo06IZmy49+uAL4y8AYyoBnVHCIIA5smbxkqDJgbMADABoo4qKajy8QA" target="_blank" rel="noopener noreferrer">这个简单的例子</a> 看下只读属性是如何被转译的。</p><p>因为 <code>readonly</code> 只是一个编译器设施，所以是无法为运行时提供保障的。也就是说，它是类型系统的另一个特性，通过让编译器检查 TypeScript 代码中意外的属性赋值，来帮助你写出正确的代码。</p><p>本篇文章是 <a href="https://mariusschulz.com/blog/series/typescript-evolution" target="_blank" rel="noopener noreferrer">TypeScript Evolution</a> 系列中的一篇。</p>',31);p.render=function(a,e,p,t,c,r){return n(),s("div",null,[o])};export default p;export{e as __pageData};
