/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--foreground)',
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-lead': 'var(--foreground)',
            '--tw-prose-links': '#2563eb', 
            '--tw-prose-bold': 'var(--foreground)',
            '--tw-prose-counters': 'var(--foreground)',
            '--tw-prose-bullets': 'var(--foreground)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--foreground)',
            '--tw-prose-quote-borders': 'var(--border)',
            '--tw-prose-captions': 'var(--foreground)',
            '--tw-prose-code': 'var(--foreground)',
            '--tw-prose-pre-code': 'var(--secondary-foreground)',
            '--tw-prose-pre-bg': 'var(--secondary)',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
            a: {
              color: '#2563eb', 
              '&:hover': {
                color: '#1d4ed8', 
              },
              textDecoration: 'none', 
              '&:hover': {
                textDecoration: 'underline', 
              },
            },
            maxWidth: 'none',
            color: 'var(--foreground)',
            fontSize: '1rem',
            p: {
              color: 'var(--foreground)',
              opacity: '0.9',
            },
            li: {
              color: 'var(--foreground)',
              opacity: '0.9',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
