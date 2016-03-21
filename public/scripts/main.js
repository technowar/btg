$(document).on('ready', function(){
  var sidemenu = $('#sidemenu');

  console.log(sidemenu);
  $(window).on('scroll', function(e) {
    console.log($(window).scrollTop())
    if ($(window).scrollTop() > 147) {
      $('#sidemenu').addClass("fix-search");
    } else {
      $('#sidemenu').removeClass("fix-search");
    }
  });
});
