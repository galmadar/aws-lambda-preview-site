const {handler} = require('./index');



async function main() {
    const preview = await handler({url:"https://www.youtube.com/watch?v=xeyyNTyuF8s"})
    const responseBody=JSON.parse(preview.body)
    console.log(responseBody);
}


main()