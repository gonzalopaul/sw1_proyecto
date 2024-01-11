// public/javascripts/index.js

$(document).ready(function() {
  const canvas = document.getElementById('carouselCanvas');
  const ctx = canvas.getContext('2d');

  // Update the canvas size to match the image size or a specific aspect ratio
  // For this example, let's say your images have a size of 1280x898
  canvas.width = window.innerWidth; // Set this to the width you want
  canvas.height = canvas.width * (898 / 1280); // Maintain the aspect ratio

  const images = [
    '/images/vbon8000rosa.jpeg',
    '/images/vbon8000verde.jpeg',
    '/images/vbon8000negro.jpeg'
  ];

  let currentIndex = 0;

  function drawImage(index) {
    const img = new Image();
    img.src = images[index];
    img.onload = function() {
      const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
      const scaledWidth = img.width * scaleFactor;
      const scaledHeight = img.height * scaleFactor;
      const xOffset = (canvas.width - scaledWidth) / 2;
      const yOffset = (canvas.height - scaledHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the image centered on the canvas
      ctx.drawImage(img, xOffset, yOffset, scaledWidth, scaledHeight);
    };
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    drawImage(currentIndex);
  }

  // Load the first image
  drawImage(currentIndex);

  // Change the image automatically every 1.5 seconds
  setInterval(nextImage, 1500);
});
