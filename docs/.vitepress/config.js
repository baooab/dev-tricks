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
}

function getGuideSidebar() {
    return [
        {
            text: '最近更新',
            children: [
                {
                    text: '如何将 VitePress 部署到 GitHub Pages',
                    link: '/git/vitepress-deploy-to-github'
                }
            ]
        }
    ]
}
