#!/bin/bash

FILE=$1
COLLECTION=$2
echo "Importing: " + $FILE
mongoimport --verbose --host localhost:27017 --db reactnativefullstack --collection $COLLECTION --file $FILE --jsonArray