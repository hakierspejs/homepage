#!/bin/bash
# 
# Downloads 2 articles from HSŁ wiki and converts them to the 
# format understood by jekyll. Requires wget and bash installed. 
#

URL_Apply="https://raw.githubusercontent.com/wiki/hakierspejs/wiki/Jak-si%C4%99-zapisa%C4%87.md"
URL_FAQ="https://raw.githubusercontent.com/wiki/hakierspejs/wiki/FAQ.md"

if [[ -f "./apply.md" || -f "./faq.md" ]]; then
	rm -r "./apply.md"
fi

# apply page
echo -e "---\ntitle: Zapisz się!\nlayout: default\n---\n" >> ./apply.md
echo -e "## Jak się zapisać?\n" >> ./apply.md
wget $URL_Apply -O ->> ./apply.md

# faq page
echo -e "---\ntitle: FAQ\nlayout: default\n---\n" >> ./faq.md
wget $URL_FAQ -O ->> ./faq.md && sed -i "s/##/###/g" ./faq.md
