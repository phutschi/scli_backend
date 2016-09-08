import {errorCallback} from './utilities'

export default class category {
  constructor(obj, errorCallback) {
    this.obj = obj
    this.processedData = this.shower()

    if (!this.processedData.errors) {
      let category = Categories.insert(this.processedData.formData)
      errorCallback(undefined, category)

      return;
    }

    errorCallback(this.processedData.errors)
  }

  shower() {
    return Shower.newCategory.validate(this.obj)
  }
}
