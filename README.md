# Run lambda

## From: [Deploy Python Lambda functions with container images](https://docs.aws.amazon.com/lambda/latest/dg/python-image.html#python-image-instructions)

### Build

```
docker build --platform linux/amd64 -t docker-image:test .
```

### (Optional) Test the image locally

Run the container

```
docker run --platform linux/amd64 -p 9000:8080 docker-image:test
```



```
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'

curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"payload":"hello world!"}'
````