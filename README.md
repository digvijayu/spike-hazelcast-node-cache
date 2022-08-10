# hello-world
The hello world example will simply run a local docker instance of the Hazelcast cluster and the node application will communicate with the Hazelcast cache.

## 1. Run Hazelcast cluster
Pull the hazelcast image
```
docker pull hazelcast/hazelcast:5.1.3
```
Run the container in interactive mode
```    
docker run \
    -it \
    --rm \
    -e HZ_CLUSTERNAME=hello-world \
    -p 5701:5701 hazelcast/hazelcast:5.1.3
```


## 2. Run the server locally
```
npm start
```

## 3. Requests
### Get cache count
```
curl localhost:3000/get-count
```

### Increase cache count
```
curl --request POST http://localhost:3000/increase-count
```

### Shut down the client
```
curl --request POST http://localhost:3000/shutdown-client
```
### Start management center
```
docker pull hazelcast/management-center:latest-snapshot
docker run -p 8080:8080 hazelcast/management-center:latest-snapshot
```

Run the management center on localhost:8080