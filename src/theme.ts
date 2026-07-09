import { defineTheme } from '@astryxdesign/core/theme'

const brand = {
  ink: '#222017',
  'ink-2': '#3a3527',
  muted: '#7d735f',
  'muted-2': '#665f4e',
  paper: '#f6f0e5',
  sage: '#4a6c56',
  'sage-dark': '#314225',
  'sage-deep': '#3f5a47',
  terracotta: '#8b3a2b',
  amber: '#5a4514',
} as const

const alpha = (token: keyof typeof brand, value: string) => `${brand[token]}${value}`

export const portfolioTheme = defineTheme({
  name: 'ted-portfolio',
  color: { accent: brand.sage, neutralStyle: 'warm' },
  typography: {
    body: { family: 'Geist Sans', fallbacks: '-apple-system, BlinkMacSystemFont, sans-serif' },
    heading: { family: 'Geist Sans', fallbacks: '-apple-system, BlinkMacSystemFont, sans-serif' },
    code: {
      family: 'Geist Mono',
      fallbacks: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    },
  },
  tokens: {
    '--color-accent': [brand.sage, brand.sage],
    '--color-accent-muted': [alpha('sage', '1f'), alpha('sage', '1f')],
    '--color-on-accent': ['#ffffff', '#ffffff'],
    '--color-text-accent': [brand['sage-deep'], brand['sage-deep']],
    '--color-icon-accent': [brand.sage, brand.sage],

    '--color-background-body': [brand.paper, brand.paper],
    '--color-background-surface': ['#fbf7ef', '#fbf7ef'],
    '--color-background-card': ['#fffdf9', '#fffdf9'],
    '--color-background-popover': ['#fffdf9', '#fffdf9'],
    '--color-background-muted': [alpha('ink', '0c'), alpha('ink', '0c')],
    '--color-background-inverted': [brand.ink, brand.ink],

    '--color-text-primary': [brand.ink, brand.ink],
    '--color-text-secondary': [brand['muted-2'], brand['muted-2']],
    '--color-text-disabled': ['#a89e8a', '#a89e8a'],
    '--color-icon-primary': [brand.ink, brand.ink],
    '--color-icon-secondary': [brand['muted-2'], brand['muted-2']],

    '--color-border': [alpha('ink', '21'), alpha('ink', '21')],
    '--color-border-emphasized': [alpha('ink', '40'), alpha('ink', '40')],
    '--color-skeleton': ['#ded5c2', '#ded5c2'],
    '--color-track': ['#ded5c2', '#ded5c2'],

    '--color-overlay-hover': [alpha('ink', '0c'), alpha('ink', '0c')],
    '--color-overlay-pressed': [alpha('ink', '19'), alpha('ink', '19')],

    '--color-error': [brand.terracotta, brand.terracotta],
    '--color-error-muted': [alpha('terracotta', '1f'), alpha('terracotta', '1f')],
    '--color-on-error': ['#ffffff', '#ffffff'],
    '--color-warning': [brand.amber, brand.amber],
    '--color-on-warning': [brand.paper, brand.paper],
  },
  components: {
    button: { base: { borderRadius: '999px' } },
  },
})
