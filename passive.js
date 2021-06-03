window.addEventListener('wheel', (event) => {
  console.log(event);
  event.preventDefault();
}, { passive: true });


