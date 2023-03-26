export function analyzeFileChange(list, newList) {
  const idList = list.map((item) => item.id)

  const fileList = []
  const updateList = []
  const createList = []
  const deleteList = []

  const rawItemList = newList.filter((item, i) => {
    // 重合项置为null 非null项即为被删除项
    const idIndex = idList.indexOf(item.id)
    if (idIndex !== -1) idList[idIndex] = null
    return item.raw
  })
  idList.forEach((item, i) => {
    if (item) {
      const { id, url } = list[i]
      deleteList.push({ id, url })
    }
  })
  rawItemList.forEach(({ id, raw, oldUrl }, i) => {
    fileList.push(raw)
    // 同时包含 id 和 raw 即为更新项
    if (id && raw) updateList.push({ id, index: i, url: oldUrl })
    // 仅包含 raw 即为新增项
    if (!id && raw) createList.push({ index: i })
  })
  return {
    createList,
    updateList,
    deleteList,
    fileList,
  }
}
