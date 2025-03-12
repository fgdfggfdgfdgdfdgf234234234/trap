const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Доданий GET-маршрут для кореня
app.get('/', (req, res) => {
  res.send('Сервер працює! Перевір /log-ip через POST-запит.');
});

// POST-маршрут для логування IP
app.post('/log-ip', (req, res) => {
  const ip = req.body.ip || 'Unknown IP';
  const logEntry = `${new Date().toISOString()} - IP: ${ip}\n`;
  fs.appendFile('ip_logs.txt', logEntry, (err) => {
    if (err) {
      console.error('Помилка запису:', err);
      return res.status(500).send('Помилка сервера');
    }
    res.send('IP записано!');
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});