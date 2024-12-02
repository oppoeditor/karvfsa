
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}


//------------------------------------------------------------------------------
// CALENDAR
//------------------------------------------------------------------------------
function findX(id) {

	var obj = document.getElementById(id);
	var curleft = curtop = 0;

	if (obj.offsetParent) {
		  curleft = obj.offsetLeft
		  curtop = obj.offsetTop

		  while (obj == obj.offsetParent)
		  {
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
		  }
	}

	return curleft;
}

function findY(id) {

	var obj = document.getElementById(id);
	var curleft = curtop = 0;

	if (obj.offsetParent) {
		  curleft = obj.offsetLeft
		  curtop = obj.offsetTop

		  while (obj == obj.offsetParent)
		  {
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
		  }
	}
	return curtop;
}

function showCalendar(obj,opt) {

		opt = opt || "";

        var x;
        var y;
		if (document.all)
        {
			x = window.screenLeft;
			y = window.screenTop;
		}
		else
        {
			x = window.screenX;
			y = window.screenY;
		}

		var scrOfY = 0;
        if(document.getElementById("content"))
        {
		if (document.getElementById("content").scrollTop != null)
			scrOfY = document.getElementById("content").scrollTop;
        }

		var popx = findX(obj.id) + x + 100;
		var popy = findY(obj.id) + y - scrOfY + 20;
		var major = parseInt(navigator.appVersion);

		var agt = navigator.userAgent.toLowerCase();
		var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
		var ie6 = (ie && (major == 4) && (agt.indexOf("msie 6.")!=-1));


		// IE 6'da ortalama islemi -- ic ice divler olunca pozisyonlama desteklemiyor..
		if(ie6) {
			popx = screen.width/2 - 105;
			popy = screen.height/2 - 95;
			calendarPopup = window.open("Calendar.do?id=" + obj.id + "&iframe=E","tebCalendar","location=0,status=0,scrollbars=0,width=210,height=190,top="+popy+",left="+popx+",screenX="+popx+",screenY="+popy);
		}
		// Diger browser'larda pozisyonlama
		else {
			calendarPopup = window.open("Calendar.do?id=" + obj.id + "&iframe=E","tebCalendar","location=0,status=0,scrollbars=0,width=210,height=190,top="+popy+",left="+popx+",screenX="+popx+",screenY="+popy);
        }
}

function hideCalendar() {

	if (calendarPopup != null) {

		parent.calendarPopup.close();
		calendarPopup = null;
	}
}

function checkSlashes(obj) {

	var str = obj.value;
	var flagChange = false;

	if ((str.length == 3) && (str.substr(2,3) != "/")) {
		str = str.substr(0,2) + "/" + str.substr(2,3);
		flagChange = true;
	}

	if ((str.length == 6) && (str.substr(5,6) != "/")) {
		str = str.substr(0,5) + "/" + str.substr(5,6);
		flagChange = true;
	}

	if (flagChange)
		obj.value = str;
}

function validateDateFromTextField(obj,lang, pGun, pAy, pYil) {

	var str = obj.value;

	var gun = str.substring(0,2).trim();
	var ay  = str.substring(3,5).trim();
	var yil = str.substring(6,10).trim();


	if ( (gun < 1) || (gun > 30) || (ay < 1) || (ay > 12) || (yil < 1900) || ((gun >28) && (ay == 2)) || (str.length != 10)
            || isNaN(gun) || isNaN(ay) || isNaN(yil) || !IsNumeric(gun) || !IsNumeric(ay) || !IsNumeric(yil))
        {
            if (obj.value != "")
            {
              if (!ValidDate(yil,ay-1,gun))
               {
                 obj.value = "";
                 alert( getMessageKey(lang, 'c.gecerli.tarih.hata') );
                 obj.focus();
                 return ;
              }
            }
	}

        if ((gun == null || gun == "") && (ay == null || ay == "") && (yil == null || yil == ""))
        {
            gun = 0;
            ay = 0;
            yil = 0;
        }

        // Aynı ad ile birden fazla tarih varsa o zaman dizi oluyor.
        var items = document.getElementsByName(obj.name);
        for(tInx=0; tInx < items.length ; tInx++)
        {
            if(items[tInx] == obj)
            {
                document.getElementsByName(pGun)[tInx].value=gun;
                document.getElementsByName(pAy)[tInx].value=ay;
                document.getElementsByName(pYil)[tInx].value=yil;
            }
        }
}

function checkDateFromTextField(pObjId)
{
    var str = document.getElementById(pObjId).value;
    if (str.length < 10)
    {
        return false;
    }
    return true;
}

var globalTarihArr = new Array();
var tarihIdx = 0;
function addToGlobalTarihArr (pTarihId)
{
    globalTarihArr [tarihIdx] = pTarihId;
    tarihIdx++;
}


var logoutKontrol = "logout";
function logOffbyTopFrame(){
    if(logoutKontrol != "topmenuTriggered")
    {
        document.location = "Logout.do?localeInfo=" + language;
        TEB.Service.sync_call("LoginService.doLogout");
        //window.close();
    }
}

function logoff()
{
    window.parent.logoutKontrol = "topmenuTriggered";
    try {
        window.parent.location = "Logout.do";
    } catch(e) {
        window.location = "Logout.do";
    }
}

function switchLayout(oDomObj)
{
    var menuNo = null;
    if(oDomObj != null) {
        menuNo = $(oDomObj).data("menuno");
    }

    var adres = "SwitchLayout.do";
    if(menuNo != null) {
        adres =  adres + "?menuno=" + menuNo;
    }

    console.log("adres=" + adres)

    window.parent.logoutKontrol = "topmenuTriggered";
    window.top.location = adres;
}

function IsNumeric(sText)
{
   var ValidChars = "0123456789,";
   var IsNumber=true;
   var Char;

   for (i = 0; i < sText.length && IsNumber == true; i++)
      {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == -1)
         {
         IsNumber = false;
         }
      }
   return IsNumber;
}



function createCookie(name,value,days) {
    var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}

	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


//------------------------------------------------------------------------------
//ZEBRA
//------------------------------------------------------------------------------
function zebra(div) {
    var tables = $(div).find('table');
    for ( var i = 0; i < tables.length; i++) {
        var table = tables[i];
        zebraTable(table);
    }
}

function zebra() {

    var tables = $(document).find('table');
    for ( var i = 0; i < tables.length; i++) {
        var table = tables[i];
        zebraTable(table);
    }
}

function zebraTable(table) {
	var preZebraFields = [ "l", "r" ];
	var postZebraFields = [ "solbaslik", "input" ];

	if ($(table).is(':visible') && table.className === "zebra") {
		var tbodys = $(table).find('tbody');

		var trs = null;
		if (tbodys != null && tbodys.length > 0) {
			trs = $(tbodys[0]).find('tr');
		} else {
			trs = $(table).find('tr');
		}

		var counter = 0;
		var applicableRow = false;
		for (var j = 0; j < trs.length; j++) {
			var tr = trs[j];
			applicableRow = false;

			if ($(tr).is(':visible')) {
				var tds = $(tr).find('td');
				for (var k = 0; k < tds.length; k++) {
					applicableRow = true;
					var clsName = tds[k].className;
                    var lastCharofClass = clsName.substr(clsName.length-1);
                    if(lastCharofClass == "0" || lastCharofClass== "1"){ // Daha once zebra yapılmıs
                        clsName = clsName.substr(0, clsName.length-1);
                    }


					var found = false;

					for (var i = 0; i < preZebraFields.length; i++) {
						var zebraField = preZebraFields[i];

						if (clsName.substring(0, zebraField.length) === zebraField) {
							tds[k].className = tds[k].className.replace(zebraField, counter % 2 + zebraField);
							found = true;
							break;
						}
					}

					if (!found) {
						for (var i = 0; i < postZebraFields.length; i++) {
							var zebraField = postZebraFields[i];

							if (clsName.substring(0, zebraField.length) === zebraField) {
								tds[k].className = zebraField + counter % 2;
								found = true;
								break;
							}
						}
					}
				}

				if (applicableRow) {
					counter++;
				}
			}
		}

	}
}

function zebraRobin() {
    var tables = $(document).find('table');
    for ( var i = 0; i < tables.length; i++) {
        var table = tables[i];
        zebraTableRobin(table);
    }
}

function zebraTableRobin(table)
{
	var zebraFields = [ "form-row2", "form-row2 even" ];
    var tableCassName = table.className;

	if ($(table).is(':visible') && tableCassName.indexOf("zebra")) {
		var tbodys = $(table).find('tbody');

		var trs = null;
		if (tbodys != null && tbodys.length > 0) {
			trs = $(tbodys[0]).find('tr');
		} else {
			trs = $(table).find('tr');
		}

		var counter = 0;

		for (var j = 0; j < trs.length; j++) {
			var tr = trs[j];

            if ($(tr).is(':visible')) {
                if(counter % 2 == 0)
                {
					tr.className = tr.className.replace(zebraFields[1], zebraFields[0]);
				}
                else {
					if (tr.className.indexOf(zebraFields[1]) == -1) {
						tr.className = tr.className.replace(zebraFields[0], zebraFields[1]);
					}
				}
                counter++;
            }
		}
	}
}

function focus(field) {
    if(field != null){
        if (checkOldIE) {
            setTimeout(function() {
                $(field).focus();
            }, 10);
        } else {
            $(field).focus();
        }
    }
}

function checkOldIE()
{
    var ieVersion = getInternetExplorerVersion();
    if(ieVersion  == 7.0 || ieVersion  == 8.0)
    {
        return true;
    }

    return false;
}

function getInternetExplorerVersion()
{
 var rv = -1; // Return value assumes failure.
 if (navigator.appName == 'Microsoft Internet Explorer')
 {
     var ua = navigator.userAgent;
     var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
 if (re.exec(ua) != null)
     rv = parseFloat( RegExp.$1 );
 }
 return rv;
}

function focus(field) {
    if (checkOldIE) {
        setTimeout(function() {
            $(field).focus();
        }, 10);
    } else {
        $(field).focus();
    }
}

function getSelectedValue(item) {
    if(item == null){
    	return null;
    }

    if(item.length > 0){
    	var isRadio = false;
    	var isCheckBox = false;
    	var isOther = false;

        for (var i = 0; i < item.length; i++) {
            if (item[i].type=='radio') {
            	if(item[i].checked){
                    return item[i].value;
            	}

            	isRadio = true;
            }
            if (item[i].type=='checkbox') {
            	if(item[i].checked){
                    return item[i].value;
            	}

            	isCheckBox = true;
            }
            else {
            	if(item[i].selected){
                    return item[i].value;
            	}

            	isOther = true;
            }
        }

        if (isRadio) {
    		return 'H';
        }

        if (isCheckBox) {
    		return 'H';
        }

        if (isOther) {
    		return null;
        }
    }
    else if(item.type=='radio'  || item.type=='checkbox') {
        if (item.type=='radio') {
        	if(item.checked){
                return item.value;
        	}
        	else{
        		return 'H';
        	}
        }

        if (item.type=='checkbox') {
        	if(item.checked){
                return item.value;
        	}
        	else{
        		return 'H';
        	}
        }
    }
    else{
    	return item.value;
    }

    return null;
}

function setSelectedValue(item, value) {
    if(item == null){
    	;
    }

    if(item.length > 0){
        for (var i = 0; i < item.length; i++) {
            if (item[i].value == value) {
            	if(item[i].type=='radio'){
                	item[i].checked = true;
            	}
            	else if(item[i].type=='checkbox'){
                	item[i].checked = true;
            	}
            	else{
                	item[i].selected = true;
                	$(item[i]).attr("selected", "selected");
            	}
            }
        }
    }
    else if(item.value == value){
    	item.checked = true;
    }
}

function isChecked(obj) {
	return $(obj).prop('checked');
}

function disable(obj){
	$(obj).prop('disabled', true);
}

function enable(obj){
	$(obj).prop('disabled', false);
}

function getToken(inputLine, seperator, index){
	if(inputLine == null || inputLine.length == 0){
		return null;
	}

	var tokenArray = inputLine.split(seperator);
	if(tokenArray == null || tokenArray.length == 0){
		return null;
	}

	if(index == null || index >= tokenArray.length){
		return tokenArray;
	}

	return tokenArray[index];
}

function addToken(inputLine, value, seperator){
	if(seperator == null || seperator.length == 0){
		seperator = '|';
	}

	if(inputLine == null || inputLine.length == 0){
		inputLine = '';
	}

	if(value == null || value.length == 0){
		inputLine += seperator;
	}
	else{
		inputLine += value;
		inputLine += seperator;
	}

	return inputLine;
}

function isEmpty(value){
	if(value == null || value.length == 0){
		return true;
	}

	return false;
}