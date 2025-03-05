import Compressor from "compressorjs";

const imageInput = document.getElementById("imageInput");
const compressBtn = document.getElementById("compressBtn");
const originalSizeText = document.getElementById("originalSize");
const compressedSizeText = document.getElementById("compressedSize");
const sizeReductionText = document.getElementById("sizeReduction");
const downloadLink = document.getElementById("downloadLink");
const uploadProgress = document.getElementById("uploadProgress");
const statusMessage = document.getElementById("statusMessage");

let selectedFile = null;

// Enable button only when a valid file is selected
imageInput.addEventListener("change", function (event) {
    selectedFile = event.target.files[0];

    if (!selectedFile) {
        compressBtn.disabled = true;
        return;
    }

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
        alert("Invalid file type. Please select an image.");
        imageInput.value = ""; // Reset input
        return;
    }

    originalSizeText.textContent = (selectedFile.size / 1024).toFixed(2) + " KB";
    compressedSizeText.textContent = "N/A"; // Reset compressed size
    sizeReductionText.textContent = "N/A"; // Reset size reduction percentage
    compressBtn.disabled = false; // Enable the button
});

// Handle compression & upload
compressBtn.addEventListener("click", function () {
    if (!selectedFile) return;

    statusMessage.textContent = "Compressing image...";

    new Compressor(selectedFile, {
        quality: 0.6,
        maxWidth: 800,
        success(compressedFile) {
            const originalSizeKB = selectedFile.size / 1024;
            const compressedSizeKB = compressedFile.size / 1024;
            const reductionPercentage = ((1 - (compressedSizeKB / originalSizeKB)) * 100).toFixed(2);

            compressedSizeText.textContent = compressedSizeKB.toFixed(2) + " KB";
            sizeReductionText.textContent = reductionPercentage + "%";

            statusMessage.textContent = "Uploading image...";
            uploadImage(compressedFile);
        },
        error(err) {
            console.error("Compression error:", err);
            statusMessage.textContent = "Compression failed.";
        },
    });
});

function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    uploadProgress.style.display = "block";
    uploadProgress.value = 0; // Reset progress

    fetch("http://compression1.vercel.app/upload", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.path) {
            statusMessage.textContent = "Upload successful!";

            // Prevent caching issues
            const timestamp = new Date().getTime();
            downloadLink.href = data.path + "?t=" + timestamp;
            downloadLink.download = `compressed-${timestamp}.webp`;

            downloadLink.style.display = "block"; // Show the download link
        } else {
            throw new Error(data.error || "Upload failed");
        }
    })
    .catch(error => {
        console.error("Upload error:", error);
        statusMessage.textContent = "Upload failed. Try again.";
    })
    .finally(() => {
        uploadProgress.style.display = "none"; // Hide progress bar
    });
}
