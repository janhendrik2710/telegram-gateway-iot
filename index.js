const express = require('express');
const fetch = require('node-fetch');
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get('/send', async (req, res) => {
  const msg = req.query.msg;
  if (!msg) return res.status(400).send('Missing msg');
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: msg,
          parse_mode: 'Markdown'
        })
      }
    );
    const data = await response.json();
    if (data.ok) return res.send('OK');
    else return res.status(500).send('Telegram error');
  } catch (e) {
    console.error(e);
    return res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
