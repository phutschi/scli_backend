import { ReactiveVar } from 'meteor/reactive-var'

Template.activity.onCreated(() => {
  let self = Template.instance()
  
  self.ready = new ReactiveVar(false)

  Tracker.autorun(() => {
    let eventsHandler = self.subscribe('events', ['HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierDietaryCarbohydrates'])

    if (eventsHandler.ready()) { self.ready.set(true) }
  });
})

Template.activity.onRendered(() => {})

Template.activity.helpers({
  subscriptionsReady: () => {
    return Template.instance().ready.get()
  },
  allCalories: () => {
    let events = Events.find().fetch()
        calories = _.findWhere(events, {_id: 'HKQuantityTypeIdentifierActiveEnergyBurned'});

    return calories ? calories.amount : null
  },
  allCarbs: () => {
    let events = Events.find().fetch()
        calories = _.findWhere(events, {_id: 'HKQuantityTypeIdentifierDietaryCarbohydrates'});

    return calories ? calories.amount : null
  }
})
