(ns linked-data-poc.core
  (:require [compojure.route :as route]
            [compojure.core :refer [defroutes GET]]
            [compojure.handler :as handler]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.util.response :refer [resource-response]]
            [linked-data-poc.company :as company]
            [linked-data-poc.dbpedia :as dbpedia]
            [ring.adapter.jetty :refer [run-jetty]])
  (:gen-class))

(defroutes main-routes
  (GET "/match/:q" [q] {:status 200
                        :headers {"Content-Type" "application/json"}
                        :body (company/match q)})
  (GET "/dbpedia/:q" [q] {:status 200
                          :headers {"Content-Type" "application/json"}
                          :body (dbpedia/get-data q)})
  (GET "/" []
       (resource-response "public/index.html"))
  (route/not-found "Page not found"))

(def app
  (-> (handler/site main-routes)
      (wrap-resource "public")))

(defn -main []
  (run-jetty #'app {:port 3000}))
