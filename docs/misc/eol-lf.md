# 将文件换行符设置成 LF

在 Windows 和 Mac 写代码时，默认使用的换行符是不一样的。Windows 上是 `\r\n`（CRLF），Mac 上是 `\n`（LF）。

为了能是在 Windows 和 Mac 上获得一致的开发体验，按照经验来说，把换行符统一换成 Mac 的 `\n` 会好一些。

下面介绍了在一些环境中设置换行符的操作：

一、VSCode

Settings 中设置

```
"files.eol": "\n"
```

而不是用默认的 auto。

二、Git

```
git config --global core.autocrlf false
```

如需区分文件名大小写，可设置 `git config --global core.ignorecase true`

三、TypeScript

```
{
  "compilerOptions": {
    "newLine": "lf"
  }
}
```

四、eslint

```
/*eslint linebreak-style: ["error", "unix"]*/
```


参考链接：

- https://stackoverflow.com/questions/52404044/changing-file-eol-with-vscode-extension-api
- https://docs.github.com/cn/github/using-git/configuring-git-to-handle-line-endings#global-settings-for-line-endings
- https://www.typescriptlang.org/tsconfig#newLine
- http://eslint.cn/docs/rules/linebreak-style
