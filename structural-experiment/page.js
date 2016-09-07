function Page (client) {
  if (!(this instanceof Page)) return new Page(client);
  this.client = client;
}

Page.prototype.open = function (path,callback) {
  this.client.init()
  .url(path)
  .getTitle().then(function (title) {
    console.log('client title callback')
    returnTitle = title;
    callback(title);
  })
}

module.exports = Page;
