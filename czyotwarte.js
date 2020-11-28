var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'https://at.hs-ldz.pl/api/v1/users?online=true', true);
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
            var obj = JSON.parse(xmlhttp.responseText);
            alert(obj.length);
         }
    }
};
xmlhttp.send(null);
