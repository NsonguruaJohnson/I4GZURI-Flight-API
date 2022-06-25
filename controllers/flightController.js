const fs = require("fs");

// Convert JSON to javascript object
const flights = JSON.parse(fs.readFileSync("./models/flight.json"));
// const flights =JSON.parse(
//     fs.readFileSync(`${__dirname}/models/flight.json`);
// );

exports.example = (req, res) => {
  console.log("example");
  res.send("Flight example");
};

// Book flight
exports.addFlight = (req, res) => {
  let newId;
  if (flights.length === 0) {
    newId = 0;
  } else {
    newId = flights[flights.length - 1].id + 1;
  }
  const newFlight = Object.assign({ id: newId, date: new Date().toISOString() }, req.body);

  flights.push(newFlight);

  fs.writeFile("./models/flight.json", JSON.stringify(flights, null, 2), (err) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: err
      })
    }

    res.status(201).json({
      status: "success",
      data: {
        flight: newFlight,
      },
    });
  });

  console.log("Flight Booked");
};

// Get all flights
exports.getAllFlights = (req, res) => {
  res.status(200).json({
    status: "success",
    results: flights.length,
    data: {
      flights,
    },
  });

  console.log("All flight read");
};

exports.getOneFlight = (req, res) => {
  //   console.log(req.params);
  const id = parseInt(req.params.id);
  const flight = flights.find((el) => el.id === id);

  if (!flight) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID/Flight not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      flight,
    },
  });
};

exports.updateFlight = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, time, price } = req.body;
  const flight = flights.find((el) => el.id === id);

  if (!flight) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  flight.title = title || flight.title;
  flight.time = time || flight.time;
  flight.price = price || flight.price;
  
  const flightIndex = flights.indexOf(flight);
  flights.splice(flightIndex, 1, flight);
  
  fs.writeFile("./models/flight.json", JSON.stringify(flights, null, 2), (err) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: err
      })
    }

  });

  res.status(200).json({
    status: "success",
    message: "Flight Updated",
    data: {
      flight,
    },
  });
};

exports.deleteFlight = (req, res) => {
  const id = parseInt(req.params.id);
  const flight = flights.find((el) => el.id === id);

  if (!flight) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID/Flight not found",
    });
  }

  const flightIndex = flights.indexOf(flight);
  flights.splice(flightIndex, 1);

  fs.writeFile("./models/flight.json", JSON.stringify(flights, null, 2), (err) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        message: err
      })
    }

  });

  // Should the status code be 204? 204 wont return anything in postman if successful
  res.status(200).json({
    status: "success",
    message: "Flight deleted",
    data: flight,
  });

  console.log("Flight deleted");
};
