let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("remoteVideo");
let startBtn = document.getElementById("startBtn");

let localStream;
let peerConnection;
const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

startBtn.addEventListener("click", async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true
    });

    localVideo.srcObject = localStream;

    peerConnection = new RTCPeerConnection(config);

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = event => {
      const [remoteStream] = event.streams;
      remoteVideo.srcObject = remoteStream;
    };

    console.log("Local stream ready. Waiting for signaling...");
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert("Please allow camera and mic access.");
  }
});

let msgInput = document.getElementById("msgInput");
let sendBtn = document.getElementById("sendBtn");
let messagesDiv = document.getElementById("messages");

sendBtn.addEventListener("click", () => {
  const message = msgInput.value.trim();
  if (message === "") return;

  const msgElement = document.createElement("div");
  msgElement.textContent = "You: " + message;
  msgElement.className = "message";
  messagesDiv.appendChild(msgElement);

  msgInput.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

msgInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendBtn.click();
  }
});

let nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  messagesDiv.innerHTML = "";

  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }

  localVideo.srcObject = null;
  remoteVideo.srcObject = null;

  console.log("Next button clicked. Chat cleared.");
});

let toggleVideoBtn = document.getElementById("toggleVideoBtn");
let placeholderImage = document.getElementById("placeholderImage");
let videoOn = true;

toggleVideoBtn.addEventListener("click", () => {
  if (!localStream) return;

  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack) {
    videoTrack.enabled = !videoTrack.enabled;
    videoOn = videoTrack.enabled;

    if (!videoOn) {
      localVideo.style.display = "none";
      placeholderImage.style.display = "block";
      toggleVideoBtn.textContent = "Turn On Video";
    } else {
      localVideo.style.display = "block";
      placeholderImage.style.display = "none";
      toggleVideoBtn.textContent = "Turn Off Video";
    }
  }
});

let uploadImageInput = document.getElementById("uploadImage");

uploadImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      placeholderImage.src = e.target.result;
      console.log("Custom image set.");
    };
    reader.readAsDataURL(file);
  }
});

let micToggle = document.getElementById("micToggle");
let isMicOn = true;

micToggle.addEventListener("click", () => {
  if (!localStream) return;
