<template>
  <div>
    <h1>Blog Editor</h1>
    <form @submit.prevent="save">
      <input v-model="form.title" placeholder="Title" />
      <input v-model="form.id" placeholder="Blog id" />
      <input v-model="form.author" placeholder="Author" />
      <textarea v-model="form.content" placeholder="Content"></textarea>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['addNewItem'])
const form = reactive({
  title: '',
  id: '',
  author: '',
  content: ''
})

const save = () => {
  emit('addNewItem', { ...form })
  Object.keys(form).forEach(key => form[key] = '')
}
</script>

<style scoped>
form > * {
  display: block;
  margin: 1rem 0;
}
</style>
