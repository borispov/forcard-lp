exports.handler = async function(event) {
    console.log("Hello World Yes I Am Here!")
    return {
        statusCode: 200,
        body: { message: "HELLO WORLD" }
    }
}