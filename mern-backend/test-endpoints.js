const http = require("http");

// Function to make HTTP requests
function makeRequest(path, callback) {
  const options = {
    hostname: "localhost",
    port: 5000,
    path: path,
    method: "GET",
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(`\n=== ${path} ===`);
      console.log(`Status: ${res.statusCode}`);
      try {
        const jsonData = JSON.parse(data);
        console.log(JSON.stringify(jsonData, null, 2));
      } catch (e) {
        console.log(data);
      }
      if (callback) callback();
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request to ${path}: ${e.message}`);
    if (callback) callback();
  });

  req.end();
}

// Test all endpoints
console.log("Testing MERN Backend API endpoints...");

makeRequest("/", () => {
  makeRequest("/health", () => {
    makeRequest("/api/info", () => {
      makeRequest("/nonexistent", () => {
        console.log("\n✅ All endpoint tests completed!");
        process.exit(0);
      });
    });
  });
});
