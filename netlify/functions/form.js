exports.handler = function(event, context, callback) {



console.log(typeof event.body)
console.log(event.body)
    console.log("Hello World From Netlify/functions")

    return callback(null, {
        statusCode: 200,
        body: "Hello World From Netlify/functions"
    })
}