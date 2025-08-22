let papers = [];

function uploadPaper() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file first!");
    return;
  }

  // File ka URL banate hain
  const fileURL = URL.createObjectURL(file);

  papers.push({
    name: file.name,
    url: fileURL,
    type: file.type
  });

  renderList();
  fileInput.value = "";
}

function renderList() {
  const list = document.getElementById("paperList");
  list.innerHTML = "";

  papers.forEach((paper, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${paper.name}
      <button onclick="openPaper(${index})">Open</button>
    `;
    list.appendChild(li);
  });
}

function openPaper(index) {
  const previewSection = document.getElementById("previewSection");
  const previewBox = document.getElementById("previewBox");

  previewBox.innerHTML = ""; // clear old preview

  const paper = papers[index];

  // Agar image hai to <img>
  if (paper.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = paper.url;
    img.style.maxWidth = "90%";
    previewBox.appendChild(img);
  } 
  // Agar PDF hai to <embed>
  else if (paper.type === "application/pdf") {
    const embed = document.createElement("embed");
    embed.src = paper.url;
    embed.type = "application/pdf";
    embed.width = "90%";
    embed.height = "500px";
    previewBox.appendChild(embed);
  } 
  else {
    const p = document.createElement("p");
    p.textContent = "Preview not supported. You can download this file.";
    previewBox.appendChild(p);
  }

  previewSection.style.display = "block";
}

function goBack() {
  document.getElementById("previewSection").style.display = "none";
}
  // Current page active highlight
  document.querySelectorAll(".nav-link").forEach(link => {
    if(link.href === window.location.href){
      link.classList.add("active");
    }
  });


