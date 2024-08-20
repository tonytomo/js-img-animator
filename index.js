// Get elements by id
const imageBox = document.getElementById("imageBox");
const fpsForm = document.getElementById("fpsForm");
const frameBox = document.getElementById("frameBox");
const fromGDrive = document.getElementById("fromGDrive");
const urlInputBox = document.getElementById("urlInputBox");
const togglePlayButton = document.getElementById("togglePlayButton");
const clearButton = document.getElementById("clearButton");

// Variables
let images = [];
let timeInterval;
let frameIndex = 0;
let fps = parseInt(fpsForm.value);
let isFromGDrive = fromGDrive.checked;
let isPlaying = false;

// Toggle url sources
function toggleDrive() {
    if (isFromGDrive) {
        isFromGDrive = false;
    } else {
        isFromGDrive = true;
    }
    setUrl();
}

// Set Urls
function setUrl() {
    let urls = urlInputBox.value.split(/\s+/);

    if (isFromGDrive) {
        urls = urls.map((url) => {
            let id = url.split("/")[5];
            return `https://drive.google.com/thumbnail?id=${id}&sz=w500`;
        });
    }
    images = urls;

    drawFirstImage();

    if (images.length != 0) {
        togglePlayButton.disabled = false;
        clearButton.disabled = false;
    }
}

// Draw image
function drawFirstImage() {
    imageBox.innerHTML = "";
    const node = document.createElement("img");
    node.setAttribute("src", images[0]);
    imageBox.appendChild(node);
}

// Set FPS
function setFps() {
    fps = fpsForm.value;
}

// Play
function togglePlayAnimation() {
    if (isPlaying) {
        clearInterval(timeInterval);
        isPlaying = false;
        togglePlayButton.innerHTML = "<i class='gg-play-button'></i>";
        fpsForm.disabled = false;
        urlInputBox.disabled = false;
        fromGDrive.disabled = false;
        clearButton.disabled = false;
    } else {
        setUrl();
        isPlaying = true;
        togglePlayButton.innerHTML = "<i class='gg-play-stop'></i>";
        fpsForm.disabled = true;
        urlInputBox.disabled = true;
        fromGDrive.disabled = true;
        clearButton.disabled = true;

        timeInterval = setInterval(() => {
            if (images.length != 0) {
                if (frameIndex == images.length) {
                    frameIndex = 0;
                }

                imageBox.innerHTML = "";
                const node = document.createElement("img");
                node.setAttribute("src", images[frameIndex]);
                imageBox.appendChild(node);
                frameIndex++;
            } else {
                clearInterval(timeInterval);
            }
            frameBox.value = frameIndex;
        }, 1000 / fps);
    }
}

// Clear
function clearAnimation() {
    clearInterval(timeInterval);
    isPlaying = false;
    togglePlayButton.innerHTML = "<i class='gg-play-button'></i>";
    clearButton.disabled = true;
    imageBox.removeChild(imageBox.firstChild);
    frameBox.value = 0;
}
