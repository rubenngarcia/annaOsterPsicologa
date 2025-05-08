document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.flag').forEach(flag => {
    flag.addEventListener('click', () => {
      const selectedLang = flag.getAttribute('data-lang');
      changeLanguage(selectedLang);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
});

function changeLanguage(lang) {
  fetch(`translations/${lang}.json`)
    .then(res => res.json())
    .then(translations => {
      for (const key in translations) {
        const el = document.getElementById(key);
        if (el) {
          // Si es un input, cambiar su placeholder
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.placeholder = translations[key];
          }
          // Si contiene un <img> o varios hijos, reemplazar solo el texto manteniendo los hijos
          else if (el.childNodes.length > 1) {
            for (let node of el.childNodes) {
              if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = translations[key];
                break;
              }
            }
          }
          // Si es texto plano
          else {
            el.textContent = translations[key];
          }
        }
      }
    })
    .catch(err => console.error("Error al cargar el idioma:", err));
}

window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = form.action;
      fetch(action, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          alert("Gracias por tu mensaje. Te responderé pronto.");
          form.reset();
        } else {
          alert("Ha ocurrido un error. Intenta más tarde.");
        }
      });
    });
  }
});
