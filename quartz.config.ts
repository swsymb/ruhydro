import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "RuHydro",
    pageTitleSuffix: "- Цифровой дневник садовода-экспериментатора.",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ru-RU",
    baseUrl: "swsymb.github.io/ruhydro",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
	lightMode: {
    light: '#ffffff',           // Чистый белый фон
    lightgray: '#f0f0f0',       // Очень светлый серый для тонких границ
    gray: '#d0d0d0',           // Серый для разделителей
    darkgray: '#333333',       // Темно-серый для основного текста (максимальная читаемость)
    dark: '#1a1a1a',           // Почти черный для заголовков
    secondary: '#2d8b4e',      // Зеленый для ссылок (сдержанный, но заметный)
    tertiary: '#5cb176',       // Светлее зеленый для ховеров
    highlight: '#ffffff',      // Едва заметный зеленоватый фон для выделения
    textHighlight: '#e8f5ea'   // Легкая зеленая подсветка текста
	},
	darkMode: {
    // Минималистичная темная тема
    light: '#0a0a0a',          // Глубокий черный
    lightgray: '#1a1a1a',      // Темно-серый
    gray: '#2a2a2a',           // Серый для границ
    darkgray: '#e0e0e0',       // Светло-серый для текста
    dark: '#f5f5f5',           // Почти белый для заголовков
    secondary: '#4caf7d',      // Мягкий зеленый
    tertiary: '#6bc491',       // Светло-зеленый для ховеров
    highlight: '#1a2a1f',      // Темно-зеленый фон
    textHighlight: '#223327'   // Темная зеленая подсветка
		},
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
