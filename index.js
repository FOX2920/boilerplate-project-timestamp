const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS so that the API is remotely testable
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for the timestamp microservice
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else {
    if (!isNaN(dateParam)) {
      dateParam = parseInt(dateParam);
    }
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      unix: date.getTime(),
      utc: date.toUTCString()
    }, null, 2)); 
  }
});


// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
