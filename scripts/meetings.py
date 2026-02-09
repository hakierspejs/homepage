#!/usr/bin/env python3

import meetupscraper
import textwrap
import sys
import json


def save_event(next_event, fpath):
    next_date = next_event.date.strftime("%d-%m-%Y %H:%M")

    json_data = {
        'date': next_event.date.strftime("%d-%m-%Y %H:%M"),
        'url': next_event.url,
    }

    json_data['location'] = ''
    if not next_event.venue:
        json_data['location'] = 'Hakierspejs Łódź' # Default location
    if next_event.venue and next_event.venue.name != 'Online event':
        json_data['location'] = next_event.venue.name

    json_data['title'] = ''
    if not next_event.title:
        json_data['title'] = 'Nie znaleziono tytułu'
    else:
        json_data['title'] = next_event.title

    with open(fpath, 'w') as f:
        f.write(json.dumps(json_data))

if __name__ == '__main__':
    next_events = meetupscraper.get_upcoming_events('Hakierspejs-Łódź')
    next_events = list(sorted(next_events, key=lambda x: x.date))

    if not next_events:
        sys.exit()

    next_event = next_events[0]
    save_event(next_event, './_data/meetings.json')
    save_event(next_event, './_data/live_meetings.json')
