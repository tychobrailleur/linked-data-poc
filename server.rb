:$ << File.join(File.dirname(__FILE__), "lib")

require 'sinatra'
require 'httparty'
require 'uri'
require 'linked'

DNB_SPARQL_ENDPOINT = "http://localhost:3030/companies/query"
DBPEDIA_SPARQL_ENDPOINT = "http://dbpedia.org/sparql/"
OPENCORPORATES_REST_ENDPOINT = "http://api.opencorporates.com/companies"


get "/" do
  send_file File.join(settings.public_folder, "index.html")
end

get "/match/:q" do
  query = <<SPARQL
PREFIX corp: <http://schema.org/Corporation>
SELECT * WHERE { FILTER regex(?o, "#{params[:q]}", "i") .  ?s ?p ?o  }
SPARQL
  response = HTTParty.get(DNB_SPARQL_ENDPOINT + "?query=#{URI.escape(query)}&output=json")
  response.body
end
