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
  const stateSelect    = document.getElementById('stateSelect').value;
  const state    = stateSelect === 'sOther'
    ? document.getElementById('stateOther').value 
    : stateSelect;
  const citySelect     = document.getElementById('citySelect').value;
  const city     = citySelect === 'cOther'
    ? document.getElementById('cityOther').value 
    : citySelect;
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
    'entry.1752961368': state === 'sOther'
      ? '__other_option__' : state,
    'entry.1752961368.other_option_response': state === 'sOther'
      ? document.getElementById('stateOther').value : '',
    'entry.624843853': city === 'cOther'
      ? '__other_option__' : city,
    'entry.624843853.other_option_response': city === 'cOther'
      ? document.getElementById('cityOther').value : '',
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

document.getElementById('citySelect').addEventListener('change', function() {
  const cityOther = document.getElementById('cityOther');
  cityOther.style.display = this.value === 'cOther' ? 'block' : 'none';
});

document.getElementById('stateSelect').addEventListener('change', function() {
  const stateOther = document.getElementById('stateOther');
  stateOther.style.display = this.value === 'sOther' ? 'block' : 'none';
});