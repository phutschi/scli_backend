import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'

Meteor.publish('singleCategory', (name) => {
  return Categories.find({name: name})
})

Meteor.publish('singleCommand', (command) => {
  return Tasks.find({command: command})
})

Meteor.publish('events', function(e) { // () => {} does not work!
  let pipe = [{ $match: {type: {$in: e}, time: {$gt: moment().subtract(1, 'year').toDate()}}}, { $group: { _id: '$type', 'totalSum' : {$sum: '$value'}}}],
      result = Events.aggregate(pipe),
      self = this

  _.each(result, (r) => {
    self.added('events', r._id, {amount: r.totalSum})
  })

  self.ready()
});

Meteor.publish('heartRate', function(start, end, resolution) { // () => {} does not work! start date end date resolution 'hours' 'minutes' 'days'
  let pipe = [
    {
      $match: { time: {$gt: start, $lt: end}, type: 'HKQuantityTypeIdentifierHeartRate' }
    },
    {
      $project: { year: { $year: "$time" }, month: { $month: "$time" }, day: { $dayOfMonth: "$time" }, hour: { $hour: "$time" }, minute: { $minute: "$time" }, value: 1 }
    },
    {
      $group: {"_id": {"year":"$year","month":"$month","day":"$day","hour":"$hour", "minute": "$minute"}, "total":{ "$avg": "$value"}}
    },

    // Stage 4
    {
      $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.day': 1, '_id.hour': 1, '_id.minute': 1 }
    }
  ],
      result = Events.aggregate(pipe),
      self = this

  _.each(result, (r) => {
    self.added('HKQuantityTypeIdentifierHeartRate', Random.id(), {time: moment(`${r._id.year}-${r._id.month}-${r._id.day} ${r._id.hour}:${r._id.minute}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'), amount: r.total.toFixed()})
  })

  self.ready()
});
