let neighborhood = document.getElementById("neighborhood");
let place = document.getElementById("place");
let sound = document.getElementById("sound");
let smell = document.getElementById("smell");
let event = document.getElementById("event");
let object = document.getElementById("object");
let name = document.getElementById("name");
let email = document.getElementById("email");

let stepone = document.getElementById("first_inst");
let steptwo = document.getElementById("sec_inst");
let stepthree = document.getElementById("third_inst");

let reload = document.getElementById("reload");

let nvalues = ["Bronzeville", "Oakland", "Oakwood Shores"];
let pvalues = ["Sip & Savor", "Mandrake Park and Oakwood Beach", "Ellis Park"];
let svalues = [
  "The hum of conversation",
  "families barbecuing",
  "People laughing and playing (not too loud) music",
];
let smvalues = ["Coffee", "children playing and neighbors chatting", "nothing"];
let evalues = [
  "The Forum",
  "Music Events at The Arts and Rec Center Ellis Park Rooftop Terrace",
  "the real familial bonds that existed in the former Ida B Wells housing development",
];
let ovalues = [
  "community-inspired light post",
  "Park",
  "green space and bench",
];

// let modInst = document.getElementById("modal_inst");
let modal = document.getElementById("info-modal");
let infoSpan = document.getElementById("info-span");

window.addEventListener("load", () => {
  //modal stuff
  // modInst.onclick = function () {
  //   modal.style.display = "block";
  // };

  infoSpan.onclick = function () {
    modal.style.display = "none";
  };
  // console.log(Math.max(window.innerHeight, document.body.clientHeight));
  //posts answers from submit button
  document.getElementById("submit").addEventListener("click", () => {
    console.log(
      neighborhood.value +
        " " +
        place.value +
        " " +
        sound.value +
        " " +
        smell.value +
        " " +
        event.value +
        " " +
        object.value +
        " " +
        name.value
    );

    let obj = {
      name: name.value,
      email: email.value,
      neighborhood: neighborhood.value,
      place: place.value,
      sound: sound.value,
      smell: smell.value,
      event: event.value,
      object: object.value,
    };

    //stringify the data so the server can convert to string
    let jsonData = JSON.stringify(obj);

    //make POST fetch request to sent input to server
    fetch("/maplibs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
});

let instructions = document.getElementById("instructions");
let maplibsdoc = document.getElementById("maplibspdf");
let bronzeville = document.getElementById("bronzeville");
let navbar = document.getElementById("nav");
let about = document.getElementById("about");
let mainbody = document.getElementById("mainbody");

let currentH, fullH;
//change transparency based on scroll value
//mapLib pdf goes to 0
//home page of bronzeville goes to 100
window.addEventListener("scroll", function () {
  //how far a user has scrolled from the top of the page
  var lastScrollTop = 0;

  let currentY2 = window.scrollY;
  // let scrollFromTop = window.pageYOffset;

  let totalHeight = 1000;

  currentH = Math.round(100 - (currentY2 / totalHeight) * 100) + "%";
  fullH = Math.round((currentY2 / totalHeight) * 100) + "%";

  if (currentY2 > 0 && lastScrollTop <= currentY2) {
    lastScrollTop = currentY2;
    // console.log("scrolling down");
  } else {
    // console.log("scrolling up");
  }
  lastScrollTop = currentY2;
  // console.log(window.scrollY, totalHeight, currentH);

  maplibsdoc.style.opacity = currentH;

  if (currentY2 > 900) {
    mainbody.style.opacity = fullH;
    mainbody.style.zIndex = 1;
    maplibsdoc.style.opacity = 0;

    stepthree.innerHTML = "•";
  } else {
    // navbar.style.opacity = 0;
    mainbody.style.opacity = 0;

    mainbody.style.zIndex = 0;
  }

  if (currentY2 > 200 && currentY2 < 400) {
    instructions.innerHTML =
      "Learn what your neighbors said in their word game";
    neighborhood.value = nvalues[0];
    place.value = pvalues[0];
    sound.value = svalues[0];
    smell.value = smvalues[0];
    event.value = evalues[0];
    object.value = ovalues[0];
    stepone.innerHTML = "•";
  } else if (currentY2 > 400) {
    instructions.innerHTML =
      "Learn what your neighbors said in their word game";
    neighborhood.value = nvalues[1];
    place.value = pvalues[1];
    sound.value = svalues[1];
    smell.value = smvalues[1];
    event.value = evalues[1];
    object.value = ovalues[1];
    steptwo.innerHTML = "•";
  } else {
    instructions.innerHTML =
      "Reflect on your community using the blank word game";
    neighborhood.value = "A NEIGHBORHOOD";
    place.value = "A PLACE";
    sound.value = "A SOUND";
    smell.value = "A SMELL";
    event.value = "AN EVENT";
    object.value = "AN OBJECT";

    stepone.innerHTML = "°";
    steptwo.innerHTML = "°";
    stepthree.innerHTML = "°";
  }
});

document.getElementById("reload").addEventListener("click", () => {
  maplibsdoc.style.opacity = fullH;
  mainbody.style.opacity = 0;

  mainbody.style.zIndex = 0;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

//touch for mobile
maplibsdoc.addEventListener("touchstart", () => {
  console.log("touch started");
  maplibsdoc.style.opacity = 0;
});

maplibsdoc.addEventListener("touchend", () => {
  maplibsdoc.style.opacity = 0;
  mainbody.style.zIndex = 1;
  mainbody.style.opacity = 1;
});

mainbody.addEventListener("touchstart", () => {
  mainbody.style.opacity = 1;
});

// mainbody.addEventListener("touchend", () => {
//   mainbody.style.opacity = 1;
// });
