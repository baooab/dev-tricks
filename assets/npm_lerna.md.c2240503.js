import{o as n,c as s,a}from"./app.d2ac5229.js";const p='{"title":"lerna 学习笔记","description":"","frontmatter":{},"relativePath":"npm/lerna.md","lastUpdated":1615028896089}',e={},r=a('<h1 id="lerna-学习笔记"><a class="header-anchor" href="#lerna-学习笔记" aria-hidden="true">#</a> lerna 学习笔记</h1><p>仓库地址：<a href="https://github.com/lerna/lerna/tree/main/commands/version#readme" target="_blank" rel="noopener noreferrer">https://github.com/lerna/lerna/tree/main/commands/version#readme</a></p><div class="language-bash line-numbers-mode"><pre><code>lerna version --no-push --yes -m <span class="token string">&quot;chore(release): publish %s&quot;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>baz-pkg 依赖 foo-pkg 包，foo-pkg 包依赖 bar-pkg</p><div class="language-json line-numbers-mode"><pre><code><span class="token comment">// baz-pkg</span>\n<span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n  <span class="token property">&quot;foo-pkg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.0.6&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-json line-numbers-mode"><pre><code><span class="token comment">// foo-pkg</span>\n<span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n  <span class="token property">&quot;bar-pkg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.0.6&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>场景一：现在修改 foo-pkg 中的源代码，执行 <code>lerna version --no-push --yes</code>:</p><div class="language-bash line-numbers-mode"><pre><code>Changes:\n - baz-pkg: <span class="token number">1.0</span>.5 <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token number">1.0</span>.6\n - foo-pkg: <span class="token number">1.0</span>.6 <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token number">1.0</span>.7\n\n<span class="token punctuation">..</span>.\n\nlerna info lifecycle foo-pkg@1.0.6~preversion: foo-pkg@1.0.6\n\n<span class="token operator">&gt;</span> foo-pkg@1.0.6 preversion D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>foo-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> foo preversion\n\nfoo preversion\nlerna info lifecycle baz-pkg@1.0.5~preversion: baz-pkg@1.0.5\n\n<span class="token operator">&gt;</span> baz-pkg@1.0.5 preversion D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>baz-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> baz preversion\n\nbaz preversion\nlerna info lifecycle baz-pkg@1.0.6~postversion: baz-pkg@1.0.6\nlerna info lifecycle foo-pkg@1.0.7~postversion: foo-pkg@1.0.7\n\n<span class="token operator">&gt;</span> baz-pkg@1.0.6 postversion D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>baz-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> baz postversion\n\nbaz postversion\n\n<span class="token operator">&gt;</span> foo-pkg@1.0.7 postversion D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>foo-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> foo postversion\n\nfoo postversion\nlerna success version finished\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>会发现，执行 lerna version 指令的时候，前后会执行两个生命周期指令：preversion 和 postversion。</p><p>还能发现，preversion 的执行顺序是沿着依赖树的最底层往上层去的，但是 postversion 就不是按照这个顺序（按照打印结果，是按照字母表顺序执行的）。</p><p>场景二：执行 lerna bootstrap</p><div class="language-bash line-numbers-mode"><pre><code>lerna info lifecycle bar-pkg@1.0.6~prepublish: bar-pkg@1.0.6\n\n<span class="token operator">&gt;</span> bar-pkg@1.0.6 prepublish D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>bar-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> bar prepublish\n\nbar prepublish\nlerna info lifecycle foo-pkg@1.0.7~prepublish: foo-pkg@1.0.7\n\n<span class="token operator">&gt;</span> foo-pkg@1.0.7 prepublish D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>foo-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> foo prepublish\n\nfoo prepublish\nlerna info lifecycle baz-pkg@1.0.6~prepublish: baz-pkg@1.0.6\n\n<span class="token operator">&gt;</span> baz-pkg@1.0.6 prepublish D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>baz-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> baz prepublish\n\nbaz prepublish\nlerna info lifecycle bar-pkg@1.0.6~prepare: bar-pkg@1.0.6\n\n<span class="token operator">&gt;</span> bar-pkg@1.0.6 prepare D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>bar-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> bar prepare\n\nbar prepare\nlerna info lifecycle foo-pkg@1.0.7~prepare: foo-pkg@1.0.7\n\n<span class="token operator">&gt;</span> foo-pkg@1.0.7 prepare D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>foo-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> foo prepare\n\nfoo prepare\nlerna info lifecycle baz-pkg@1.0.6~prepare: baz-pkg@1.0.6\n\n<span class="token operator">&gt;</span> baz-pkg@1.0.6 prepare D:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>bzhang<span class="token punctuation">\\</span>lerna-demos<span class="token punctuation">\\</span>packages<span class="token punctuation">\\</span>baz-pkg\n<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> baz prepare\n\nbaz prepare\nlerna success Bootstrapped <span class="token number">3</span> packages\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div>',12);e.render=function(a,p,e,o,l,t){return n(),s("div",null,[r])};export default e;export{p as __pageData};
