import Task from '../../modules/tasks'
import Category from '../../modules/categories'

new Task({name: 'sahne', category: 'health', command: 'sahne', unit: 'l', defaultAmount: 1, minCycles: 0}, (e, r) => {
  e ? console.log(e) : console.log(r);
})
