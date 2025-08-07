// Navigation bar functionality
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      // Remove active class from all nav links
      navLinks.forEach(nav => nav.classList.remove("active"));

      // Add active class to the clicked nav link
      this.classList.add("active");
    });
  });
});

// Predefined image lists for each topic
const imageMap = {
  taskmanagement: [
    'images/taskmanagement/task-1.PNG',
    'images/taskmanagement/task-2.PNG',
    'images/taskmanagement/task-3.PNG',
    'images/taskmanagement/task-4.PNG',
    'images/taskmanagement/task-5.PNG',
    'images/taskmanagement/task-6.PNG',
    'images/taskmanagement/task-7.PNG',
    'images/taskmanagement/task-8.PNG',
  ],
  citisync: [
    'images/citisync/citisync1.PNG',
    'images/citisync/citisync2.PNG',
    'images/citisync/citisync3.PNG',
    'images/citisync/citisync4.PNG',
    'images/citisync/citisync5.PNG',
    'images/citisync/citisync6.PNG',
    'images/citisync/citisync7.PNG',
    'images/citisync/citisync8.PNG',
    'images/citisync/citisync9.PNG',
    'images/citisync/citisync10.PNG',
    'images/citisync/citisync11.PNG',
    'images/citisync/citisync12.PNG',
    'images/citisync/citisync13.PNG',
    'images/citisync/citisync14.PNG',
    'images/citisync/citisync15.PNG',
    'images/citisync/citisync16.PNG',
    'images/citisync/citisync17.PNG',
    'images/citisync/citisync19.PNG',
    'images/citisync/citisync20.PNG',
    'images/citisync/citisync21.PNG',
    'images/citisync/citisync22.PNG'
  ]
};

// Project descriptions per topic
const descriptionMap = {
  taskmanagement: `
    <p>This <strong>Task Management</strong> module is a lightweight feature built using <strong>Angular, TypeScript, HTML, CSS, and Node.js</strong>. It’s designed to integrate into a larger web application and provides users with a minimal yet functional interface for handling daily task items. The frontend, built in Angular and styled with CSS, presents a clean layout where users can quickly view and interact with their tasks. HTML templates are used to structure the list, and TypeScript handles the logic and data flow between components.</p>
    <p><strong>The core functionality allows users to create, delete, and sort tasks</strong>. When a new task is added, it immediately appears at the top of the list through real-time data binding. Tasks are automatically sorted in descending order based on the time they were added, ensuring that recent entries are always visible first. A delete button is provided for each task, enabling users to remove items with ease. The simplicity of this feature makes it fast and user-friendly, without adding unnecessary complexity to the main application.</p>
  `,
  citisync: `
    <p>
      <strong>CitiSync</strong> is a project is a <strong>Transaction Processing System</strong> made for a subdivision to help manage things like <strong>monthly dues</strong>, <strong>amenity reservations</strong>, and <strong>document requests</strong>. It’s a web application that allows residents to do everything online. Residents can pay their monthly dues, request documents like certificates, and reserve amenities like the basketball court. But if they haven’t paid their monthly dues, they won’t be allowed to reserve or request anything until they settle their balance. The system also sends <strong>notifications and email reminders</strong> for any unpaid dues, and it creates <strong>receipts</strong> after each successful transaction.
    </p>
    <p>
      The system has <strong>three roles</strong> for users: <strong>System Admin</strong>, <strong>Admin</strong>, and <strong>Resident</strong>. The <strong>System Admin</strong> has access to everything and can manage all parts of the system. The <strong>Admin</strong> handles most of the work—like managing records, checking transactions, posting updates, and generating <strong>PDF copies</strong> of records. <strong>Residents</strong> have access to basic features, like paying dues, making reservations, and requesting documents. They can also add their <strong>family members</strong> to the system for record-keeping.
    </p>
    <p>
      There are also some helpful features added to the system. <strong>Admins can post announcements or updates</strong> for the residents to see. They can <strong>edit item lists</strong>, like what documents or amenities are available. There's also an <strong>activity log</strong> that records actions done inside the system, which helps track changes or updates. This project makes it easier for both admins and residents to manage community tasks, all in one place and online.
    </p>
  `
};

let currentImageList = [];
let currentImageIndex = 0;

// Handle topic buttons
document.querySelectorAll('.topic-btn').forEach(button => {
  button.addEventListener('click', () => {
    const topic = button.getAttribute('data-topic');
    const images = imageMap[topic] || [];
    const description = descriptionMap[topic] || '<p>No description available.</p>';

    currentImageList = images;

    // Set dynamic description
    document.getElementById('projectDescription').innerHTML = description;

    // Render images
    const grid = document.getElementById('imageGrid');
    grid.innerHTML = '';

    images.forEach((src, index) => {
      const col = document.createElement('div');
      col.className = 'col-6 col-md-3';

      const img = document.createElement('img');
      img.src = src;
      img.className = 'img-fluid';
      img.alt = topic;

      img.addEventListener('click', () => {
        currentImageIndex = index;
        openFullscreenImage(src);
      });

      col.appendChild(img);
      grid.appendChild(col);
    });

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    modal.show();
  });
});

// Open image in fullscreen view
function openFullscreenImage(src) {
  document.getElementById('fullscreenImg').src = src;
  document.getElementById('fullscreenOverlay').classList.remove('d-none');
}

// Close fullscreen overlay
document.querySelector('.close-overlay').addEventListener('click', () => {
  document.getElementById('fullscreenOverlay').classList.add('d-none');
});

// Navigate to previous image
document.getElementById('prevImage').addEventListener('click', () => {
  if (currentImageList.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
  openFullscreenImage(currentImageList[currentImageIndex]);
});

// Navigate to next image
document.getElementById('nextImage').addEventListener('click', () => {
  if (currentImageList.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % currentImageList.length;
  openFullscreenImage(currentImageList[currentImageIndex]);
});


// Transitions

// HOME
function triggerAnimations() {
  const hiddenGroup = document.querySelector('.hidden-before-load');

  hiddenGroup.classList.remove('show'); // Reset
  void hiddenGroup.offsetWidth; // Force reflow

  const popUps = hiddenGroup.querySelectorAll('.pop-up');

  popUps.forEach((el, index) => {
    el.style.animation = 'none'; // Reset animation
    el.offsetHeight; // Force reflow
    el.style.animation = `popUp 0.6s ease-out forwards`;
    el.style.animationDelay = `${index * 0.5}s`;
    el.style.animationPlayState = 'running';
  });

  hiddenGroup.classList.add('show');
}

// On page load
window.addEventListener("load", () => {
  triggerAnimations();
});

// ABOUT
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in-bottom:not(.animate), .slide-in-left:not(.animate)');
  const triggerBottom = window.innerHeight * 0.9;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('animate');
    }
  });
};

// Bind on scroll and load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// SERVICE
function animateCardsOnScroll() {
  const elements = document.querySelectorAll('.slide-in-left-2, .slide-in-top, .slide-in-right');
  const triggerBottom = window.innerHeight * 0.9;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('services-animate');
    }
  });
}

// Trigger on scroll and load
window.addEventListener('scroll', animateCardsOnScroll);
window.addEventListener('load', animateCardsOnScroll);

// PROJECTS
window.addEventListener('scroll', () => {
  const carousel = document.getElementById('projectCarousel');
  const rect = carousel.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.9;

  if (rect.top < triggerPoint) {
    carousel.classList.add('visible');
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.graphic-img').forEach(el => observer.observe(el));


// CONTACT
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in-left, .fade-in-right");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
        obs.unobserve(entry.target); // Remove if you want one-time animation
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% is visible
  });

  fadeElements.forEach(el => {
    observer.observe(el);
  });

  // Optional: If user clicks on a nav link to #contact, scroll + animate
  const contactLink = document.querySelector('a[href="#contact"]');
  contactLink?.addEventListener("click", () => {
    setTimeout(() => {
      fadeElements.forEach(el => {
        el.classList.add("fade-in-visible");
      });
    }, 300); // Delay to allow scroll first
  });
});
