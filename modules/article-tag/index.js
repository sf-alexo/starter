// modules/article-tag/index.js
module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Article Tag',
    pluralLabel: 'Article Tags',
    slugPrefix: 'article-tag-',
  },
  fields: {
    add: {
      description: {
        type: 'string',
        label: 'Description',
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'description'],
      },
    },
  },
}
