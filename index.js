import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


const yourUsername = "shiva";
const yourPassword = "shiva";
const yourAPIKey = "145a1fe4-7a5c-46f8-be4c-2285d445cd2f";
const yourBearerToken = "0780777f-97e1-41ee-a39f-f93ef37e5b97";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/random");
    res.render ("index.ejs", {content:JSON.stringify(response.data)});
    
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/filter",{
      params: {
        score:5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs" ,{content: JSON.stringify(response.data)});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/secrets/2", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const data = response.data;
    const string = JSON.stringify(data);
    res.render("index.ejs" ,{content: string});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
