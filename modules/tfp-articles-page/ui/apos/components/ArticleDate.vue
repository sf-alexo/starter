<template>
  <p
    class="apos-table__cell-field"
    :class="`apos-table__cell-field--${header.name}`"
  >
    <span v-if="hasValue">
      {{ formatDate(get(header.name)) }}
    </span>
    <span v-else> None </span>
  </p>
</template>

<script>
import AposCellMixin from 'Modules/@apostrophecms/ui/mixins/AposCellMixin'

export default {
  name: 'ColumnDate',
  mixins: [AposCellMixin],
  computed: {
    hasValue() {
      return this.get(this.header.name) != null
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''

      const date = new Date(dateString)

      const formattedDate = date.toLocaleDateString()

      return formattedDate
    },
  },
}
</script>
