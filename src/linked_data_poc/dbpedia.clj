(ns linked-data-poc.dbpedia
  (:require [clj-http.client :as client]
            [clojure.data.json :as json]))

(def dbpedia-endpoint "http://dbpedia.org/sparql/")

(defn transform-response [res]
  (-> res
      :body
      json/read-str
      (get "results")
      (get "bindings")
      json/write-str))

(defn get-data [subject]
  (let [query (format "SELECT ?abstract ?logo WHERE { <%s> <http://dbpedia.org/ontology/abstract> ?abstract .
  OPTIONAL { <%s> <http://xmlns.com/foaf/0.1/depiction> ?logo . }
  FILTER(langMatches(lang(?abstract), \"EN\")) }" subject subject)
        response (client/get dbpedia-endpoint {:query-params
                                               {:query query
                                                :format "json"
                                                :timeout 30000
                                                :debug "on"} })]
    (transform-response response)))
