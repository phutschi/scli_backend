import {errorCallback} from './utilities'

export default class task {
  constructor(obj, errorCallback) {
    this.obj = obj
    this.processedData = this.shower()

    if (!this.processedData.errors) {
      let task = Tasks.insert(this.processedData.formData)
      errorCallback(undefined, task)

      return;
    }

    errorCallback(this.processedData.errors)
  }

  shower() {
    return Shower.newTask.validate(this.obj)
  }
}
