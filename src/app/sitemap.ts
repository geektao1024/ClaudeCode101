import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://claudecode101.com'

  // 基础页面
  const routes = [
    '',
    '/quick-start',
    '/api-reference',
    '/resources',
    '/upgrade',
    '/tutorial',
    '/tutorial/getting-started/installation',
    '/tutorial/getting-started/basic-usage',
    '/tutorial/configuration/claude-md',
    '/tutorial/configuration/tools-allowlist',
    '/tutorial/configuration/github-cli',
    '/tutorial/tools-integration/bash-tools',
    '/tutorial/tools-integration/mcp-servers',
    '/tutorial/tools-integration/custom-commands',
    '/tutorial/workflows/explore-plan-code',
    '/tutorial/optimization/specific-instructions',
    '/tutorial/optimization/context-management',
    '/tutorial/optimization/direction-correction',
    '/tutorial/advanced/headless-mode',
    '/tutorial/advanced/multi-claude',
  ]

  // 为每个路由创建中英文版本
  const sitemap: MetadataRoute.Sitemap = []

  routes.forEach(route => {
    // 中文版本
    sitemap.push({
      url: `${baseUrl}/zh${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : route.includes('/tutorial/') ? 0.8 : 0.6,
    })

    // 英文版本
    sitemap.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : route.includes('/tutorial/') ? 0.8 : 0.6,
    })
  })

  // 添加根路径（默认重定向到中文）
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  return sitemap
}
