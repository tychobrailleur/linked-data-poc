$: << File.join(File.dirname(__FILE__), "lib")

require 'sinatra'
require 'linked'


OPENCORPORATES_REST_ENDPOINT = "http://api.opencorporates.com/companies"


get "/" do
  send_file File.join(settings.public_folder, "index.html")
end

get "/match/:q" do
  Local.new.match(params[:q])
end

get "/dbpedia/:q" do
  DbPedia.new.abstract(params[:q])
end
