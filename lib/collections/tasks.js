Tasks = new Mongo.Collection('tasks');

Tasks.allow({
  insert: () => { return true; },
  update: () => { return true; },
  remove: () => { return true; }
});
