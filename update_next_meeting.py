#!/usr/bin/env python3

import meetupscraper
import textwrap

next_events = meetupscraper.get_upcoming_events('Hakierspejs-Łódź')
next_event = list(sorted(next_events, key=lambda x: x.date))[0]
next_date = next_event.date.strftime("%d-%m-%Y %H:%M")
s = textwrap.dedent(f'''
{{% assign next_meeting = "{next_date}" %}}
{{% assign next_meeting_url = "{next_event.url}" %}}

'''.lstrip())

if next_event.venue.name == 'Online event':
    s += textwrap.dedent(f'''{{% comment %}}
      {{% assign next_meeting_location = "" %}}
    {{% endcomment %}}'''.strip())
else:
    s += f'{{% assign next_meeting_location = "{next_event.venue.name}" %}}'
with open('./_includes/next_meeting.txt', 'w') as f:
    f.write(s)
