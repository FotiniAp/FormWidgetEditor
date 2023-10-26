const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'form_widget_editor',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/api/form-settings', (req, res) => {
    const { title, subtitle, font_size, font_color, text_alignment, submit_button_bg_color } = req.body;

    const formSettings = {
        title,
        subtitle,
        font_size,
        font_color,
        text_alignment,
        submit_button_bg_color,
    };

    const sql = 'INSERT INTO form_settings SET ?';

    db.query(sql, formSettings, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving form settings' });
        }

        console.log('Form settings saved');
        res.status(200).json({ message: 'Form settings saved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});