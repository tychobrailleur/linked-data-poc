#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"


lein uberjar
docker build -t linked-data .

cd ${DIR}/fuseki
docker build -t jena-fuseki .
