    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://at.hs-ldz.pl/api/v1/users?online=true', true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState != 4) {
            return 
        };
        if(xmlhttp.status != 200) {
            return;
        }
        var obj = JSON.parse(xmlhttp.responseText);
        if (obj.length == 0) {
            return;
        }
        document.getElementById('isitopen').style.display = "";
    };
    xmlhttp.send(null);
