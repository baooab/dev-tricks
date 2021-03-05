# lerna 学习笔记

仓库地址：https://github.com/lerna/lerna/tree/main/commands/version#readme

```bash
lerna version --no-push --yes -m "chore(release): publish %s"
```

baz-pkg 依赖 foo-pkg 包

```json
// baz-pkg
"devDependencies": {
  "foo-pkg": "^1.0.6"
}
```

现在修改 foo-pkg 中的源代码，执行 `lerna version --no-push --yes`:

```bash
Changes:
 - baz-pkg: 1.0.5 => 1.0.6
 - foo-pkg: 1.0.6 => 1.0.7

...

lerna info lifecycle foo-pkg@1.0.6~preversion: foo-pkg@1.0.6

> foo-pkg@1.0.6 preversion D:\Users\bzhang\lerna-demos\packages\foo-pkg
> echo foo preversion

foo preversion
lerna info lifecycle baz-pkg@1.0.5~preversion: baz-pkg@1.0.5

> baz-pkg@1.0.5 preversion D:\Users\bzhang\lerna-demos\packages\baz-pkg
> echo baz preversion

baz preversion
lerna info lifecycle baz-pkg@1.0.6~postversion: baz-pkg@1.0.6
lerna info lifecycle foo-pkg@1.0.7~postversion: foo-pkg@1.0.7

> baz-pkg@1.0.6 postversion D:\Users\bzhang\lerna-demos\packages\baz-pkg
> echo baz postversion

baz postversion

> foo-pkg@1.0.7 postversion D:\Users\bzhang\lerna-demos\packages\foo-pkg
> echo foo postversion

foo postversion
lerna success version finished
```

会发现，执行 lerna version 指令的时候，前后会执行两个生命周期指令：preversion 和 postversion。

还能发现，preversion 的执行顺序是沿着依赖树的最底层往上层去的，但是 postversion 就不是按照这个顺序（按照打印结果，是按照字母表顺序执行的）。
