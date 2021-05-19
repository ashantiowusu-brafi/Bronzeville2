window.addEventListener("load", () => {
  fetch("/getmaplibs")
    .then((resp) => resp.json())
    .then((data) => {
      document.getElementById("submitted-answers").innerHTML = "";
      console.log(data.data);
      let csvFile = data.data;

      function download(content, fileName, contentType) {
        let a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      }

      function onDownload() {
        download(csvFile, "MapLibs.csv", "text/plain");
      }

      document.getElementById("fetch-data").addEventListener("click", () => {
        onDownload();
      });

      //not using this for loop
      for (let i = 0; i < data.data.length; i++) {
        // let newString = JSON.stringify(data.data[i]);
        // let newElement = document.createElement("p");
        // newElement.innerHTML = newString;
        // document.getElementById("submitted-answers").appendChild(newElement);
        // function download(content, fileName, contentType) {
        //   let a = document.createElement("a");
        //   const file = new Blob([content], { type: contentType });
        //   a.href = URL.createObjectURL(file);
        //   a.download = fileName;
        //   a.click();
        // }
        // function onDownload() {
        //   download(newString, "MapLibs.json", "text/plain");
        // }
        // document.getElementById("fetch-data").addEventListener("click", () => {
        //   onDownload();
        // });
      }
    });
});
