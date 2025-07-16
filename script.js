let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("remoteVideo");
let startBtn = document.getElementById("startBtn");

let localStream;
let peerConnection;
const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

startBtn.addEventListener("click", async () => {
  // 1. Get local camera stream
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
  audio: true
});

    localVideo.srcObject = localStream;

    // 2. Create peer connection
    peerConnection = new RTCPeerConnection(config);

    // 3. Add local tracks to peer
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });
    

    // 4. Remote stream setup
    peerConnection.ontrack = event => {
      const [remoteStream] = event.streams;
      remoteVideo.srcObject = remoteStream;
    };

    // 🟡 Real signaling (Socket.io) will go here in backend step
    console.log("Local stream ready. Waiting for signaling...");

  } catch (error) {
    console.error("Error accessing camera:", error);
    alert("Please allow camera and mic access.");
  }
});
let msgInput = document.getElementById("msgInput");
let sendBtn = document.getElementById("sendBtn");
let messagesDiv = document.getElementById("messages");

// Show sent message in chat
sendBtn.addEventListener("click", () => {
  const message = msgInput.value.trim();
  if (message === "") return;

  // Display on local chat window
  const msgElement = document.createElement("div");
  msgElement.textContent = "You: " + message;
msgElement.className = "message"; 

  messagesDiv.appendChild(msgElement);

  // TODO: Emit this message to remote peer via signaling (Socket.io)
  // socket.emit("message", message);

  msgInput.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
let nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  // Clear chat messages
  messagesDiv.innerHTML = "";

  // TODO: Disconnect current peerConnection and find a new one
  console.log("Next button clicked. Chat cleared.");
});

msgInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent newline (optional)
    sendBtn.click(); // Trigger send button
  }
});

let toggleVideoBtn = document.getElementById("toggleVideoBtn");
let placeholderImage = document.getElementById("placeholderImage");
let videoOn = true; // video is currently ON

toggleVideoBtn.addEventListener("click", () => {
  // Get mic track
const audioTrack = localStream.getAudioTracks()[0];

if (audioTrack) {
  audioTrack.enabled = videoOn; // mic on only when video on
  micStatus.style.display = "block";
  micStatus.textContent = videoOn ? "🎤" : "🔇";
}

  if (!localStream) return;

  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack) {
    videoTrack.enabled = !videoTrack.enabled;
    videoOn = videoTrack.enabled;

    // Update UI
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

    reader.readAsDataURL(file); // read file as base64 string
  }
  
});




