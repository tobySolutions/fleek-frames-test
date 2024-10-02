import express from "express";
const app = express();
const port = 3000;

import bootstrap from "./dist/index.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log request details and generate curl command
app.use((req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const headers = req.headers;
  const body = req.body;
  const query = req.query;

  let curlCommand = `curl -X ${method} "${req.protocol}://${req.get(
    "host"
  )}${url}"`;

  // Add headers to curl command
  for (const [header, value] of Object.entries(headers)) {
    curlCommand += ` -H "${header}: ${value}"`;
  }

  // Add body to curl command for POST, PUT, PATCH requests
  if (
    ["POST", "PUT", "PATCH"].includes(method) &&
    Object.keys(body).length > 0
  ) {
    curlCommand += ` -d '${JSON.stringify(body)}'`;
  }

  // Add query parameters to curl command
  if (Object.keys(query).length > 0) {
    const queryParams = new URLSearchParams(query).toString();
    curlCommand += `?${queryParams}`;
  }

  // Log the curl command to the console (or you can send it in the response)
  console.log(`Request details:\n${curlCommand}`);

  // Include curl command in response
  res.locals.curlCommand = curlCommand;

  next();
});

app.use(async (req, res) => {
  // @notice this is a mock server for the frontend use your ngrok connection
  const { POST } = bootstrap("http://localhost:3000");
  const html = await POST({ request: req });
  //console.log(html)
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
