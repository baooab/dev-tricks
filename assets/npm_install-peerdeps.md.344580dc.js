import{o as n,c as s,a}from"./app.808b26de.js";const e='{"title":"如何使用指定了 peerDependencies 的 npm 包","description":"","frontmatter":{},"headers":[{"level":2,"title":"作为 devDependencies 安装","slug":"作为-devdependencies-安装"},{"level":2,"title":"作为 pependencies 安装","slug":"作为-pependencies-安装"}],"relativePath":"npm/install-peerdeps.md","lastUpdated":1640926977284}',p={},t=a('<h1 id="如何使用指定了-peerdependencies-的-npm-包"><a class="header-anchor" href="#如何使用指定了-peerdependencies-的-npm-包" aria-hidden="true">#</a> 如何使用指定了 peerDependencies 的 npm 包</h1><p>使用 <a href="https://www.npmjs.com/package/install-peerdeps" target="_blank" rel="noopener noreferrer">install-peerdeps</a> 工具，以安装 <a href="https://www.npmjs.com/package/eslint-config-airbnb" target="_blank" rel="noopener noreferrer">eslint-config-airbnb</a> 为例。</p><h2 id="作为-devdependencies-安装"><a class="header-anchor" href="#作为-devdependencies-安装" aria-hidden="true">#</a> 作为 devDependencies 安装</h2><div class="language-bash line-numbers-mode"><pre><code>npx install-peerdeps eslint-config-airbnb --dev --registry<span class="token operator">=</span>https://registry.npm.taobao.org/\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">警告</p><p>这里需要指定 registry 地址，否则会走默认的 npm registry 地址：<a href="https://registry.npmjs.org/" target="_blank" rel="noopener noreferrer">https://registry.npmjs.org/</a></p></div><p>下面是安装后的 package.json 内容：</p><div class="language-json line-numbers-mode"><pre><code><span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;eslint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.2.0&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-config-airbnb&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^18.2.1&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-plugin-import&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.22.1&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-plugin-jsx-a11y&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^6.4.1&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-plugin-react&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.21.5&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-plugin-react-hooks&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="作为-pependencies-安装"><a class="header-anchor" href="#作为-pependencies-安装" aria-hidden="true">#</a> 作为 pependencies 安装</h2><div class="language-bash line-numbers-mode"><pre><code>npx install-peerdeps eslint-config-airbnb --registry<span class="token operator">=</span>https://registry.npm.taobao.org/\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>下面是安装后的 package.json 内容：</p><div class="language-json line-numbers-mode"><pre><code><span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;eslint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.2.0&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-config-airbnb&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^18.2.1&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-plugin-import&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.22.1&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-plugin-jsx-a11y&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^6.4.1&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-plugin-react&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.21.5&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;eslint-plugin-react-hooks&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0&quot;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>',11);p.render=function(a,e,p,o,r,l){return n(),s("div",null,[t])};export default p;export{e as __pageData};