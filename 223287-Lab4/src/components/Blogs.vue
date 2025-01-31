<template>
  <main>
    <h1>Blogs</h1>
    <template v-if="isLoading || error">
      <div class="status">{{ isLoading ? 'Loading...' : error }}</div>
    </template>
    <section v-else>
      <header>
        <input v-model="searchTerm" placeholder="Search..." />
        <div>
          <span>Filters:</span>
          <input type="checkbox" v-model="filters" value="title" id="t" />
          <label for="t">Title</label>
          <input type="checkbox" v-model="filters" value="description" id="d" />
          <label for="d">Content</label>
        </div>
      </header>

      <div class="grid">
        <article v-for="b in filteredBlogs" :key="b.id">
          <img v-if="b.heroImage" :src="`${b.heroImage.fields.file.url}?w=350`" />
          <div>
            <time>{{ new Date(b.publishDate).toDateString() }}</time>
            <h3>{{ b.title }}</h3>
            <p>{{ b.description }}</p>
            <button @click="$emit('deleteBlog', b.id)">Delete</button>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useSearch} from '../composables/useSearch'

const props = defineProps({
  blogs: Array,
  isLoading: Boolean,
  error: String
})

const blogs = ref(props.blogs)
watch(() => props.blogs, val => blogs.value = val)

const {searchTerm, filters, filteredItems: filteredBlogs} = useSearch(blogs)
defineEmits(['deleteBlog'])
</script>

<style scoped>
.status {
  text-align: center;
  padding: 2rem;
}

header {
  margin: 1rem 0;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

article {
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

div {
  padding: 1rem;
}

time {
  font-size: 0.8rem;
  color: #666;
}

button {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
</style>
