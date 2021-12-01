const imgs = document.getElementById("image_wrapper");
const idxWrapper = document.getElementById("index_wrapper");
const links = document.getElementById("links");
const fps = document.getElementById("fps");

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
  const allLinks = links.value.split("\n");

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
