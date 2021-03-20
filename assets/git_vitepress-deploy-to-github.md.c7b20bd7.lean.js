import{o as n,c as s,b as a,d as e}from"./app.d2ac5229.js";const t='{"title":"如何将 VitePress 部署到 GitHub Pages","description":"","frontmatter":{},"headers":[{"level":2,"title":"网站配置","slug":"网站配置"},{"level":2,"title":"新建 gh-pages 分支","slug":"新建-gh-pages-分支"},{"level":2,"title":"发布内容到 Github gh-pages 分支","slug":"发布内容到-github-gh-pages-分支"}],"relativePath":"git/vitepress-deploy-to-github.md","lastUpdated":1614609438215}',l={},p=a("h1",{id:"如何将-vitepress-部署到-github-pages"},[a("a",{class:"header-anchor",href:"#如何将-vitepress-部署到-github-pages","aria-hidden":"true"},"#"),e(" 如何将 VitePress 部署到 GitHub Pages")],-1),r=a("div",{class:"tip custom-block"},[a("p",{class:"custom-block-title"},"目录"),a("p",null,[a("div",{class:"table-of-contents"},[a("ul",null,[a("li",null,[a("a",{href:"#网站配置"},"网站配置")]),a("li",null,[a("a",{href:"#新建-gh-pages-分支"},"新建 gh-pages 分支")]),a("li",null,[a("a",{href:"#发布内容到-github-gh-pages-分支"},"发布内容到 Github gh-pages 分支")])])])])],-1),o=a("p",null,"VitePress 基于 Vite 构建，比 VuePress 好的一点就是快，因为 Vite 是基于 Rollup.js 构建，VuePress 则是基于 webpack 构建。",-1),c=a("p",null,[e("根据官方 "),a("a",{href:"https://vitepress.vuejs.org/guide/getting-started.html",target:"_blank",rel:"noopener noreferrer"},"Getting Started"),e(" 和 "),a("a",{href:"https://vitepress.vuejs.org/guide/deploy.html#github-pages",target:"_blank",rel:"noopener noreferrer"},"Deploying"),e(" 两节内容就能达到 90% 的完成度，本文就是为了讲清楚剩下的 10%——也就是部署的坑点所在。")],-1),i=a("div",{class:"tip custom-block"},[a("p",{class:"custom-block-title"},"提示"),a("p",null,"本文没有介绍如何接入 Travis CI，有兴趣的同学可以自行尝试。")],-1),u=a("h2",{id:"网站配置"},[a("a",{class:"header-anchor",href:"#网站配置","aria-hidden":"true"},"#"),e(" 网站配置")],-1),b=a("p",null,[e("我的配置脚本是直接基于 "),a("a",{href:"https://github.com/vuejs/vitepress/blob/master/docs/.vitepress/config.js",target:"_blank",rel:"noopener noreferrer"},"VitePress 官方文档使用的配置"),e(" 修改的。")],-1),g=a("div",{class:"language-js line-numbers-mode"},[a("pre",null,[a("code",null,[e("module"),a("span",{class:"token punctuation"},"."),e("exports "),a("span",{class:"token operator"},"="),e(),a("span",{class:"token punctuation"},"{"),e("\n  lang"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"zh-CN"'),a("span",{class:"token punctuation"},","),e("\n  base"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"/dev-tricks/"'),a("span",{class:"token punctuation"},","),e("\n  title"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"Dev Tricks"'),a("span",{class:"token punctuation"},","),e("\n  description"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"dev tricks about web"'),a("span",{class:"token punctuation"},","),e("\n\n  themeConfig"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token punctuation"},"{"),e("\n    repo"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"baooab/dev-tricks"'),a("span",{class:"token punctuation"},","),e("\n    docsDir"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"docs"'),a("span",{class:"token punctuation"},","),e("\n\n    editLinks"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token boolean"},"true"),a("span",{class:"token punctuation"},","),e("\n    editLinkText"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"在 GitHub 上编辑此页"'),a("span",{class:"token punctuation"},","),e("\n    lastUpdated"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"最近更新"'),a("span",{class:"token punctuation"},","),e("\n\n    sidebar"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token punctuation"},"{"),e("\n      "),a("span",{class:"token string"},'"/"'),a("span",{class:"token operator"},":"),e(),a("span",{class:"token function"},"getGuideSidebar"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),a("span",{class:"token punctuation"},","),e("\n    "),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},","),e("\n  "),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},","),e("\n"),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},";"),e("\n\n"),a("span",{class:"token keyword"},"function"),e(),a("span",{class:"token function"},"getGuideSidebar"),a("span",{class:"token punctuation"},"("),a("span",{class:"token punctuation"},")"),e(),a("span",{class:"token punctuation"},"{"),e("\n  "),a("span",{class:"token keyword"},"return"),e(),a("span",{class:"token punctuation"},"["),e("\n    "),a("span",{class:"token punctuation"},"{"),e("\n      text"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"最近更新"'),a("span",{class:"token punctuation"},","),e("\n      children"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token punctuation"},"["),e("\n        "),a("span",{class:"token punctuation"},"{"),e("\n          text"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"如何将 VitePress 部署到 GitHub Pages"'),a("span",{class:"token punctuation"},","),e("\n          link"),a("span",{class:"token operator"},":"),e(),a("span",{class:"token string"},'"/git/vitepress-deploy-to-github"'),a("span",{class:"token punctuation"},","),e("\n        "),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},","),e("\n      "),a("span",{class:"token punctuation"},"]"),a("span",{class:"token punctuation"},","),e("\n    "),a("span",{class:"token punctuation"},"}"),a("span",{class:"token punctuation"},","),e("\n  "),a("span",{class:"token punctuation"},"]"),a("span",{class:"token punctuation"},";"),e("\n"),a("span",{class:"token punctuation"},"}"),e("\n")])]),a("div",{class:"line-numbers-wrapper"},[a("span",{class:"line-number"},"1"),a("br"),a("span",{class:"line-number"},"2"),a("br"),a("span",{class:"line-number"},"3"),a("br"),a("span",{class:"line-number"},"4"),a("br"),a("span",{class:"line-number"},"5"),a("br"),a("span",{class:"line-number"},"6"),a("br"),a("span",{class:"line-number"},"7"),a("br"),a("span",{class:"line-number"},"8"),a("br"),a("span",{class:"line-number"},"9"),a("br"),a("span",{class:"line-number"},"10"),a("br"),a("span",{class:"line-number"},"11"),a("br"),a("span",{class:"line-number"},"12"),a("br"),a("span",{class:"line-number"},"13"),a("br"),a("span",{class:"line-number"},"14"),a("br"),a("span",{class:"line-number"},"15"),a("br"),a("span",{class:"line-number"},"16"),a("br"),a("span",{class:"line-number"},"17"),a("br"),a("span",{class:"line-number"},"18"),a("br"),a("span",{class:"line-number"},"19"),a("br"),a("span",{class:"line-number"},"20"),a("br"),a("span",{class:"line-number"},"21"),a("br"),a("span",{class:"line-number"},"22"),a("br"),a("span",{class:"line-number"},"23"),a("br"),a("span",{class:"line-number"},"24"),a("br"),a("span",{class:"line-number"},"25"),a("br"),a("span",{class:"line-number"},"26"),a("br"),a("span",{class:"line-number"},"27"),a("br"),a("span",{class:"line-number"},"28"),a("br"),a("span",{class:"line-number"},"29"),a("br"),a("span",{class:"line-number"},"30"),a("br"),a("span",{class:"line-number"},"31"),a("br"),a("span",{class:"line-number"},"32"),a("br"),a("span",{class:"line-number"},"33"),a("br")])],-1),m=a("h2",{id:"新建-gh-pages-分支"},[a("a",{class:"header-anchor",href:"#新建-gh-pages-分支","aria-hidden":"true"},"#"),e(" 新建 gh-pages 分支")],-1),k=a("p",null,[e("为你的仓库创建 GitHub Pages 时，通常需要指定一个仓库分支，一般分支约定名称是 "),a("code",null,"gh-pages"),e("，这里面存放编译好之后，可直接部署的静态文件。")],-1),d=a("p",null,[e("因此我们先要本地创建一个 "),a("code",null,"gh-pages"),e(" 分支，然后 push 到 Github 仓库中。")],-1),h=a("div",{class:"language-bash line-numbers-mode"},[a("pre",null,[a("code",null,[a("span",{class:"token function"},"git"),e(" checkout -b gh-pages\n"),a("span",{class:"token function"},"git"),e(" push\n")])]),a("div",{class:"line-numbers-wrapper"},[a("span",{class:"line-number"},"1"),a("br"),a("span",{class:"line-number"},"2"),a("br")])],-1),f=a("p",null,"接下来，在仓库设置（Settings）里开启 GitHub Pages。",-1),v=a("p",null,[a("img",{src:"/dev-tricks/assets/github-pages.62dd3515.png",alt:"github-pages"})],-1),y=a("p",null,[e("分支选择 "),a("code",null,"gh-pages"),e("，目录选择根目录就行。")],-1),G=a("h2",{id:"发布内容到-github-gh-pages-分支"},[a("a",{class:"header-anchor",href:"#发布内容到-github-gh-pages-分支","aria-hidden":"true"},"#"),e(" 发布内容到 Github "),a("code",null,"gh-pages"),e(" 分支")],-1),P=a("p",null,[e("如何将内容发布到到 Github "),a("code",null,"gh-pages"),e(" 分支呢？")],-1),w=a("div",{class:"language-bash line-numbers-mode"},[a("pre",null,[a("code",null,[a("span",{class:"token comment"},"## 保存更改"),e("\n"),a("span",{class:"token function"},"git"),e(),a("span",{class:"token function"},"add"),e(),a("span",{class:"token builtin class-name"},"."),e("\n"),a("span",{class:"token function"},"git"),e(" ci -m "),a("span",{class:"token string"},'"your commit message"'),e("\n"),a("span",{class:"token function"},"git"),e(" push\n\n"),a("span",{class:"token comment"},"# 执行发布脚本"),e("\n"),a("span",{class:"token comment"},"# ./deploy.sh 或者"),e("\ndeploy.sh\n")])]),a("div",{class:"line-numbers-wrapper"},[a("span",{class:"line-number"},"1"),a("br"),a("span",{class:"line-number"},"2"),a("br"),a("span",{class:"line-number"},"3"),a("br"),a("span",{class:"line-number"},"4"),a("br"),a("span",{class:"line-number"},"5"),a("br"),a("span",{class:"line-number"},"6"),a("br"),a("span",{class:"line-number"},"7"),a("br"),a("span",{class:"line-number"},"8"),a("br")])],-1),E=a("p",null,[a("code",null,"depoy.sh"),e(" 脚本内容如下：")],-1),V=a("div",{class:"language-bash line-numbers-mode"},[a("pre",null,[a("code",null,[a("span",{class:"token shebang important"},"#!/usr/bin/env sh"),e("\n\n"),a("span",{class:"token comment"},"# abort on errors"),e("\n"),a("span",{class:"token builtin class-name"},"set"),e(" -e\n\n"),a("span",{class:"token comment"},"# build"),e("\n"),a("span",{class:"token function"},"npm"),e(" run docs:build\n\n"),a("span",{class:"token comment"},"# navigate into the build output directory"),e("\n"),a("span",{class:"token builtin class-name"},"cd"),e(" docs/.vitepress/dist\n\n"),a("span",{class:"token comment"},"# if you are deploying to a custom domain"),e("\n"),a("span",{class:"token comment"},"# echo 'www.example.com' > CNAME"),e("\n\n"),a("span",{class:"token function"},"git"),e(" init\n"),a("span",{class:"token function"},"git"),e(),a("span",{class:"token function"},"add"),e(" -A\n"),a("span",{class:"token function"},"git"),e(" commit -m "),a("span",{class:"token string"},"'deploy'"),e("\n\n"),a("span",{class:"token comment"},"# if you are deploying to https://<USERNAME>.github.io"),e("\n"),a("span",{class:"token comment"},"# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master"),e("\n\n"),a("span",{class:"token comment"},"# if you are deploying to https://<USERNAME>.github.io/<REPO>"),e("\n"),a("span",{class:"token function"},"git"),e(" push -f git@github.com:baooab/dev-tricks.git master:gh-pages\n\n"),a("span",{class:"token builtin class-name"},"cd"),e(" -\n")])]),a("div",{class:"line-numbers-wrapper"},[a("span",{class:"line-number"},"1"),a("br"),a("span",{class:"line-number"},"2"),a("br"),a("span",{class:"line-number"},"3"),a("br"),a("span",{class:"line-number"},"4"),a("br"),a("span",{class:"line-number"},"5"),a("br"),a("span",{class:"line-number"},"6"),a("br"),a("span",{class:"line-number"},"7"),a("br"),a("span",{class:"line-number"},"8"),a("br"),a("span",{class:"line-number"},"9"),a("br"),a("span",{class:"line-number"},"10"),a("br"),a("span",{class:"line-number"},"11"),a("br"),a("span",{class:"line-number"},"12"),a("br"),a("span",{class:"line-number"},"13"),a("br"),a("span",{class:"line-number"},"14"),a("br"),a("span",{class:"line-number"},"15"),a("br"),a("span",{class:"line-number"},"16"),a("br"),a("span",{class:"line-number"},"17"),a("br"),a("span",{class:"line-number"},"18"),a("br"),a("span",{class:"line-number"},"19"),a("br"),a("span",{class:"line-number"},"20"),a("br"),a("span",{class:"line-number"},"21"),a("br"),a("span",{class:"line-number"},"22"),a("br"),a("span",{class:"line-number"},"23"),a("br"),a("span",{class:"line-number"},"24"),a("br"),a("span",{class:"line-number"},"25"),a("br")])],-1),j=a("p",null,[e("这段脚本是修改自 "),a("a",{href:"https://vitepress.vuejs.org/guide/deploy.html#github-pages",target:"_blank",rel:"noopener noreferrer"},"官方文档里给的"),e("，只是配置了下推送的远程仓库地址：")],-1),S=a("div",{class:"language-bash line-numbers-mode"},[a("pre",null,[a("code",null,[a("span",{class:"token function"},"git"),e(" push -f git@github.com:baooab/dev-tricks.git master:gh-pages\n")])]),a("div",{class:"line-numbers-wrapper"},[a("span",{class:"line-number"},"1"),a("br")])],-1),x=a("p",null,[e("现在打开 "),a("a",{href:"https://baooab.github.io/dev-tricks/",target:"_blank",rel:"noopener noreferrer"},"baooab.github.io/dev-tricks/"),e(" 站点，就能看到刚才发布的内容啦。")],-1),A=a("div",{class:"warning custom-block"},[a("p",{class:"custom-block-title"},"注意"),a("p",null,[e("注意虽然现在 Github 默认分支改成 "),a("code",null,"main"),e(" 了，但是 push 时还是要使用 "),a("code",null,"master:gh-pages"),e(" 推更改到 "),a("code",null,"gh-pages"),e(" 分支上去，而不是 "),a("s",null,[a("code",null,"main:gh-pages")]),e("。")])],-1),H=a("p",null,"（完）",-1);l.render=function(a,e,t,l,N,R){return n(),s("div",null,[p,r,o,c,i,u,b,g,m,k,d,h,f,v,y,G,P,w,E,V,j,S,x,A,H])};export default l;export{t as __pageData};
