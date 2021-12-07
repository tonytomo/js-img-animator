const imgs = document.getElementById("image_wrapper");
const idxWrapper = document.getElementById("index_wrapper");
const links = document.getElementById("links");
const fps = document.getElementById("fps");
const checkdrive = document.getElementById("drive");

var myscrimg = [];

var index = 0;

var timeInterval;

function init() {
  const node = document.createElement("img");
  node.setAttribute("src", myscrimg[index]);
  imgs.appendChild(node);

  const text = (index + 1).toString();
  idxWrapper.innerHTML = text;

  if (parseInt(fps.value) > 0) {
    timeInterval = setInterval(changeImg, 1000 / parseInt(fps.value));
  }
}

function changeImg() {
  if (myscrimg.length != 0) {
    removeAllChildNodes(imgs);
    addIndex();
    const node = document.createElement("img");
    node.setAttribute("src", myscrimg[index]);
    imgs.appendChild(node);

    const text = (index + 1).toString();
    idxWrapper.innerHTML = text;
  } else {
    clearInterval(timeInterval);
  }
}

function addIndex() {
  if (index == myscrimg.length - 1) {
    index = 0;
  } else {
    index++;
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function resetLinks() {
  const getLinks = links.value.split("\n");
  let allLinks = [];

  const drivechecked = checkdrive.checked;
  const regex = /https:\/\/drive.google.com\/file\/d\/(.*?)\/view\?usp\=sharing/;

  if (drivechecked) {
    for (let i = 0; i < getLinks.length; i++) {
      let newstr = getLinks[i].replace(regex, "$1");

      let newlink = 'https://drive.google.com/uc?id=url'.replace('url', newstr);
      allLinks.push(newlink);
    }
  } else {
    allLinks = getLinks;
  }

  console.log("timer = " + 1000 / fps.value);

  if (allLinks.length > 1 && parseInt(fps.value) > 0) {
    clearInterval(timeInterval);
    myscrimg = allLinks;
    timeInterval = setInterval(changeImg, 1000 / parseInt(fps.value));
  } else {
    clearInterval(timeInterval);
  }
  console.log("Length = " + allLinks.length);
}
