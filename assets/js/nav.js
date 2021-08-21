window.addEventListener("DOMContentLoaded", () => {
  /*
   * Make all elements of navigation clickable. This event
   * will make it easier for mobile devices users to use
   * navigation.
   */
  document.querySelectorAll('nav ul li a').forEach(elem => {
    elem.parentNode.addEventListener('click', () => {
      window.location.href = elem.href;
    });
  });
});
