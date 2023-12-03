document.getElementById("firstBtn").addEventListener("click", function () {
  fetch("https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php")
    .then((response) => response.text())
    .then((data) => {
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML = `<h1 style="text-align: center;">${data} Your Student Number</h1>`;
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("secondBtn").addEventListener("click", function () {
  const inputValue = document.getElementById("inputField").value;
  fetch(
    `https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php?input=${inputValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = "";

      data.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<h2>${item.series}</h2><img src="${item.url}" alt="${item.name}"><p>${item.name}</p>`;
        imageContainer.appendChild(div);
      });

      // Disable input after button press
      document.getElementById("inputField").disabled = true;
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("thirdBtn").addEventListener("click", function () {
  const inputValue = document.getElementById("inputField").value;
  fetch("https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `input=${inputValue}`,
  })
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";

      data.forEach((item) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = item.name;
        cell2.textContent = item.url;
        cell3.textContent = item.series;
      });

      // Set copyright notice based on input value
      const copyrightNotice = document.getElementById("copyrightNotice");
      if (inputValue.toLowerCase() === "mario") {
        copyrightNotice.textContent =
          "Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo. © 2019 Nintendo.";
      } else if (inputValue.toLowerCase() === "star wars") {
        copyrightNotice.textContent =
          "Star Wars © & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material © 2022 Electronic Arts Inc.";
      }

      // Disable input after button press
      document.getElementById("inputField").disabled = true;
    })
    .catch((error) => console.error("Error:", error));
});
