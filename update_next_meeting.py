#!/usr/bin/env python3

import meetupscraper
import textwrap

next_events = meetupscraper.get_upcoming_events('Hakierspejs-Łódź')
next_event = list(sorted(next_events, key=lambda x: x.date))[0]
next_date = next_event.date.strftime("%d-%m-%Y %H:%M")
s = textwrap.dedent(f'''
{{% assign next_meeting = "{next_date}" %}}
{{% assign next_meeting_url = "{next_event.url}" %}}

{{% comment %}}
  {{% assign next_meeting_location = "" %}}
{{% endcomment %}}''').strip()
with open('./_includes/next_meeting.txt', 'w') as f:
    f.write(s)
