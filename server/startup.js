Meteor.startup(() => {
  let m = moment().subtract(365, 'days').toDate(),
      someDate = Events.find({time: {$gt: m}}).fetch(),
      calories = 0.0

  _.each(someDate, (e) => {
    calories = calories + parseFloat(e['value'])
  })

  console.log(`Kalorien: ${calories}`);
});
