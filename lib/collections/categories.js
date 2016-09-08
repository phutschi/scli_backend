Categories = new Mongo.Collection('categories');

Categories.allow({
  insert: () => { return true; },
  update: () => { return true; },
  remove: () => { return true; }
});
