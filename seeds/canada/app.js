const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.urlencoded({ extended: true }));


app.get("/seeds", async (req, res) => {
  try {
    const response = await axios.get(
      "http://opendata.arcgis.com/datasets/8f1dfa57d7344737a086f5dfeabe6989_0.geojson"
    );
    //console.log(response);
  } catch (error) {
    console.error(error);
  }
});

const {features} = data.features.properties;
for(let name of features.properties.name_e){
  console.log(name);
}

app.listen(8000, () => {
  console.log("serving on port 8000");
});

