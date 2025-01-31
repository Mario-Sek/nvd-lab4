export function useListActions(items) {
  return {
    addItem: item => items.value.push(item),
    deleteItem: id => {
      const idx = items.value.findIndex(item => item.id === id)
      if (idx >= 0) items.value.splice(idx, 1)
    }
  }
}
