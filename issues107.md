- https://search.google.com/search-console/about
- https://analytics.google.com/analytics/web/
- https://ziyuan.baidu.com/linksubmit/url?sitename=
- https://tongji.baidu.com/web/welcome/login
- https://github.com/w3itch-crafter/w3itch-frontend/issues/129

---

- [google search console 终极教程](https://zhuanlan.zhihu.com/p/150718629)
- [关于Robots.txt和SEO: 你所需要知道的一切](https://ahrefs.com/blog/zh/robots-txt/)
- https://github.com/iamvishnusankar/next-sitemap#building-sitemaps

Next 使用 next-sitemap

### Server side index-sitemaps (getServerSideSitemapIndex)
生成 sitemaps 索引，在大文件拆分应该可以用到

- https://github.com/iamvishnusankar/next-sitemap#server-side-index-sitemaps-getserversidesitemapindex

```tsx
// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemapIndex(ctx, [
    'https://example.com/path-1.xml',
    'https://example.com/path-2.xml',
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
```

```xml
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
<loc>https://example.com/path-1.xml</loc>
</sitemap>
<sitemap>
</sitemapindex>
```

### server side sitemap (getServerSideSitemap)
生成 sitemaps

- https://github.com/iamvishnusankar/next-sitemap#server-side-sitemap-getserversidesitemap

```tsx
// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const fields = [
    {
      loc: 'https://example.com', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://example.com/dynamic-path-2', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
```
`fields` TS is `ISitemapField[]`

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url>
<loc>https://demo.io/game/65</loc>
<lastmod>2022-05-12T16:35:07.696Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
</urlset>
```

### JSON-LD
- https://github.com/garmeeh/next-seo#json-ld
- https://search.google.com/test/rich-results
- https://developers.google.com/search/docs/advanced/robots/robots_meta_tag?hl=zh-cn



<img width="791" alt="image" src="https://user-images.githubusercontent.com/24250627/168475174-bc6729eb-1d65-4791-9f59-c16b5aba4c20.png">
