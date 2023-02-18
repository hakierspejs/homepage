---
title: "Drugie życie monitora VGA"
tags: DIY
layout: post
image: https://hssi.hs-ldz.pl/640x480/http://server/img/7f1b3a5f-65ed-40f3-9b28-5dd80151c446.png
---


![](https://hssn.hs-ldz.pl/img/7f1b3a5f-65ed-40f3-9b28-5dd80151c446.png)


Ostatnio w spejsie nazbierało się dużo starych, ale sprawnych, monitorów VGA. Problem w tym, że dziś praktycznie żaden komputer nie ma takiego gniazda, dlatego monitory stały i kurzyły się. A że spejs był w remoncie, to kurzyły się BARDZO.

W trakcie remontu często brakowało mi dużego zegara ściennego. Wpadłem na pomysł, żeby zrobić taki zegar samodzielnie i przy okazji znaleźć zastosowanie dla tych monitorów.

Oczywiście mógłbym po prostu kupić jakiś zegar na allegro a zaoszczędzony czas spędzić z przyjaciółmi (problem jest taki, że najpierw musiałbym ogarnąć przyjaciół). Dlatego postanowiłem zrobić to w możliwie skomplikowany sposób. Przyszły mi do głowy takie rozwiązania:

* podpiąć komputer z Gentoo i uruchomić wygaszacz ekranu,
* użyć Raspberry Pi i systemu czasu rzeczywistego (używając konwertera HDMI do VGA),
* użyć mikrokontrolera i ręcznie wygenerować sygnał do monitora (stosując [bit banging](https://en.wikipedia.org/wiki/Bit_banging)). Spędzę co prawda resztę zimy pisząc drivery, ale co mi tam...

Oczywiście jak każdy normalny człowiek, wybrałem najłatwiejszą opcję: grzebanie w libkach, pisząc własne sterowniki.

Postanowiłem przy okazji sprawdzić Micropythona w takim scenariuszu. Jako mikrokontroler wybrałem Raspberry Pi Pico - chociażby dlatego, że wiedziałem, że nie braknie mi wtedy pamięci i mocy obliczeniowej. 

Implementacji standardu VGA w C jest już całkiem sporo, natomiast do Micropythona udało mi się znaleźć tylko jeden projekt na Githubie - w stanie "pre-alpha". Na podstawie tego wielce niezawodnego i dojrzałego projektu  spróbowałem wyświetlić zegar. Niestety Micropythonowy framebuffer nie pozwala na określenie rozmiaru fonta, więc rendering cyfr musiałem napisać od nowa.

Po wgraniu kodu i podłączeniu monitora trafiłem na pierwszy problem: obraz pojawiał się za każdym razem w innym miejscu. Żeby było śmieszniej, był to [heisenbug](https://en.wikipedia.org/wiki/Heisenbug): jak odłączałem Pi Pico od IDE, problem znikał. Ostatecznie tak to zostawiłem jako easter egg.

Drugi problem to kwestia dokładności zegara i ustawiania godziny - na pewno nie chciałbym jej wprowadzać od nowa za każdym razem jak podłączę zasilanie. Widziałem takie rozwiązania:

* podłączyć płytkę do UPSa i absolutnie nigdy przenigdy jej nie wyłączać,
* użyć modułu zegara czasu rzeczywistego DS3234,
* przejść na Pi Pico W i użyć [NTP](https://pl.wikipedia.org/wiki/Network_Time_Protocol),
* odbierać godzinę radiowo, np. z sygnału GPS lub [DCF77](https://pl.wikipedia.org/wiki/DCF77),
* [OCXO](https://en.wikipedia.org/wiki/Crystal_oven)
* [Rubidium standard](https://en.wikipedia.org/wiki/Rubidium_standard)

Wybrałem NTP ze względu na bezobsługowość (czas letni należy oczywiście je[a-z]{2}ć prądem - patrz: ostatni akapit). Przejście na Pi Pico W wiązało się z komplikacjami: część RAMu była zarezerwowana na stos WiFi, który dodatkowo zajmował pierwszy interfejs PIO. Sterownik był napisany pod właśnie ten slot, więc musiałem to zmienić. Żeby zwolnić pamięć, z trybu ośmikolorowego przeszedłem na czarno-czerwony (1-bit). Po tygodniu debuggingu miałem już prototyp własnego sterownika.
 
![](https://hssi.hs-ldz.pl/cx100,cy350,cw1000,ch850,640x/http://server/img/1736459728345.jpeg)


Kiedy konfigurowałem i odpalalęm kanały DMA bezpośrednio Micropythonem, driver niestety działał niestabilnie (wyświetlał losowy obrazek, po czym się zawieszał). W końcu musiałem [skonfigurować DMA bezpośrednio w rejestrach pamięci](https://github.com/hakierspejs/pico-vga-driver/blob/master/vga_driver.py#L133) i odpalić kanały w skompilowanym kodzie (używając generatora kodu [micropython.viper](https://docs.micropython.org/en/latest/reference/speed_python.html#the-viper-code-emitter)). Kod od tego nie stał piękniejszy, ale przynajmniej był stabilny.

Kiedy już miałem [odpowiedni sterownik](https://github.com/hakierspejs/pico-vga-driver), zrobienie samego zegara nie zajęło mi dużo czasu - zwłaszcza, że spejsowy lab elektroniczny bardzo się rozwinął i mamy dużo sprzętu, części i plastikowych obudów. Kwestię timingu rozwiązałem używając dwóch wątków: jeden ogarnia aktualizację czasu po NTP, drugi wyświetla obraz. Kod do wyświetlania cyfr umieściłem w [osobnej libce](https://github.com/hakierspejs/micropython-segclock).

Kod do projektu umieściłem na naszym spejsowym Githubie:

[https://github.com/hakierspejs/faugea-clock](https://github.com/hakierspejs/faugea-clock)

Mam parę pomysłów, co możnaby w przyszłości ulepszyć w tym projekcie. Najbardziej denerwuje mnie brak niezawodnej obsługi stref czasowych, w szczególności czasu letniego. O ile dziś możemy obsłużyć to [ifami](https://github.com/hakierspejs/faugea-clock/blob/master/timezone.py#L19), to nieprzewidywalności polityki Unii Europejskiej sprawia, że mój projekt za parę lat może wskazywać złą godzinę. Niestety nie znam żadnego stabilnego źródła albo protokołu, którym mógłbym dostać tę informację w przyszłości.


Autor: @Alex

Redaktor: @d33tah
