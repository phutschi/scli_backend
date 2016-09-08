// Shower rules
// 1. be naked
Shower.registerRule('distinctCommand', (fieldValue, ruleValue) => {
  let task = Tasks.findOne({command: fieldValue})

  return task === undefined
})

Shower.registerRule('categoryExists', (fieldValue, distinct) => {
  let category = Categories.findOne({name: fieldValue})

  return distinct ? category : distinct
})

// New Task Shower
Shower({
  name: 'newTask',
  fields: {
    name: {
      required: true,
      format: 'alphanumeric',
      transforms: ['trim'],
      message: 'bad name',
      rules: {
        minLength: 5,
        maxLength: 25
      }
    },
    category: {
      required: true,
      format: 'alphanumeric',
      transforms: ['toLowerCase', 'trim', 'capitalize'],
      message: 'category not found',
      rules: {
        categoryExists: true
      }
    },
    command: {
      required: true,
      format: 'alphanumeric',
      transforms: ['trim', 'slugify', 'clean', 'toLowerCase'],
      message: 'command already exists',
      rules: {
        distinctCommand: null,
        minLength: 3,
        maxLength: 15
      }
    },
    unit: {
      required: true,
      format: 'alphanumeric',
      transforms: ['trim', 'clean'],
      message: 'bad unit',
      rules: {
        maxLength: 4
      }
    },
    defaultAmount: {
      required: false,
      format: 'float',
      defaultValue: (f) => { return f['defaultAmount'] ? f['defaultAmount'] : 1.0 }
    },
    defaultMultiplier: {
      required: false,
      format: 'integer',
      defaultValue: (f) => { return f['defaultMultiplier'] ? f['defaultMultiplier'] : 1 }
    },
    minCycles: {
      required: false,
      format: 'float',
      defaultValue: (f) => { return f['minCycles'] ? f['minCycles'] : 1.0 }
    }
  }
})

// New Category Shower
Shower({
  name: 'newCategory',
  fields: {
    name: {
      required: true,
      format: 'alphanumeric',
      transforms: ['toLowerCase', 'trim', 'capitalize'],
      message: 'category already exists',
      rules: {
        categoryExists: false,
        minLength: 3,
        maxLength: 20
      }
    }
  }
})
