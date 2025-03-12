const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://vaniafotkiloh.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Сервер працює! Перевір /log-ip через POST-запит.');
});

app.post('/log-ip', (req, res) => {
  console.log('Отримано запит на /log-ip:', req.body); // Логування вхідного запиту
  const ip = req.body.ip || 'Unknown IP';
  const logEntry = `${new Date().toISOString()} - IP: ${ip}\n`;
  fs.appendFile('ip_logs.txt', logEntry, (err) => {
    if (err) {
      console.error('Помилка запису:', err); // Логування помилки
      return res.status(500).send('Помилка сервера');
    }
    console.log('IP записано:', logEntry); // Логування успішного запису
    res.send('IP записано!');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});