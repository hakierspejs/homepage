#!/usr/bin/env python3

import meetupscraper
import textwrap
import sys
import json
import logging

if __name__ == '__main__':
    logging.basicConfig(level='DEBUG')
    next_events = meetupscraper.get_upcoming_events('Hakierspejs-Łódź')
    next_events = list(sorted(next_events, key=lambda x: x.date))

    if not next_events:
        sys.exit()

    next_event = next_events[0]
    next_date = next_event.date.strftime("%d-%m-%Y %H:%M")

    json_data = {
        'date': next_event.date.strftime("%d-%m-%Y %H:%M"),
        'url': next_event.url,
    }

    json_data['location'] = ''
    if next_event.venue.name != 'Online event':
        json_data['location'] = next_event.venue.name

    with open('./_data/meetings.json', 'w') as f:
        f.write(json.dumps(json_data))
