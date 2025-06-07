// toggle icon navbar 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll section 
let section = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            //active navbar links
            navlinks.forEach(links => {
                links.classList.remove('active');
                let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }   
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate')
        }
        // if want show animation that repeated on scroll use this
        else {
            sec.classList.remove('show-animate')
        }
    });
    // sticky header
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
 
    // remove toggle icon and nacbar when click navbar links (scroll)
    
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// project section
// ----- Slider Functionality -----
const slider = document.querySelector('.projects-slider');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
let currentIndex = 0;
const visibleCards = 2;
const cards = document.querySelectorAll('.project-card');
let totalCards = cards.length;

function updateSlider() {
  if (cards.length > 0) {
    const cardWidth = cards[0].offsetWidth + 16; // Adjust for margin
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
}

leftBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

rightBtn.addEventListener('click', () => {
  if (currentIndex < totalCards - visibleCards && totalCards > visibleCards) {
    currentIndex++;
    updateSlider();
  }
});

// ----- Authentication Logic -----
const signInBtn = document.getElementById('signin-btn');
const signInForm = document.getElementById('signin-form');
const submitSignInBtn = document.getElementById('submit-signin');
const uploadBtn = document.getElementById('upload-btn');
const uploadSection = document.getElementById('upload-section');

signInBtn.addEventListener('click', () => {
  signInForm.style.display = signInForm.style.display === 'block' ? 'none' : 'block';
});

submitSignInBtn.addEventListener('click', () => {
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  if (email && password) {
    if (email === 'hemantmenaria1997@gmail.com' && password === '6336627774442') {
      alert('Sign in successful!');
      signInForm.style.display = 'none';
      signInBtn.style.display = 'none';
      uploadBtn.style.display = 'inline-block';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  } else {
    alert('Please fill in all fields.');
  }
});

uploadBtn.addEventListener('click', () => {
  uploadSection.style.display = uploadSection.style.display === 'block' ? 'none' : 'block';
});

// ----- Upload New Project -----
document.getElementById('upload-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const fileInput = document.getElementById('project-file');
  const titleInput = document.getElementById('project-title');
  const descInput = document.getElementById('project-desc');

  if (fileInput.files && fileInput.files[0]) {
    // Store the input values in temporary variables
  const titleValue = titleInput.value;
  const descValue = descInput.value;

    const reader = new FileReader();
    reader.onload = function(e) {
      const newCard = document.createElement('div');
      newCard.classList.add('project-card');
      newCard.innerHTML = `
        <div class="project-thumbnail">
          <img src="${e.target.result}" alt="${titleValue}">
        </div>
        <div class="project-info">
          <h3>${titleValue}</h3>
          <p>${descValue}</p>
          <button id="view-details" class="btn">View Details</button>
        </div>
      `;
      slider.appendChild(newCard);
      totalCards = document.querySelectorAll('.project-card').length; // Update total cards
    };
    reader.readAsDataURL(fileInput.files[0]);
    // Clear fields after storing the values
    fileInput.value = "";
    titleInput.value = "";
    descInput.value = "";
  }
});

// ----- Image Slideshow Functionality -----
function startSlideshow(container) {
const images = container.querySelectorAll('img');
let currentIndex = 0;

// Show the first image initially
images[currentIndex].classList.add('active');

setInterval(() => {
  // Hide the current image
  images[currentIndex].classList.remove('active', 'hovered');

  // Move to the next image
  currentIndex = (currentIndex + 1) % images.length;

  // Show the next image
  images[currentIndex].classList.add('active');
}, 3000); // Change image every 3 seconds
}

// Initialize slideshow for all project cards
document.querySelectorAll('.project-thumbnail').forEach((thumbnail) => {
startSlideshow(thumbnail.querySelector('.image-container'));

// Hover effect to double the image size
const images = thumbnail.querySelectorAll('image-container');
images.forEach((img) => {
  img.addEventListener('mouseenter', () => {
    img.classList.add('hovered');
  });

  img.addEventListener('mouseleave', () => {
    img.classList.remove('hovered');
  });
});
});


