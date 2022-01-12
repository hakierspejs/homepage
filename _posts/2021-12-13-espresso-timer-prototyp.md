---
title: "Espresso timer. Prototyp."
tags: DIY
layout: post
image: https://hssi.hs-ldz.pl/640x/http://server/espresso-timer/DSCF4485.JPG
---

Mamy w siedzibie niezły ekspres do kawy i najlepsza kawa parzy się około 24 sekund. Niestety nie mamy wagi do kawy z timerem, a sięganie po smartfona za każdym razem nie jest wygodne. Postanowiłem więc zrobić osobne urządzenie. Od dawna chciałem spróbować zrobić coś podobnego bez [PLC](https://pl.wikipedia.org/wiki/Programowalny_sterownik_logiczny).
    
Co do samego stopera — musi być w miarę precyzyjny (24±0.5s), musi się wyłączać po 40-60s, nie powinien pobierać dużo prądu, tym bardziej w trybie stand by (nie chce mi się często wymieniać baterii). Schemat blokowy urządzenia widzę tak:

blok zasilania - generator sygnałów - licznik - wyświetlacz 

## Blok zasilania 

*  dwa przyciski - start i off
*  minimalny prąd w trybie stand by 
*  automatyczne wyłączenie po upływie 40-60s 

Poszedłem w stronę [układu bazującego na tranzystorze MOSFET](https://www.circuitsdiy.com/mosfet-delay-timer-ciruit/), ktory pozwala wypełnić wszystkie wskazane powyżej warunki z minimum elementów:
    
![schemat](https://hssn.hs-ldz.pl/espresso-timer/n-mosfet.png)
    
Tutaj rezystor na 330 Ohm jest tylko po to, żeby ograniczyć prąd, jeśli ktoś nacisnie dwa przyciski jednocześnie. Zamieniając rezystor na 15 kOhm albo kondensator na 220 uF można ustalić potrzebny timeout. 

Później jednak zmieniłem tranzystor na P-MOSFET, bo pozwala on na "sterowanie" dodatnim potencjałem, co przyda się, gdy będę robił PCB: 

![schemat](https://hssn.hs-ldz.pl/espresso-timer/m-mosfet-turn-off-delay-fo.png)
          
      
## Generator sygnalu 1Hz

![img](https://hssi.hs-ldz.pl/640x,q85/http://server/espresso-timer/DSCF4489.JPG)
 
Pierwotnie chciałem skorzystać z [generatora RC na podstawie NE555](https://www.electronics-tutorials.ws/waveforms/555_oscillator.html).
Niestety okazało się, że nie jest on [wystarczająco precyzyjny](https://electronics.stackexchange.com/questions/288737/is-the-555-timer-accurate-and-uniform-enough-for-a-metronome),
dlatego musiałem pójść w stronę [oscylatora kwarcowego](https://en.wikipedia.org/wiki/Crystal_oscillator) i dzielnika częstotliwości (zegarowy kwarc 32.768kHz (2^15) i przerzutniki typu D).
Więcej info o generatorach kwarcowych i D-trigger-ach - [tutaj](https://eduinf.waw.pl/inf/prg/009_kurs_avr/2013_a.php#top).

Skoro dobranie układu scalonego, który ma wbudowany generator i podzielniki do 1Hz [było skomplikowane](https://electronics.stackexchange.com/questions/304418/why-is-a-15-stage-binary-counter-divider-so-cumbersome), wykombinowałem alternatywę na podstawie łatwo dostępnych układów [CD4060](https://www.build-electronic-circuits.com/4000-series-integrated-circuits/ic-4060/) ([datasheet](https://www.ti.com/lit/ds/symlink/cd4060b.pdf)).
Do wygenerowania sygnału 1 Hz należy sygnał 32.768 kHz podzielić 15 razy; problem jest taki, że CD4060 ma tylko 14 podzielniki. W tym wypadku zwykle robi się coś podobnego do schematu z artykułu na [hackersbench.com](https://web.archive.org/web/20210901190437/http://www.hackersbench.com/Projects/1Hz/):

![http://www.hackersbench.com/Projects/1Hz/](https://hssi.hs-ldz.pl/640x,q85/http://www.hackersbench.com/Projects/1Hz/schematic.jpg)

Jednak bardzo mi się nie chciało czekać na zamowienie kolejnego CD4027, więc po prostu podpiąłem dwa układy CD4060.
 

## Licznik + wyświetlacz

![img](https://hssi.hs-ldz.pl/640x,q75/http://server/espresso-timer/DSCF4478.JPG)
    
Miałem parę 7-segmentowych wyświetlaczy, może ze względów energooszczędzania nie są najlepszym wyborem, ale są tanie i prawie każdy sterownik do nich ma wbudowany licznik, co upraszcza schemat. W moim przypadku były to dwa sterowniki CD4026. Podłączenie standardowe, zgodnie z [datasheet-em](https://www.ti.com/lit/ds/symlink/cd4026b.pdf), więcej szczegółów można znaleźć w artykule na [fobot.pl](https://forbot.pl/blog/technika-cyfrowa-sterowanie-wyswietlaczem-7-segmetnowym-id16152).

<video width="640" height="480" controls><source src="https://hssn.hs-ldz.pl/espresso-timer/MOV_0656_nosound.mp4" type="video/mp4">Your browser does not support the video tag.</video>
 
Prototyp działa, wiec w kolejnym poście będziemy robili płytkę drukowaną.


Autor: @Alex

Redaktor: @BluRaf
