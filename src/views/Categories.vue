<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Categories' | localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreats @created="addNewCategory" :key="locale
        "/>

        <CategoryEdit 
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories"
        
        />
        <p v-else class="center">{{'Category_No' | localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreats from '@/components/CategoryCreats'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  metaInfo() {
     return {
       title: this.$title('Menu_Categories')
     }
   },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreats, CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  computed: {
    locale() {
      return this.$store.getters.info.locale
    }
  }
}
</script>
