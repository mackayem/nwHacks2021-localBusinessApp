// This creates a slide effect down to content
$('a[href$="-section"]').on('click', function(event) {
  event.preventDefault();
  $('html, body').animate( {
    scrollTop: $($(this).attr('href')).offset().top
  }, 1000, 'swing');
});
