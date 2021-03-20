import{o as n,c as e,a as s}from"./app.d2ac5229.js";const a='{"title":"将开发环境的文件换行符设置成 LF","description":"","frontmatter":{},"relativePath":"misc/eol-lf.md","lastUpdated":1615029133391}',o={},t=s('<h1 id="将开发环境的文件换行符设置成-lf"><a class="header-anchor" href="#将开发环境的文件换行符设置成-lf" aria-hidden="true">#</a> 将开发环境的文件换行符设置成 LF</h1><p>在 Windows 和 Mac 写代码时，默认使用的换行符是不一样的。Windows 上是 <code>\\r\\n</code>（CRLF），Mac 上是 <code>\\n</code>（LF）。</p><p>为了能是在 Windows 和 Mac 上获得一致的开发体验，按照经验来说，把换行符统一换成 Mac 的 <code>\\n</code> 会好一些。</p><p>下面介绍了在一些环境中设置换行符的操作：</p><p>一、VSCode</p><p>Settings 中设置</p><div class="language-json line-numbers-mode"><pre><code><span class="token property">&quot;files.eol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\\n&quot;</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>而不是用默认的 auto。</p><p>二、Git</p><div class="language-bash line-numbers-mode"><pre><code><span class="token function">git</span> config --global core.autocrlf <span class="token boolean">false</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>如需区分文件名大小写，可设置 <code>git config --global core.ignorecase true</code></p><p>三、TypeScript</p><div class="language-json line-numbers-mode"><pre><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;newLine&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lf&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>四、eslint</p><div class="language-js line-numbers-mode"><pre><code>linebreak<span class="token operator">-</span>style<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;unix&quot;</span><span class="token punctuation">]</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><div class="language-js line-numbers-mode"><pre><code><span class="token comment">/*eslint linebreak-style: [&quot;error&quot;, &quot;unix&quot;]*/</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>参考链接：</p><ul><li><a href="https://stackoverflow.com/questions/52404044/changing-file-eol-with-vscode-extension-api" target="_blank" rel="noopener noreferrer">https://stackoverflow.com/questions/52404044/changing-file-eol-with-vscode-extension-api</a></li><li><a href="https://docs.github.com/cn/github/using-git/configuring-git-to-handle-line-endings#global-settings-for-line-endings" target="_blank" rel="noopener noreferrer">https://docs.github.com/cn/github/using-git/configuring-git-to-handle-line-endings#global-settings-for-line-endings</a></li><li><a href="https://www.typescriptlang.org/tsconfig#newLine" target="_blank" rel="noopener noreferrer">https://www.typescriptlang.org/tsconfig#newLine</a></li><li><a href="http://eslint.cn/docs/rules/linebreak-style" target="_blank" rel="noopener noreferrer">http://eslint.cn/docs/rules/linebreak-style</a></li></ul>',18);o.render=function(s,a,o,p,r,i){return n(),e("div",null,[t])};export default o;export{a as __pageData};
