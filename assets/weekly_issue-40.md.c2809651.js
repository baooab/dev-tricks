import{o as e,c as r,a}from"./app.d2ac5229.js";const n='{"title":"每周分享第 40 期","description":"","frontmatter":{},"headers":[{"level":2,"title":"文章","slug":"文章"},{"level":2,"title":"工具","slug":"工具"},{"level":2,"title":"发布","slug":"发布"},{"level":2,"title":"参考链接","slug":"参考链接"}],"relativePath":"weekly/issue-40.md","lastUpdated":1616202826236}',t={},s=a('<h1 id="每周分享第-40-期"><a class="header-anchor" href="#每周分享第-40-期" aria-hidden="true">#</a> 每周分享第 40 期</h1><h2 id="文章"><a class="header-anchor" href="#文章" aria-hidden="true">#</a> 文章</h2><ul><li><a href="https://evinsellin.medium.com/object-plus-array-is-not-zero-ec4db710e7a5" target="_blank" rel="noopener noreferrer">Object Plus Array Is Not Zero</a></li></ul><p>关于下面两个语句的执行结果，作者做了一次小探究。</p><div class="language-js line-numbers-mode"><pre><code><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token number">0</span>\n<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token string">&quot;[object Object]&quot;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li><p><a href="https://jrsinclair.com/articles/2021/rethinking-the-javascript-ternary-operator/" target="_blank" rel="noopener noreferrer">重新思考 JS 三元运算符 <code>ternary ? &quot;yes&quot; : &quot;no&quot; </code></a></p></li><li><p><a href="https://www.jackfranklin.co.uk/blog/comparing-svelte-and-react-javascript/" target="_blank" rel="noopener noreferrer">Svelte 和 React 框架比较</a></p></li><li><p><a href="https://pragmaticpineapple.com/7-ways-to-debug-jest-tests-in-terminal/" target="_blank" rel="noopener noreferrer">7 Ways to Debug Jest Tests in Terminal</a></p></li><li><p><a href="https://blog.maximeheckel.com/posts/the-power-of-composition-with-css-variables" target="_blank" rel="noopener noreferrer">组合 CSS 变量带来的强大能力</a></p></li></ul><p>这家网站的界面风格还挺不错的。</p><ul><li><p><a href="https://ishadeed.com/article/css-logical-properties/" target="_blank" rel="noopener noreferrer">深入理解 CSS 逻辑属性</a></p></li><li><p><a href="https://css-tricks.com/table-of-contents-with-intersectionobserver/" target="_blank" rel="noopener noreferrer">Creating a &#39;Table of Contents&#39; Sidebar with IntersectionObserver</a></p></li><li><p><a href="https://dev.to/ruppysuppy/create-dynamic-spinners-only-using-css-34dh" target="_blank" rel="noopener noreferrer">Create Dynamic Spinners Using Only CSS</a></p></li><li><p><a href="https://www.kevinpeters.net/the-fastest-way-to-understand-new-code-bases" target="_blank" rel="noopener noreferrer">如何快速学习新项目代码</a></p></li></ul><p>来自 <a href="https://www.kevinpeters.net/" target="_blank" rel="noopener noreferrer">kevinpeters.net</a></p><ul><li><a href="https://www.contentful.com/blog/2021/03/05/generate-blog-rss-feed-with-javascript-and-netlify/" target="_blank" rel="noopener noreferrer">How to Generate an RSS Feed for Your Blog</a></li></ul><h2 id="工具"><a class="header-anchor" href="#工具" aria-hidden="true">#</a> 工具</h2><ul><li><a href="https://github.com/paulirish/lite-youtube-embed" target="_blank" rel="noopener noreferrer">lite-youtube-embed</a></li></ul><p>将 YouTube 视频嵌入到你的网页，使用了自定义组件 API 实现的。</p><div class="language-js line-numbers-mode"><pre><code><span class="token operator">&lt;</span>lite<span class="token operator">-</span>youtube videoid<span class="token operator">=</span><span class="token string">&quot;ogfYd705cRs&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>lite<span class="token operator">-</span>youtube<span class="token operator">&gt;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>由 <a href="https://www.paulirish.com/" target="_blank" rel="noopener noreferrer">Paul Irish</a> 编写。</p><ul><li><a href="https://www.smashingmagazine.com/2021/03/css-generators/" target="_blank" rel="noopener noreferrer">CSS Generators</a></li></ul><p>现在 CSS 越来越强大了，创建出来的 UI 界面越来越丰富，但是一些属性的用法实在是太难记住了。没关系，本文作者为我们梳理了常用的一些 CSS 效果制作工具。</p><p>包括：</p><ul><li>阴影制造器（<code>box-shadows</code>）</li><li>圆角制造器（<code>border-raduis</code>）</li><li>Cubic-Bezier 曲线制造器（<code>cubic-bezier</code>）</li><li>线性渐变制造器（<code>linear-gradient</code>）</li></ul><p>等等。</p><p>本文作者还写了 <a href="https://www.smashingmagazine.com/2021/03/css-auditing-tools/" target="_blank" rel="noopener noreferrer">其他一些不错的文章</a>。</p><h2 id="发布"><a class="header-anchor" href="#发布" aria-hidden="true">#</a> 发布</h2><ul><li><a href="https://nodejs.org/en/blog/release/v15.12.0/" target="_blank" rel="noopener noreferrer">Node 15.12.0</a> — The runtime, the CLI, the legend.</li><li><a href="https://github.com/evanw/esbuild/releases/tag/v0.9.4" target="_blank" rel="noopener noreferrer">esbuild 0.9.4</a> — Ultra-fast JS bundler.</li><li><a href="https://github.com/rollup/rollup/releases/tag/v2.42.0" target="_blank" rel="noopener noreferrer">Rollup 2.42.0</a> - ES module bundler.</li></ul><h2 id="参考链接"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2><ul><li><a href="https://frontendfoc.us/issues/482" target="_blank" rel="noopener noreferrer">https://frontendfoc.us/issues/482</a></li><li><a href="https://javascriptweekly.com/issues/530" target="_blank" rel="noopener noreferrer">https://javascriptweekly.com/issues/530</a></li></ul>',25);t.render=function(a,n,t,o,l,p){return e(),r("div",null,[s])};export default t;export{n as __pageData};
