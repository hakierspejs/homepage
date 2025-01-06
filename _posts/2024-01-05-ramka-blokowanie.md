---
title: "Ramka do blokowania wydrukowana w 3D"
tags: DIY
layout: post
image: https://hssi.hs-ldz.pl/640x480/http://server/blokowanie-ramka/drukarka.jpg
---

Przez jakiś czas szydełkowałem małe kwadraty, które potem zamierzam połączyć w sweter lub pelerynę. Używałem różnych rodzajów włóczki oraz różnych wzorów kwadratów. Dodatkowo większość kwadratów była dosyć skurczona po ukończeniu. W takich sytuacjach stosuje się blokowanie, czyli moczy się gotowy kwadrat w wodzie, przypina się tak, żeby był odpowiednio rozciągnięty, oraz pozostawia do wyschnięcia. Chciałem, żeby każdy kwadrat miał taką samą wielkość, przez co chciałem zrobić ramkę do blokowania takich kwadratów, zamiast przypinać je np. szpilkami do gumowej maty.

![](https://hssn.hs-ldz.pl/blokowanie-ramka/blokowanie.jpg)

Szukałem w jakim programie mogę zaprojektować ramkę i moją uwagę przyciągnął OpenSCAD. Jest to program typu CAD, w którym model projektuje się za pomocą kodu.

### Projekt 1

Screen z openscada
![](https://hssn.hs-ldz.pl/blokowanie-ramka/ramka_v1.png)

Za pierwszym razem wydrukowałem ramkę z ABSu, ponieważ chciałem żeby była mocniejsza. 

![](https://hssn.hs-ldz.pl/blokowanie-ramka/ramka_v1_foto.jpg)

Niestety bardzo szybko jeden z bolców na rogu ramki urwał się. Dodatkowo ilość bolców była zbyt mała, przez co kwadrat nie był wystarczająco równy.

### Projekt 2

![](https://hssn.hs-ldz.pl/blokowanie-ramka/ramka_v2.png)

Dodałem jeszcze po 2 bolce na każdy bok w celu lepszego wyrównania kwadratów oraz lepszego rozłożenia sił. Dodatkowo bolce są grubsze oraz o kształcie ściętego stożka. 

![](https://hssn.hs-ldz.pl/blokowanie-ramka/ramka_v2_foto.jpg)

Teraz kwadraty wychodzą tak równe, jak tego chciałem. NIestety ramka przegrała z najbardziej skurczonymi kwadratami i bolce dalej się urywają.

### Projekt 3, końcowy

![](https://hssn.hs-ldz.pl/blokowanie-ramka/ramka_v3.png)

Poblemem przez który bolce się łamały było to, że w tej samej płaszczyźnie, przez którą przebiegają warstwy, modele są najbardziej łamliwe. Rozwiązaniem było wydrukowanie 
bolców oddzielnie, tak, by łączenia przebiegały wzdłuż bolców.

![](https://hssn.hs-ldz.pl/blokowanie-ramka/ramka_v3_foto.jpg)

Musiałem w tym celu trochę zmodyfikować model, ponieważ teraz powinny się w nim znajdować otwory, w które potem włoży się bolce. Ustawiłem w OpenSCADzie, żeby otwory miały średnicę o 0,25 mm większą niż bolce (była to rada jednego z hakierów).

Tym razem użyłem filamentu PLA, ponieważ tylko taki był założony w działających wtedy drukarach. Ostatecznie model wyszedł wystarczająco mocny, nawet z tym rodzajem filamentu. Po wydrukowaniu okazało się, że bolce są za duże na otwory. Jednak spróbowałem wbić je młotkiem, co udało się i w zasadzie wyszło lepiej niż myślałem. Pierwszy raz użyłem młotka przy druku 3D (oczywiście po zdjęciu modelu z drukarki) i zdziwiłem się, że wszystkie części wytrzymały uderzenia.

W końcu udało się zaprojektować taką ramkę, jaką chciałem i która rzeczywiście działa. Poniżej jest kod źródłowy modelu, możecie go użyć i modyfikować (by zmienić rozmiar wystarczy ustawić wartość zmiennych).

```
size = 100;
frame_width = 10;
model_height = 10;
bolts_diameter = 3;

//bolt bases
for(x = [-size : size : size]) {
    for(y = [-size : size : size]) {
        difference() {
            translate([x, y, 0]) cylinder(h=model_height + 4, d=frame_width + 10);
            translate([x, y, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);
            
            //translate([x, y, -10]) cylinder(h = 50, r1=bolts_diameter, r2=bolts_diameter);
        }
    }
}

for(x = [-size: 2 * size : size]) {
    for(y = [-size/2 : size : size/2]) {
       difference() {
        translate([x, y, 0]) cylinder(h=model_height + 4, d=frame_width + 10
        );
        translate([x, y, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);
       }
    }
}

for(x = [-size/2 : size : size/2]) {
    for(y = [-size: 2 * size : size]) {
        difference() {
            translate([x, y, 0]) cylinder(h=model_height + 4, d=frame_width + 10);
            translate([x, y, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);
        }
    }
}

//frame
difference() {
    rotate([0, 0, 45]) translate([-size * sqrt(2), -(frame_width/2), 0]) cube([2 * size * sqrt(2), frame_width, model_height]);
    for(x = [-size : size : size]) {
    for(y = [-size : size : size]) {
            translate([x, y, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);

    }
    }
}

difference() {
    rotate([0, 0, -45]) translate([-size * sqrt(2), -(frame_width/2), 0]) cube([2 * size * sqrt(2), frame_width, model_height]);
    for(x = [-size : size : size]) {
    for(y = [-size : size : size]) {
            translate([x, y, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);

    }
    }
}

difference() {
    translate([-size, -size-(frame_width/2), 0]) cube([2 * size, frame_width, model_height]);
    for(x = [-size : size / 2 : size])
    {
        translate([x, -size, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);
    }
}

difference() {
    translate([-size, size-(frame_width/2), 0]) cube([2 * size, frame_width, model_height]);
    for(x = [-size : size / 2 : size])
    {
        translate([x, size, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);
    }
}

difference() {
    translate([size - (frame_width/2), -size, 0]) cube([frame_width, 2 * size, model_height]);
    for(y = [-size : size / 2 : size])
    {
        translate([size, y, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);
    }
}

difference() {
    translate([-size - (frame_width/2), -size, 0]) cube([frame_width, 2 * size, model_height]);
    for(y = [-size : size / 2 : size])
    {
        translate([-size, y, -1]) cylinder(h=model_height + 8, d=bolts_diameter * 2 * 1.05);
    }
}


//bolts

for (y = [0 : 40 : 40]) {
for(x = [0 : bolts_diameter + 10 : 8 * (bolts_diameter + 10)]) {
    translate([x, y + 150, bolts_diameter]) rotate([90, 0, 0]) cylinder(h = 30, r1=bolts_diameter, r2=bolts_diameter);
}
}

```

Autor: @kotlovecrafta
