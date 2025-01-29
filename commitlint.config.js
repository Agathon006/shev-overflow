export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'refactor',
        'fix',
        'chore',
        'docs',
        'style',
        'ci',
        'test',
        'perf',
        'revert',
        'build',
        'vercel',
      ],
    ],
  },
};