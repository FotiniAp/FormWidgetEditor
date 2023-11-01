const mongoose = require('mongoose')

const widgetList = new mongoose.Schema({
   uniqueId: mongoose.Schema.Types.ObjectId,
   htmlCode: {
      type: String,
      validate: {
         validator: (value) => {
            return typeof value === 'string';
         },
         message: 'htmlCode must be a string',
      },
   },
})

module.exports = mongoose.model('Widget', widgetList)