const fs = require("fs");

const DB_FILE = "./quotes/Quote.db";

/**
 * @desc Load all quotes from file
 * @return Promise<{quote: string, author: string, category?:string}[]>
 * */
function loadQuotes(whereQuoteCallback) {
    return new Promise((resolve, reject) => {
        fs.readFile(DB_FILE, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    }).then((buffer) => {
        let quotes = JSON.parse(buffer.toString());
        if (whereQuoteCallback && typeof whereQuoteCallback === 'function') {
            quotes = quotes.filter(whereQuoteCallback);
        }
        return quotes;
    });
}

module.exports = {
    loadQuotes
}
