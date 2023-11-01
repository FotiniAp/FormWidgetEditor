const express = require("express");
const { SaveFormWidget, GetFormWidget } = require("../controller/FormWidgetController");
const router=express.Router();

// api route
router.post(`/api/form-settings`,SaveFormWidget);
router.get(`/api/get-form-widget`,GetFormWidget);

module.exports = router;                       

