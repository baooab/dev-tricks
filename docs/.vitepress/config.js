module.exports = {
    lang: 'zh-CN',
    base: '/dev-tricks/',
    title: 'Dev Tricks',
    description: 'dev tricks about web',

    themeConfig: {
        repo: 'baooab/dev-tricks',
        docsDir: 'docs',

        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '最近更新',

        sidebar: {
            '/': getGuideSidebar()
        }
    },

    markdown: {
        lineNumbers: true
    }
}

function getGuideSidebar() {
    return [
        {
            text: '最近更新',
            children: [
                {
                    text: 'TypeScript Evolution 系列文章',
                    link: '/typescript/README'
                },
                {
                    text: '将开发环境的文件换行符设置成 LF',
                    link: '/misc/eol-lf'
                },
                {
                    text: '如何使用指定了 peerDependencies 的 npm 包',
                    link: '/npm/install-peerdeps'
                }
            ]
        }
    ]
}
