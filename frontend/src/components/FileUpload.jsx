import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/fileUpload.css";

const FileUpload = () => {
  const [inputData, setInputData] = useState(false);

  useEffect(() => {
    if (inputData) {
      const userdata = document.querySelectorAll(".input");
      const image = document.getElementById("image");
      const userDataArr = {};

      for (let data of userdata) {
        userDataArr[data.name] = data.value;
      }

      userDataArr.image = image.files[0].name;

      //console.log(userDataArr);
      let formData = new FormData();

      formData.append("userdata", JSON.stringify(userDataArr));
      formData.append("userfile", image.files[0]);
      axios({
        method: "post",
        url: "http://localhost:8000/upload",
        data: formData,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });

      setInputData(false);
    }
  }, [inputData]);

  return (
    <div className="form">
      <h1>Welcome to Miami</h1>

      <input className="input" type="text" name="username" id="username" placeholder="Username" required />
      <input className="input" type="email" name="email" id="email" placeholder="Email" required />
      <input className="input" type="text" name="city" id="city" placeholder="City" required />
      <input className="input" type="text" name="address" id="address" placeholder="Address" required />
      <div className="num">
        <input className="input" type="number" name="zipCode" id="zipCode" placeholder="Zip code" required />
        <input className="input" type="number" name="streetN" id="streetN" placeholder="Street num." required />
      </div>
      <input className="input" type="text" name="other" id="other" placeholder="Other" />
      <input type="file" name="sampleFile" id="image" />
      <input type="button" value="Submit" onClick={() => setInputData(true)} />
    </div>
  );
};

export default FileUpload;
