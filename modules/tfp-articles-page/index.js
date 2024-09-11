module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Blog Page',
    pluralLabel: 'Blog Pages',
    pieceModuleName: 'tfp-articles',
    perPage: 2,
  },
  methods(self) {
    return {
      indexQuery(req) {
        const query = self.pieces
          .find(req, {})
          .project({
            title: 1,
            _url: 1,
            heroImage: 1,
            summary: 1,
            authorInfo: 1,
            _tags: 1,
          })
          .applyBuildersSafely(req.query)
          .perPage(self.perPage)

        if (req.query.tag) {
          query.tags(req.query.tag)
        }

        self.filterByIndexPage(query, req.data.page)

        const sortDirection = req.query.sort === 'asc' ? 1 : -1
        query.sort({ articleDate: sortDirection })
        return query
      },
      async beforeIndex(req) {
        try {
          const articles = await self.apos.modules['tfp-articles']
            .find(req)
            .project({ _tags: 1 }) // Fetch only _tags
            .toArray()

          // Extracting unique tag IDs from articles
          const tagIds = articles.flatMap(article =>
            article._tags.map(tag => tag._id),
          )
          const uniqueTagIds = [...new Set(tagIds)]
          
          const tagManager = self.apos.modules['article-tag']

          // Find all article-tag pieces
          const tags = await tagManager
            .find(req)
            .criteria({ _id: { $in: uniqueTagIds } })
            .project({ _id: 1, title: 1, slug: 1 })
            .toArray()

          // Add the tags to the data object so they're available in the template
          req.data.allTags = tags
        } catch (error) {
          console.error('Error fetching article tags:', error)
        }
      },
    }
  },
}
