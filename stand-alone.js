const fetch = require('node-fetch');
fetch('https://api.exchangeratesapi.io/latest?base=SEK')
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data)
    console.log(data.rates.SEK);
    

    /*
    for (let i=0; i<data.rates.length; i++) {
        console(i);
    }
    */
})
