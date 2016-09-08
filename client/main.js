Template.main.onCreated(() => {
  let self = Template.instance()

  Tracker.autorun(() => {
    self.subscribe('categories.all')
  })
})
