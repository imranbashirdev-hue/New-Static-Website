// Mobile menu toggle
  const toggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Stats counter (when visible)
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  function startCounters() {
    if(counted) return;
    counted = true;
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      let current = 0;
      const increment = target / 45;
      const updateCounter = () => {
        current += increment;
        if(current < target) {
          el.innerText = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          el.innerText = target;
        }
      };
      updateCounter();
    });
  }

  // scroll observer for stats section
  const statsSection = document.querySelector('#stats');
  if(statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(statsSection);
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // simple newsletter interaction
  const subscribeBtn = document.getElementById('subscribeBtn');
  const newsEmail = document.getElementById('newsEmail');
  const msgDiv = document.getElementById('formMsg');
  if(subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      const email = newsEmail.value.trim();
      if(email === '' || !email.includes('@')) {
        msgDiv.innerHTML = 'Please enter a valid email address.';
        msgDiv.style.color = '#ffd966';
      } else {
        msgDiv.innerHTML = `🎉 Thanks! You'll receive updates at ${email}.`;
        newsEmail.value = '';
        setTimeout(() => { msgDiv.innerHTML = ''; }, 4000);
      }
    });
  }

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if(targetId === "#" || targetId === "") return;
      const target = document.querySelector(targetId);
      if(target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if(navMenu.classList.contains('show')) navMenu.classList.remove('show');
      }
    });
  });