var arrMessageKey = new Array (

    new Array('webklncno.bos.olamaz',
              'Lütfen kullanıcı kodunuzu ve parolanızı giriniz.',
              'Please enter USER ID and PIN.'),

    new Array('e.webklncno.gecersiz',
              'Hatalı giriş yaptınız. Lütfen geçerli bir kullanıcı kodu giriniz.',
              'Please enter valid USER ID '),

    new Array('tckn.bos.olamaz',
              'Lütfen TCKN’nizi ve parolanızı giriniz.',
              'Please enter TCKN ID and PIN.'),

    new Array('e.tckn.gecersiz',
              'Hatalı giriş yaptınız. TCKN\'nizi ve parolanızı kontrol ederek tekrar deneyiniz.',
              'Wrong PIN or TR ID. Please try again.'),

    new Array('webklncno.sayisal.olmali',
              'Kullanıcı kodunuz sayısal olmalıdır.',
              'User ID must be numeric.'),

    new Array('parola.bos.olamaz',
              'Lütfen parolanızı giriniz.',
              'Please enter PIN'),

    new Array('sifre.bos.olamaz',
              'Lütfen şifrenizi ilgili alana giriniz. Şifrenizi hatırlamıyor veya unuttuysanız \n444 0 666  numaralı telefondan TEB Telefon Şubesini arayabilirsiniz.',
              'Password must be declared.'),

    new Array('c.sil',
              'Sil',
              'Del'),

    new Array('c.yardim',
              'Yardım',
              'Help'),

    new Array('c.sabitle',
              'Sabitle',
              'FIX'),

    new Array('c.karistir',
              'Karıştır',
              'MIX'),

    new Array('c.kucuk.harf',
              'Küçük Harf',
              'Lower Case'),

    new Array('c.buyuk.harf',
              'Büyük Harf',
              'Upper Case'),

    new Array('c.sk.bekleyerek.giris',
              'Harf/Rakam Üzerinde Bekleyerek Giriş',
              'Entry by Waiting on Letters/Numbers'),
              
    new Array('c.sk.bekleyerek.giris.num',
              'Rakam Üzerinde Bekleyerek Giriş',
              'Entry by Waiting on Numbers'),          

    new Array('c.sk.uyari',
              'Şifre ve Parola´da büyük-küçük harf ayrımı yoktur.',
              'Your password and PIN are not sensitive to capital and small letters.'),

    new Array('c.max.parola.uyari',
              'Parolanız, 6 haneli olmalı ve sadece rakamlardan oluşmalıdır.',
              'Your password must have 6 digits and must contain only numbers.'),

    new Array('c.sk.bekleyerek.giris.yapabilirsin',
              'Şifre girişinizi Harf/Rakam üzerinde bekleyerek yapabilirsiniz.',
              '[*]Şifre girişinizi Harf/Rakam üzerinde bekleyerek yapabilirsiniz.'), // FIXME İngilizce
              
    new Array('c.sk.bek.giris.yap.num',
              'Şifre girişinizi Rakam üzerinde bekleyerek yapabilirsiniz.',
              '[*]Şifre girişinizi Rakam üzerinde bekleyerek yapabilirsiniz.'), // FIXME İngilizce          

    new Array('c.gecerli.tarih.hata',
              'Lütfen geçerli bir tarih giriniz.\n\nTarih formatı Gün/Ay/Yıl şeklinde olmalıdır.',
              'Date should be in DD/MM/YYYY format.'),

    new Array('c.basvuru.otp.sifre.hatali',
              'Tek kullanımlık işlem şifrenizi 3 dakikalık süre içinde girmediniz. Yardım için 444 0 666 numaralı telefonları TEB Telefon şubesini arayabilirsiniz.',
              'You should type your one-time password in 3 minutes time. In order to get assistance please call 444 0 666 TEB Telephone Branch.'),

    new Array('caption.option.sec',
              'Seçiniz',
              'Select'),

    new Array('list.gun1',
              'Pazartesi',
              'Monday'),

    new Array('list.gun2',
              'Salı',
              'Tuesday'),

    new Array('list.gun3',
              'Çarşamba',
              'Wednesday'),

    new Array('list.gun4',
              'Perşembe',
              'Thursday'),

    new Array('list.gun5',
              'Cuma',
              'Friday'),

    new Array('caption.peryod.ayinsonisgunu',
              'Ayın Son İşgünü',
              'Last Working Day of Month'),

    new Array('kartno.gecersiz',
              'Hatalı giriş yaptınız. Lütfen geçerli bir kart numarası giriniz.',
              '[*]Hatalı giriş yaptınız. Lütfen geçerli bir kart numarası giriniz.'),

    new Array('kartno.sifre.bos.olamaz',
              'Lütfen kart numaranızı ve şifrenizi giriniz.',
              '[*]Lütfen kart numaranızı ve şifrenizi giriniz.'),

    new Array('c.basvuru.giris.guvenlik.kod.uyari',
              'Güvenlik kodu dolu olmalıdır.',
              'Security Code should be completed.'),

    new Array('h.ilce.sec',
              'Lütfen ilçe seçiniz',
              'Select county'),

    new Array('c.tum.sonuclari.goster',
              'Tüm Sonuçları Göster',
              '[*]Tüm Sonuçları Göster'),

    new Array('c.ilce.list',
              'İlçe Listesi',
              'County List'),

    new Array('c.mesajiniz',
              'MESAJINIZ',
              'YOUR MESSAGE'),

    new Array('button.vazgec',
              'VAZGEÇ',
              'CANCEL'),

    new Array('button.tamam',
              'TAMAM',
              'OK'),

    new Array('caption.uyari',
              'Uyarı',
              'Warning'),

    new Array('c.detayli.arama',
              'Detaylı Arama',
              'Detailed Search'),

    new Array('errors.general',
              'İşleme uygun kayıt bulunamadı.',
              'Unable to find suitable record to process.'),

    new Array('p.isleminiz.devam.etmektedir',
              'İşleminiz devam etmektedir. Lütfen bekleyiniz.',
              'Your transaction is on process. Please wait.'),

    new Array('c.bilgi',
              'Bilgi',
              'Info'),

    new Array('c.hesap.seciniz',
              'Seçiniz',
              'Select'),

    new Array('button.evet',
        'EVET',
        'YES'),

    new Array('button.hayir',
        'HAYIR',
        'NO'),

    new Array('e.ayni.pkodlu.hesap.yok',
              'Hesaplar arası transfer yapabileceğiniz aynı döviz cinsli hesabınız bulunmamaktadır.',
              'You don not have accounts of the same exchange type that you can make money transfer between.'),
    new Array('e.edevlet.giris.kapali',
              'e-Devlet kapısına CEPTETEB Mobil Uygulaması içerisinden ya da İnternet Şube`den giriş özelliğini açmak için 0850 222 0 929 destek merkezini aramanız gerekmektedir.',
              'In order to open e-Government access feature, you will need to call 0850 222 0 929 Support Center.'
    )
);

function getMessageKey(pLocale, pKey)
{
    for(var i=0; i<arrMessageKey.length; i++)
    {
        if( arrMessageKey[i][0] == pKey)
        {
            if( pLocale == "en")
            {
                return arrMessageKey[i][2];
            }
            else
            {
                return arrMessageKey[i][1];
            }
        }
    }

    return "[*]" + pKey;
}