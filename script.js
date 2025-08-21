document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- SCROLL ANIMATIONS ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // --- AUDIO PLAYER FUNCTIONALITY ---
    const players = document.querySelectorAll("audio");

    players.forEach((player, index) => {
      player.addEventListener("ended", () => {
        const next = players[index + 1];
        if (next) next.play();
      });
    });

});
// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // -------------------------------
    // 1️⃣ Google Analytics 4 Tracking
    // -------------------------------
    (function() {
        // Replace with your GA4 Measurement ID
        const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

        // Load GA script asynchronously
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);

        // Initialize GA after script loads
        gaScript.onload = function() {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID);
        };
    })();

    // -------------------------------
    // 2️⃣ JSON-LD Structured Data for SEO
    // -------------------------------
    const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "name": "Papa Dizzy Music",
        "url": "https://yourusername.github.io/",
        "sameAs": [
            "https://facebook.com/papadizzymusic",
            "https://instagram.com/papadizzymusic",
            "https://twitter.com/papadizzymusic"
        ],
        "album": [
            {"@type": "MusicAlbum", "name": "Mummy Na", "datePublished": "2019"},
            {"@type": "MusicAlbum", "name": "Latoona (My Love)", "datePublished": "2020"},
            {"@type": "MusicAlbum", "name": "Twero", "datePublished": "2022"},
            {"@type": "MusicAlbum", "name": "Cwinya Gak Ikome Rwot", "datePublished": "2023"},
            {"@type": "MusicAlbum", "name": "Timi", "datePublished": "2023"},
            {"@type": "MusicAlbum", "name": "Don’t Be a Stupid Father", "datePublished": "2024"},
            {"@type": "MusicAlbum", "name": "Nyom Pa Ayoo Ruth Hope X Denis Nyeko", "datePublished": "2025"}
        ]
    };

    // Create script element for JSON-LD and append to <head>
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.text = JSON.stringify(jsonLdData);
    document.head.appendChild(jsonLdScript);

});
document.querySelectorAll('.player').forEach(player => {
  const audio = player.querySelector('audio');
  const playBtn = player.querySelector('.play-btn');
  const icon = playBtn.querySelector('i');
  const progress = player.querySelector('.progress');
  const timeDisplay = player.querySelector('.time');

  // Format time in minutes:seconds
  function formatTime(sec){
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0'+s : s}`;
  }

  playBtn.addEventListener('click', () => {
    // Pause all other audios
    document.querySelectorAll('audio').forEach(a => {
      if(a !== audio) a.pause();
    });
    document.querySelectorAll('.play-btn i').forEach(i => {
      if(i !== icon) {
        i.classList.remove('fa-pause');
        i.classList.add('fa-play');
      }
    });

    if(audio.paused){
      audio.play();
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
    } else {
      audio.pause();
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    }
  });

  audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    timeDisplay.textContent = formatTime(audio.currentTime);
  });

  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  audio.addEventListener('ended', () => {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    progress.value = 0;
    timeDisplay.textContent = "0:00";
  });
});