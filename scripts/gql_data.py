from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport
import json

def get_gql_data(event_id):
    transport = AIOHTTPTransport(url="https://www.meetup.com/gql2")
    
    client = Client(transport=transport)
    
    query = gql("""
    query GetEvent($eventId: ID!) {
      event(id: $eventId) {
        id
        title
        dateTime
        description
        group {
          name
          urlname
        }
        venue {
          address
          city
          lat
          lon
          name
        }
      }
    }
    """)
    
    
    result = client.execute(query, variable_values={"eventId": str(event_id)})
    
    return(result)

