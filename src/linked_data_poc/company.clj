(ns linked-data-poc.company
  (:require [clj-http.client :as client]
            [clojure.data.json :as json]))

(def local-sparql-endpoint "http://jena:3030/companies/query")

(defn- entry-value [entry prop]
  (-> entry
      (get prop)
      (get "value")))

(defn- add-value [map key val]
  (if (contains? map key)
    (update-in map [key] #(flatten (conj [%1] %2)) val)
    (assoc map key val)))

(defn- transform-response-acc [res acc]
  (if (empty? res)
    acc
    (let [entry (first res)]
      (if (contains? entry "t")
        (transform-response-acc (rest res) (assoc-in acc [(entry-value entry "p") (entry-value entry "t")] (entry-value entry "sub")))
        (transform-response-acc (rest res) (add-value acc
                                                      (entry-value entry "p")
                                                      (entry-value entry "prop")))))))

(defn transform-response
  "Gets the bindings from the results, and transforms the result into a map."
  [res]
  (-> res
      :body
      json/read-str
      (get "results")
      (get "bindings")
      (transform-response-acc {})
      json/write-str))

(defn match [company]
  (let [query (format "PREFIX corp: <http://schema.org/Corporation>
SELECT DISTINCT ?p ?prop ?t ?sub WHERE {{
  ?c corp:name ?o .
  FILTER regex(?o, \"%s\", \"i\") .
  ?c ?p ?prop .
  OPTIONAL { ?prop ?t ?sub . } }
}" company)
        response (client/get local-sparql-endpoint
                             {:accept :json :query-params {:query query}
                              :basic-auth ["admin" "password"]})]
    (transform-response response)))
