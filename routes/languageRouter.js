const express = require("express");
const fs = require("fs");
const path = require("path");

const languageRouter = express.Router();

languageRouter.get("/", (req, res) => {
    const lang = req.params.lang;
    const filePath = path.join(__dirname, `../public/languages/${lang}.json`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "Language not found" });
    }
});

module.exports = languageRouter;

