require 'rest_client'

class DbPedia
  DBPEDIA_SPARQL_ENDPOINT = "http://dbpedia.org/sparql/"
  RestClient.proxy = "http://bcproxy.us.dnb.com:8080"

  def abstract(subject)
    puts " ### #{subject}"
    query = <<SPARQL
SELECT * WHERE { <#{subject}> <http://dbpedia.org/ontology/abstract> ?abstract . 
  FILTER(langMatches(lang(?abstract), "EN")) }
SPARQL
    response = RestClient.get(DBPEDIA_SPARQL_ENDPOINT + "?query=#{URI.escape(query)}&output=json")
    response.to_str
  end
end
