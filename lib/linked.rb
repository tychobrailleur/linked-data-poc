require 'httparty'
require 'uri'
require 'rest_client'
require 'json'

class DbPedia
  DBPEDIA_SPARQL_ENDPOINT = "http://dbpedia.org/sparql/"

  def abstract(subject)
    puts " ### #{subject}"
    query = <<SPARQL
SELECT ?abstract ?logo WHERE { <#{subject}> <http://dbpedia.org/ontology/abstract> ?abstract . 
  OPTIONAL { <#{subject}> <http://xmlns.com/foaf/0.1/depiction> ?logo . }
  FILTER(langMatches(lang(?abstract), "EN")) }
SPARQL
    response = RestClient.get(DBPEDIA_SPARQL_ENDPOINT + "?query=#{URI.escape(query)}&output=json")
    response.to_str
  end
end

class Local
  LOCAL_SPARQL_ENDPOINT = "http://localhost:3030/companies/query"

  def match(company)
    query = <<SPARQL
PREFIX corp: <http://schema.org/Corporation>
SELECT DISTINCT ?p ?prop ?t ?sub WHERE {{  
  ?c corp:name ?o .
  FILTER regex(?o, "#{company}", "i") .
  ?c ?p ?prop .
  OPTIONAL { ?prop ?t ?sub . } }
}
SPARQL
    response = HTTParty.get(LOCAL_SPARQL_ENDPOINT + "?query=#{URI.escape(query)}&output=json")
    json_response = JSON.parse(response.body)
    convert(json_response)
  end

  private
  def convert(data)
    data_hash = Hash.new{ |h,k| h[k] = [] }
    bindings = data['results']['bindings']
    bindings.each do |b|
      # This mess is caused by the awkward SPARQL query.
      if b["t"] != nil
        data_hash[b["t"]["value"]] << b["sub"]["value"]        
      else
        data_hash[b["p"]["value"]] << b["prop"]["value"]
      end
    end
    
    data_hash.reduce!
    data_hash.to_json
  end
end


class Hash
  def reduce!
    self.each do |k,v|
      if v.size == 1
        self[k] = v.first
      end
    end
  end
end
