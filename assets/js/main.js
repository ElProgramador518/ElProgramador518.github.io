window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
  });
});
const revealEls = document.querySelectorAll('.fcard, .route-card, .stat');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeUp .6s ${i * 0.06}s ease both`;
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObs.observe(el));

function handleSubmit(e) {
  e.preventDefault();
  const email    = document.getElementById('email').value;
  const name     = document.getElementById('nameInput').value;
  const state    = document.getElementById('stateSelect').value;
  const city     = document.getElementById('citySelect').value;
  const heard    = document.getElementById('hearInput').value;
  if (!email && !state && !city) return;

  const btn = document.getElementById('joinBtn');
  btn.disabled = true;
  btn.textContent = 'Saving your spot...';

  // ── Paste your Google Form field IDs below ──
  const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeNJJoZ09gj3-I2NkNpqbo2iH5O36ax646pr1_nG5s2PhLnFA/formResponse';
  const params = new URLSearchParams({
    'entry.1943683663': email,
    'entry.1611552510': name,
    'entry.1752961368': state,
    'entry.624843853': city,
    'entry.1432154152': heard,
  });

  fetch(`${FORM_ACTION}?${params}`, { method:'POST', mode:'no-cors' })
    .finally(() => {
      btn.textContent = '✅  You\'re on the list!';
      showToast();
    });
}

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

