let check = false;
console.log(window.innerWidth)
if(window.innerWidth > 800){



// Check if the body has the 'main' class
if (document.body.classList.contains('main')) {
  // Add event listeners to child elements only
  document.body.addEventListener('mouseover', (event) => {
    if (event.target !== document.body) {
      // Add hover-active only if hovering over a child element
      document.body.classList.add('hover-active');
    }
  });


  document.body.addEventListener('mouseout', (event) => {
    if (event.target !== document.body) {
      // Remove hover-active when leaving a child element
      document.body.classList.remove('hover-active');
    }
  });
}
}
