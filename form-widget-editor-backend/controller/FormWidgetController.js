const mongoose = require('mongoose');
const Widget = require("../model/widget");

exports.SaveFormWidget = function (req, res) {
    const htmlCode = req.body.htmlCode;

    if (typeof htmlCode !== 'string') return res.status(400).json({ error: 'htmlCode must be a string' });
    
    // craete document for form-widget
    const widgetDoc = new Widget({uniqueId: new mongoose.Types.ObjectId(),htmlCode: htmlCode});

    // validation schema for form-widget document
    widgetDoc.validate()
        .then(() => widgetDoc.save())
        .then((result) => {
            res.status(200).json({ uniqueId: result.uniqueId });
        })
        .catch((error) => {
            if (error.name === 'ValidationError') res.status(400).json({ error: error.message });
            else {
                // another errors
                console.error(error); // console error - debugging
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
}

exports.GetFormWidget = function (req, res) {
    const paramValue = req.query.uniqueId;
    // find document with received params and send response
    Widget.findOne({ uniqueId: paramValue })
        .then((result) => {
            if (!result) res.status(404).json({ error: 'Not Found' });
            else res.status(200).json({ uniqueId: result.uniqueId, htmlCode: result.htmlCode });

        })
        .catch((error) => {
            console.error(error); // console error - debugging
            res.status(500).json({ error: 'Internal Server Error' });
        });
}