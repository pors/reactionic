// Shorten the navbar after scrolling a little bit down
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar").addClass("top-nav-short");
    } else {
        $(".navbar").removeClass("top-nav-short");
    }
});

// On mobile, hide the avatar when expanding the navbar menu
$('#main-navbar').on('show.bs.collapse', function () {
  $(".navbar").addClass("top-nav-expanded");
});
$('#main-navbar').on('hidden.bs.collapse', function () {
  $(".navbar").removeClass("top-nav-expanded");
});

// Platform switcher, code from https://github.com/meteoric/meteoric.github.io/blob/master/index.html
var demoUrl = 'https://app.pors.net';
var $iframe = $('iframe.device-content');
$('[data-platform]').bind('click', function (event) {
  event.preventDefault();
  $('[data-platform]').removeClass('selected');
  $(this).addClass('selected');
  var $iframe = $('iframe.device-content');
  var platform = $(this).data('platform');
  $iframe.attr('src', demoUrl + '?platformOverride=' + platform);
});
$('[data-platform=iOS]').click();
