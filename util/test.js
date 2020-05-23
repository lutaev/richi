module.exports.toJSON = items => {
  return items.map(item => {
    const parsed = item.toJSON()
    return {
      ...parsed,
      createdAt: parsed.createdAt.toISOString(),
      updatedAt: parsed.updatedAt.toISOString()
    }
  })
}