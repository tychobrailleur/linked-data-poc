### SPARQL Server

- Jena Fuseki, populated with Turtle file (`companies.ttl`)
- Start: 

     fuseki-server.bat --update --loc=ds /companies

- Go to console: http://localhost:3030/sparql.tpl
- In the _File Upload_ section, upload Turtle file.

### Application Server

- Implemented with [Sinatra](http://www.sinatrarb.com/) and [HTTParty](https://github.com/jnunemaker/httparty)
- Start:

     ruby server.rb


### SPARQL

- http://www.cambridgesemantics.com/semantic-university/sparql-by-example
- Update value:

    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    INSERT { <http://www.weblogism.com/companies/060902413> owl:sameAs  "http://live.dbpedia.org/page/Google" } WHERE {}

- Delete all graph data:

    CLEAR [ GRAPH <uri> ]


### Outstanding Questions

- How to bring back the content of the address which is a blank node?  Is a blank node the best way to store an address?