$: << File.join(File.dirname(__FILE__), "lib")

require 'sinatra'
require 'linked'


OPENCORPORATES_REST_ENDPOINT = "https://api.opencorporates.com/v0.4/companies"


get "/" do
  send_file File.join(settings.public_folder, "index.html")
end

get "/match/:q" do |q|
  Local.new.match(q)
end

get "/dbpedia" do
  DbPedia.new.abstract(params['q'])
end
