const pageLoaded = () => {
  console.log("Client is running...");

  const submit = document.getElementById("uploadForm");

  const write = (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName");
    const image = document.getElementById("image");
    let formData = new FormData(); // Ha az event.target beírnám, akkor behúzna mindent.

    formData.append("userfile", image.files[0]);
    formData.append("username", userName.value);

    for (let obj of formData) {
      console.log(obj);
    }

    axios({
      method: "post",
      url: "http://localhost:8000/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  submit.addEventListener("submit", write);
};

window.addEventListener("load", pageLoaded);
