### SPARQL Server

- Jena Fuseki, populated with Turtle file (`companies.ttl`)
- Start: 

    fuseki-server.bat --update --loc=ds /companies

### Application Server

- Sinatra
- Start:

    ruby server.rb


### SPARQL

- http://www.cambridgesemantics.com/semantic-university/sparql-by-example

### Outstanding Questions

- How to bring back the content of the address which is a blank node?  Is a blank node the best way to store an address?