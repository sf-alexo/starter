module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Article',
    pluralLabel: 'Articles',
    sort: {
      articleDate: -1,
    },
    perPage: 9,
  },
  fields: {
    add: {
      articleDate: {
        label: 'Date11',
        type: 'date',
        required: true,
      },
      authorInfo: {
        label: 'Author',
        type: 'object',
        fields: {
          add: {
            authorName: {
              type: 'string',
              label: 'Name',
              help: 'Names are intentionally kept untranslatable on pages to avoid potential inaccuracies in translations and prevent issues that may arise from incorrect rendering of personal or specific names.',
            },
            authorPosition: {
              type: 'string',
              help: 'Will be rendered only if Name is not empty',
              label: 'Position',
            },
          },
        },
      },
      heroImage: {
        label: 'Thumbnail Image',
        type: 'area',
        help: 'Will appear on Blog Landing page',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {},
          },
        },
      },
      summary: {
        label: 'Summary',
        type: 'string',
        textarea: true,
        help: 'Will appear on Blog Landing page',
      },
      articleHeading: {
        label: 'Article Heading',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            'tfp-heading': {},
          },
        },
      },
      _tags: {
        type: 'relationship',
        label: 'Tags',
        withType: 'article-tag',
        builders: {
          project: {
            title: 1,
            slug: 1,
          },
        },
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'articleDate', 'authorInfo'],
      },
      content: {
        label: 'Content',
        fields: ['heroImage', 'summary', 'articleHeading'],
      },
    },
  },
  columns: {
    add: {
      articleDate: {
        label: 'Article Date',
        component: 'ArticleDate',
      },
    },
  },
}
