const dropArea = document.querySelector(".drag-area");
const header = dropArea.querySelector("header");
let button = dropArea.querySelector(".brButton");
const input = dropArea.querySelector("input");
const uploadButton = document.querySelector(".upButton");
const dispAr = document.querySelector(".display-area");

let file;
let imgTag;

const displayImg = () => {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      imgTag = `<img src="${fileURL}" style="width:100px, height: 100px" alt="" />`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an image");
    dropArea.classList.remove("active");
  }
};

button.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", function () {
  file = this.files[0];
  displayImg();
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  header.textContent = "Release to Upload file";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  header.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  displayImg();
});

uploadButton.addEventListener("click", () => {
  const html = `
    <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
    <header>Drag & Drop</header>
    <span>OR</span>
    <button class="brButton">Browse File</button>
    <input type="file" hidden />`;
  dropArea.innerHTML = html;
  dispAr.insertAdjacentHTML("beforeend", imgTag);
  button = dropArea.querySelector(".brButton");
  button.addEventListener("click", () => {
    input.click();
  });
  imgTag = "";
  dropArea.classList.remove("active");
});
