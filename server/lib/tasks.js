Meteor.methods({
  singleCommand: (command) => {
    return Tasks.findOne({command: command}, {fields: {command: 1}})
  },
  singleCategory: (category) => {
    return Categories.findOne({name: category})
  }
});
