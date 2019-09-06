const https = require('https')
const options = {
    hostname: 'api.exchangeratesapi.io',
    port: 443,
    path: '/latest',
    method: 'GET'
}

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
        process.stdout.write(d)
    })
})

req.on('error', (error) => {
    console.error(error)
})

req.end()