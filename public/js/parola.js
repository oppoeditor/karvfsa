function formSubmit()
{
    var f = document.forms[0];
    var lang = f.language.value;

    if (f.klnctip.value == 'C')
    {
      if (f.webklncno.value == "") {
          alert( getMessageKey(lang, "kartno.sifre.bos.olamaz") );
          document.getElementById("f1").focus();
          return false;
      }
      if (f.webklncno.value.length != 16 || isNaN(f.webklncno.value)){
          alert( getMessageKey(lang, "kartno.gecersiz") );
          document.getElementById("f1").focus();
          return false;
      }
      if (!checkCreditCardDigit(f.webklncno.value)) {
          alert( getMessageKey(lang, "kartno.gecersiz") );
          document.getElementById("f1").focus();
          return false;
      }
     if(f.parola.value == ""){
          alert( getMessageKey(lang, "kartno.sifre.bos.olamaz") );
          if (f.passedit){
            f.passedit.focus();
          }
          else{
            f.parola.focus();
          }

          return false;
      }

    } else {
        var currentTab = ( $("#loginTabs").tabs('option','active') ==1 ? "tabb":"taba");
        if (f.webklncno.value == "")
        {
            if(currentTab == "tabb")
            {
                alert( getMessageKey(lang, "tckn.bos.olamaz") );
            }
            else
            {
                alert( getMessageKey(lang, "webklncno.bos.olamaz") );
            }

            f.webklncno.focus();
            return false;
        }
        else
        {
            if(currentTab)
            {
                if(currentTab == "tabb" )
                {
                    if( !isTCKN(f.webklncno.value) )
                    {
                        alert( getMessageKey(lang, "e.tckn.gecersiz") );
                        f.webklncno.focus();
                        return false;
                    }
                }
            }
        }

         if (f.parolaTemp.value == "")
         {
            alert( getMessageKey(lang, "parola.bos.olamaz") );

            if (f.passedit) {
                f.passedit.focus();
            } else {
                f.parolaTemp.focus();
            }

            return false;
         }
        if(!isParolaChanged){
            f.parola.value = "";
            f.parolaTemp.value = "";
            alert( getMessageKey(lang, "parola.bos.olamaz") );
            $('#parolaTempId').val("");
            f.parolaTemp.focus();
            return false;
        }
        f.parola.value = f.parolaTemp.value;
        f.parolaTemp.value = "";
    }

    //captcha
      var guvenlikInput = document.getElementsByName("__RESIM_DOGRULAMA")[0];

      if( guvenlikInput != undefined && guvenlikInput.value == "" )
      {
        alert( getMessageKey(lang, "c.basvuru.giris.guvenlik.kod.uyari") );
        guvenlikInput.focus();
        return false;
      }
    //

    if( $("#divhatirla").length > 0 ) { // Hatırla fonksiyonu aktif ise.
        if(isChecked(document.forms[0].hatirla)){
            TEB.Storage.set("UserId", f.webklncno.value);
        } else {
            TEB.Storage.remove("UserId");
        }
    }

    return true;
}

//-----------------------------------------------------------------------------

var bannerListImg = [
{'img':'assets/img/icons/ihtkredibanner.jpg', 'url':'https://www.cepteteb.com.tr/cepteteb-kredi-basvurusu?Firma=TEB&Banner=internetsubesibanner&KuponNo=ihtiyackredisi#Step1'}
];

function setBanner(){
    var bannerList = bannerListImg;
    var bannerId = Math.floor(Math.random() * bannerList.length);
    bannerId = (isNaN(bannerId)) ? 0 : bannerId;

    var icerik = '<a href="' + bannerList[bannerId].url + '" target="_blank" rel="noopener noreferrer"><img src="' + bannerList[bannerId].img + '" border="0" align="absmiddle"></a>';

    $("#login-info-bar1 .banner").html(icerik);
}

//-----------------------------------------------------------------------------

function kartnoBirlestir()
{
    var f = document.forms[0];
    f.webklncno.value = f.f1.value + f.f2.value + f.f3.value + f.f4.value ;
}


function refreshCaptcha()
{
    TEB.Service.call("CaptchaDogrulamaService.captchaImage",
                     null,
                     function(jsonObject){
                        document.getElementById("captcha").src = "data:image/png;base64," + jsonObject.result.imgSrc;
                    });
}

function popUpVSign()
{
    sealWin=window.open("https://trustsealinfo.websecurity.norton.com/splash?dn=esube.teb.com.tr","win",'toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,width=580,height=500');
    self.name = "mainWin";
}

function openBasvuru()
{
    var locale = "tr";

    if(document.forms[0] && document.forms[0].language ) {
        locale = document.forms[0].language.value;
    }

    if( locale == "en" )
    {
        window.open('https://www.teb.com.tr/instant-password/', '_blank', 'rel=noopener noreferrer, scr');
    }
    else
    {
        window.open('https://www.cepteteb.com.tr/sifre-al#Step1', '_blank', 'rel=noopener noreferrer,scrollbars=1,resizable=1');
    }
}

function isTCKN(pTcKimlikNo)
{
    var sTcKimlikNo = String(pTcKimlikNo);

    var toplam = Number(sTcKimlikNo.substring(0,1))
               + Number(sTcKimlikNo.substring(1,2))
               + Number(sTcKimlikNo.substring(2,3))
               + Number(sTcKimlikNo.substring(3,4))
               + Number(sTcKimlikNo.substring(4,5))
               + Number(sTcKimlikNo.substring(5,6))
               + Number(sTcKimlikNo.substring(6,7))
               + Number(sTcKimlikNo.substring(7,8))
               + Number(sTcKimlikNo.substring(8,9))
               + Number(sTcKimlikNo.substring(9,10));

    strtoplam = String(toplam);
    onunbirlerbas = strtoplam.substring(strtoplam.length, strtoplam.length-1);

    if(onunbirlerbas == sTcKimlikNo.substring(10,11))
    {
        return true;
    }

    return false;
}