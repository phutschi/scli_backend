import { ReactiveVar } from 'meteor/reactive-var'
import Chart from 'chart.js'

Template.chart_heartRate.onCreated(() => {
  let self = Template.instance()

  HKQuantityTypeIdentifierHeartRate = new Mongo.Collection('HKQuantityTypeIdentifierHeartRate');

  self.ready = new ReactiveVar(false)

  Tracker.autorun(() => {
    let heartRateHandler = self.subscribe('heartRate', moment('2016-09-01 00:00:00', 'YYYY-MM-DD HH:mm').toDate(), moment("2016-09-01 13:00:00", 'YYYY-MM-DD HH:mm').toDate(), 'hours')

    if (heartRateHandler.ready()) { self.ready.set(true) }
  });
})

Template.chart_heartRate.onRendered(() => {
  let self = Template.instance()

  Tracker.autorun(() => {
    let dataReady = self.ready.get()

    if (dataReady) {
      let events = HKQuantityTypeIdentifierHeartRate.find().fetch(),
          times = _.pluck(events, 'time'),
          rates = _.pluck(events, 'amount'),
          x = ['x'],
          y = ['heart rate'],
          ctx = document.getElementById("myChart");

          // let insertEmpty = (data) => {
          //   for (let i = 0; i < data.length; i++) {
          //     let diff = moment(data[i], 'YYYY-MM-DD HH:mm').diff(moment(data[i-1], 'YYYY-MM-DD HH:mm'), 'hours')
          //
          //     if (diff && diff >= 5) {
          //       times.splice(i, 0, NaN)
          //       rates.splice(i, 0, NaN)
          //     }
          //   }
          // }
          //
          // insertEmpty(times)

      let chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: times,
          datasets: [{
            label: 'heartRate',
            fill: false,
            lineTension: 0.1,
            data: rates,
            borderColor: 'rgba(207, 28, 83, 1)',
            backgroundColor: 'rgba(207, 28, 83, 0.4)',
            borderWidth: 1,
            pointRadius: 3,
            pointBorderWidth: 1,
            pointBackgroundColor: 'rgba(23, 233, 194, 1)'
          }]
        },
        options: {
          responsive:false,
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                min: times[0]
              },
              position: 'bottom'
            }]
          }
        }
      })
    }
  });
})

Template.chart_heartRate.helpers({
  subscriptionsReady: () => {
    return Template.instance().ready.get()
  }
})
