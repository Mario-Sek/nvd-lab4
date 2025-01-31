<template>
  <main>
    <BlogEditor
        v-if="showEditor"
        @addNewItem="handleAdd"
    />
    <button
        v-else
        @click="showEditor = true"
    >
      Add new blog
    </button>

    <Blogs
        :blogs="blogs"
        :is-loading="isLoading"
        :error="error"
        @deleteBlog="handleDelete"
    />
  </main>
</template>

<script setup>
import {ref} from 'vue'
import BlogEditor from './BlogEditor.vue'
import Blogs from './Blogs.vue'
import {useBlogs} from '../composables/useBlogs'

const showEditor = ref(false)
const {blogs, isLoading, error, addItem, deleteItem} = useBlogs()

const handleAdd = async (blog) => {
  await addItem(blog)
  showEditor.value = false
}

const handleDelete = deleteItem
</script>
