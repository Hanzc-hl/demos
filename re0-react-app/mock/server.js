const config = require('./config');
const path = require('path');
const fs = require('fs');

module.exports = function (app) {
  Object.keys(config).forEach(key => {
    app.use(key, function (req, res) {
      const filename = path.join(__dirname, config[key].local)
      if(filename.match(/\.json$/)){
        res.json(JSON.parse(fs.readFileSync(filename)))
      } else {
        delete require.cache[filename]
        require(filename)(req, res)
      }
    })
  })
}