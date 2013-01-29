$: << File.join(File.dirname(__FILE__), "lib")

require 'sinatra'
require 'httparty'
require 'uri'
require 'linked'

DNB_SPARQL_ENDPOINT = "http://localhost:3030/companies/query"
OPENCORPORATES_REST_ENDPOINT = "http://api.opencorporates.com/companies"


get "/" do
  send_file File.join(settings.public_folder, "index.html")
end

get "/match/:q" do
  query = <<SPARQL
PREFIX corp: <http://schema.org/Corporation>
SELECT DISTINCT ?p ?prop ?t ?sub WHERE {{  
  ?c corp:name ?o .
  FILTER regex(?o, "#{params[:q]}", "i") .
  ?c ?p ?prop }
UNION {
  ?c corp:name ?o .
  FILTER regex(?o, "#{params[:q]}", "i") .
  ?c ?p ?prop .
  ?prop ?t ?sub 
}}
SPARQL
  response = HTTParty.get(DNB_SPARQL_ENDPOINT + "?query=#{URI.escape(query)}&output=json")
  response.body
end

get "/dbpedia/:q" do
  DbPedia.new.abstract(params[:q])
end
