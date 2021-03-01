# 如何使用指定了 peerDependencies 的 npm 包

使用 [install-peerdeps][1] 工具，以安装 [eslint-config-airbnb][2] 为例。

## 作为 devDependencies 安装

```bash
npx install-peerdeps eslint-config-airbnb --dev --registry=https://registry.npm.taobao.org/
```

::: warning 警告
这里需要指定 registry 地址，否则会走默认的 npm registry 地址：https://registry.npmjs.org/
:::

```json
"devDependencies": {
    "eslint": "^7.2.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.21.5",
    "eslint-plugin-react-hooks": "^4.0.0"
},
```

## 作为 pependencies 安装：


```bash
npx install-peerdeps eslint-config-airbnb --registry=https://registry.npm.taobao.org/
```

```json
"dependencies": {
    "eslint": "^7.2.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.21.5",
    "eslint-plugin-react-hooks": "^4.0.0"
},
```

[1]: https://www.npmjs.com/package/install-peerdeps
[2]: https://www.npmjs.com/package/eslint-config-airbnb
