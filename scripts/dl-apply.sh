#!/bin/bash
# 
# Downloads an article about applying for a membership
# from HSŁ wiki and converts it to the format understood
# by jekyll. Requires wget and bash installed. 
#

URL="https://raw.githubusercontent.com/wiki/hakierspejs/wiki/Jak-si%C4%99-zapisa%C4%87.md"

if [[ -f "../apply.md" ]]; then
	rm -r "../apply.md"
fi

echo -e "---\ntitle: Zapisz się!\nlayout: default\n---\n" >> ../apply.md
echo -e "## Jak się zapisać?\n" >> ../apply.md
wget $URL -O ->> ../apply.md
