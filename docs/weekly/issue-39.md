# 每周分享第 39 期

2021.03.08 ~ 2021.03.12

## 文章

- [A Beginner's Guide to Lerna with Yarn Workspaces][1]

Yarn Workspaces 功能类似于 `lerna bootstrap` 指令，本文讲述如何将它与 Lerna 结合使用。

- [Diving into the ::before and ::after Pseudo-Elements][2]

深入理解 `::before`、`::after` 伪元素。

- [https://web.dev/javascript-this/][3]

理解 JavaScript 中 `this` 的含义，来自 web.dev 的教程。

- [The Final ECMAScript 2021 Feature Set][4]

ECMAScript 2021 要加入的各种特性已经定案，这一篇是来自著名程序员 Dr. Axel 的教程。他 [还写了其他一些可以在网上免费阅读的 JS 书籍](https://exploringjs.com/index.html)。

- [如何提升你的 debug 水平？](https://www.sitepoint.com/beyond-console-log-level-up-your-debugging-skills/)

除了使用 `console.log` 方式，还能以何种方式提升你的 debug 技能呢？

- [使用 `IntersectionObserver` API 创建文章目录](https://css-tricks.com/table-of-contents-with-intersectionobserver/)

- [前端打包(Bundlers)工具漫游](https://dev.to/walpolea/through-the-pipeline-an-exploration-of-front-end-bundlers-ea1)

- [You don't know the classNames library](https://areknawo.com/you-dont-know-the-classnames-library/)

针对 DOM 元素 className 属性的一个操作库。有何与众不同呢？

- [网页中隐藏元素的 N 种方式](https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/)

- [使用纯 CSS 禁用链接](https://gist.github.com/mewmew/510801ff9024f833c4967c8a922d1a05)

- [`display_override` 属性介绍]

是跟 `display` 属性合作使用的。下面是简单用例：

```css
{
  "display_override": ["window-controls-overlay", "minimal-ui"],
  "display": "standalone",
}
```

这是什么高级用法？？

- [How to Map Mouse Position in CSS](https://css-tricks.com/how-to-map-mouse-position-in-css/)

使用 CSS 变量(`--positionX` `--positionY`)来跟踪鼠标光标位置。

- [Grid 布局初学者教程](https://www.codeinwp.com/blog/css-grid-tutorial-layout/)

- [Keeping Count of User Visits](https://www.raymondcamden.com/2021/02/23/keeping-count-of-user-visits) — Using client-side storage to keep track of user visits to a site.

## 工具


- [Hybrids](https://hybrids.js.org/#/): Hybrids is a UI library for creating web components with unique declarative and functional approach based on plain objects and pure functions.
- [Math.js 9.3: An Extensive Math Library for Node and Browse](https://mathjs.org/)
- [DevTools 中支持 CSS-in-JS 代码检查](https://developers.google.com/web/updates/2021/02/css-in-js)

Google Chrome 浏览器。

- [element-resize-detector](https://github.com/wnr/element-resize-detector)

Optimized cross-browser resize listener for elements.
## 版本发布

- [esbuild 0.9](https://github.com/evanw/esbuild/releases/tag/v0.9.0)
- [jQuery 3.6.0](http://blog.jquery.com/2021/03/02/jquery-3-6-0-released/)
- [ress: A Modern CSS Reset ](https://ress-css.surge.sh/)

基于 [Normalize.cs](https://necolas.github.io/normalize.css/)

## 参考链接

- https://frontendfoc.us/issues/480
- https://javascriptweekly.com/issues/529

[1]: https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d
[2]: https://codersblock.com/blog/diving-into-the-before-and-after-pseudo-elements/
[3]: https://2ality.com/2020/09/ecmascript-2021.html