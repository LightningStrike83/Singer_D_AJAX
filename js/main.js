(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#materials-list")

  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes/")
    .then(response => response.json())
    .then(infobox => {
      console.log(infobox);

      infobox.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index+1}`);

        const imgElement = document.createElement('img');
        imgElement.src = infoBox.thumbnail;
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;
  
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;
  
        selected.appendChild(imgElement);
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
      });
    })
  }

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materials => {

      materials.forEach(materialPart => {
        const clone = materialTemplate.content.cloneNode(true);

        const materialHeading = clone.querySelector(".material-heading");
        materialHeading.textContent = materialPart.heading;

        const materialDesc = clone.querySelector(".material-description")
        materialDesc.textContent = materialPart.description

        materialList.appendChild(clone);
      })
    })
  }

  loadMaterialInfo();
  loadInfoBoxes();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

