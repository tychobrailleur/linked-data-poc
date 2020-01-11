(defproject linked-data-poc "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "GPLv3"
            :url ""}
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/data.json "0.2.7"]
                 [ring/ring-core "1.8.0"]
                 [ring/ring-jetty-adapter "1.8.0"]
                 [compojure "1.6.1"]
                 [clj-http "3.10.0"]
                 [ring/ring-codec "1.1.2"]]
  :repl-options {:init-ns linked-data-poc.core}
  :plugins [[lein-ring "0.12.5"]]
  :ring {:handler linked-data-poc.core/app
         :main linked-data-poc}
  :main link-data-poc.core
  :profiles {:uberjar {:aot :all :main linked-data-poc.core}})
