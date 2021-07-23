const express = require("express");
const app = express();
const morgan = require("morgan");
const quotes = require("./quotes");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  const headers = [
    ['Access-Control-Allow-Origin', '*'],
    ["Access-Control-Allow-Methods", "GET, HEAD, DELETE, OPTIONS, POST"],
    ["Access-Control-Allow-Credentials", true]
  ];
  headers.forEach(([name, value]) => res.setHeader(name, value));

  const {category, author} = req.query;
  let whereQuoteCallback = null;
  if (category || author) {
    whereQuoteCallback = (quote) => {
      const hasCategory = (category && category === quote.category) || !category;
      const hasAuthor = (author && author === quote.author) || !author;
      return hasCategory && hasAuthor;
    }
  }

  quotes.loadQuotes(whereQuoteCallback).then((quotes) => {
    if (!quotes.length) {
      throw new Error('Quote on request not found.');
    }
    const rnd = Math.floor(Math.random() * (quotes.length - 1));
    return quotes[rnd];
  }).then((quote) => {
    res.json(quote);
  }).catch((err) => {
    res.json({
      error: {
        message: err.message
      }
    });
  });
});

app.post("/", (req, res) => {
  console.log(req.body.post);
  res.json(req.body.post);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server is running :  ${process.env.NODE_ENV} mode on port ${port}`
  );
});
