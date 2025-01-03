const {handler} = require('./index');



async function main() {
    const url = "https://clipdrop.co/";
    const preview = await handler({url})
    const responseBody=JSON.parse(preview.body)
    console.log({...responseBody});
}


main()