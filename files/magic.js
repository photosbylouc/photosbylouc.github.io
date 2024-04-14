$(document).ready(function (e) {
  "true" !== sessionStorage.getItem("advertOnce")
    ? (e(".splash").show(),
      window.setTimeout(function () {
        e(".splash h1").css("opacity", "1");
      }, 1e3),
      window.setTimeout(function () {
        e(".splash p").css("opacity", "1");
      }, 2e3),
      window.setTimeout(function () {
        e(".splash").fadeOut(700);
      }, 4e3),
      sessionStorage.setItem("advertOnce", "true"))
    : e(".splash").hide();
});

$(document).ready(function () {
  var div = $(".project-content-inner").height();
  var win = $(".project-content").height();

  if (div > win) {
    $(".project-content-inner").addClass("full");
  }

  $(".hidden").delay(300).fadeOut(500);

  $(".popup").on("click", function (evt) {
    if ($(".slideout-overlay").is(":visible")) {
      $(".menu-list, .close-menu").stop().fadeToggle();
      $(".slideout-inner").stop().delay(600).fadeToggle();
      $(".slideout-overlay").stop().delay(600).fadeToggle(700);
    } else {
      $(".slideout-inner").stop().fadeToggle();
      $(".slideout-overlay").stop().fadeToggle();
      $(".menu-list, .close-menu").stop().delay(700).fadeToggle(700);
    }

    $("body").stop().toggleClass("noscroll");
    $(".social .v1").fadeOut(function () {
      $(".social .v2").fadeIn();
    });
  });

  $(".slideout-overlay, .close-menu").on("click", function (evt) {
    e.preventDefault();
    $(".menu-list, .close-menu").stop().fadeToggle();
    $(".slideout-inner").stop().delay(600).fadeToggle();
    $(".slideout-overlay").stop().delay(600).fadeToggle(700);

    $("body").stop().removeClass("noscroll");
    $(".social .v2").fadeOut(function () {
      $(".social .v1").fadeIn();
    });
  });

  $(".menu-secondary .menu-item > a").click(function (e) {
    $(".sub-menu").removeClass("open"),
      $(this).next().hasClass("open") || $(this).next().addClass("open"),
      e.stopPropagation();
  });

  $(".hamburger").on("click", function () {
    $(".slideout-inner").stop().fadeToggle();
    $(".menu-list").stop().fadeToggle();
    $(".single h1.site-title").stop().fadeToggle();
    $(".close-menu").stop().fadeToggle();
    $(".slideout-overlay").stop().delay(600).fadeToggle(700);
  });

  $(".view-all-btn").on("click", function () {
    $.fancybox.close();
    $(".view-all-btn").fadeOut(500);
  });

  $(".project-content .image img").on("click", function () {
    $(".view-all-btn").stop().delay(500).fadeToggle(500);
    $(".project-info").stop().delay(500).fadeIn();
  });

  $(".home .index .image img").on("click", function () {
    $(".home-close-thumbs").stop().fadeIn();
  });

  $(".home-close-thumbs").on("click", function () {
    $(".home-close-thumbs").stop().fadeOut();
    $.fancybox.close();
  });

  $(".menu-secondary #access .menu-item").hover(
    function () {
      $(this).addClass("show");
    },
    function () {
      $(this).removeClass("show");
    }
  );

  //Scroll Reveal
  window.sr = ScrollReveal();
  sr.reveal("img", { distance: "0px", scale: 0, duration: 1500, delay: 200 });

  function setWidth() {
    var one = document.getElementByClassName(".fancybox-navigation");
    var two = document.getElementByClassName(".fancybox-content");
    style = window.getComputedStyle(one);
    wdt = style.getPropertyValue("width");
    two.style.width = wdt;
  }

  $.fancybox.defaults.animationEffect = "fade";
  $.fancybox.defaults.transitionEffect = "fade";
  $.fancybox.defaults.hash = false;
  $.fancybox.defaults.wheel = false;

  //Fancybox - Home Gallery
  $('[data-fancybox="gallery"]').fancybox({
    autoDimensions: true,
    autoScale: true,
    autoCenter: true,
    thumbs: false,
    hash: false,
    loop: true,
    keyboard: true,
    toolbar: false,
    animationEffect: "fade",
    transitionEffect: "fade",
    arrows: false,
    clickContent: true,
    touch: false,
    nextClick: true,
    wheel: false,
    helpers: {
      title: {
        type: "inside",
        position: "top",
      },
      overlay: { locked: false },
    },
    mobile: {
      transitionEffect: "fade",
      animationEffect: "fade",
    },
  });

  //Fancybox - Single Post Gallery
  $('[data-fancybox="gallery-single"]').fancybox({
    autoDimensions: true,
    autoScale: true,
    autoCenter: true,
    thumbs: false,
    hash: false,
    loop: true,
    keyboard: true,
    toolbar: false,
    animationEffect: "fade",
    transitionEffect: "fade",
    arrows: false,
    clickContent: true,
    touch: false,
    nextClick: true,
    wheel: false,
    helpers: {
      title: {
        type: "inside",
        position: "top",
      },
      overlay: { locked: false },
    },
    mobile: {
      transitionEffect: "fade",
      animationEffect: "fade",
    },
  });
});

var body = document.body,
  overlay = document.querySelector(".slideout-overlay"),
  overlayBtts = document.querySelectorAll('button[class$="slideout-overlay"]');

[].forEach.call(overlayBtts, function (btt) {
  btt.addEventListener(
    "click",
    function () {
      /* Detect the button class name */
      var overlayOpen = this.className === ".popup, .hamburger";

      /* Toggle the aria-hidden state on the overlay and the 
        no-scroll class on the body */
      overlay.setAttribute("aria-hidden", !overlayOpen);
      body.classList.toggle("noscroll", overlayOpen);

      /* On some mobile browser when the overlay was previously
        opened and scrolled, if you open it again it doesn't 
        reset its scrollTop property */
      overlay.scrollTop = 0;
    },
    false
  );
});

$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    $.fancybox.close();
    $(".view-all-btn").fadeOut(500);
    $(".home-close-thumbs").fadeOut(500);
  }
});

$(function () {
  $("#menu-secondary-menu li:first-child > .sub-menu").addClass("open");
});

/*
$(function(){
  $('.index .image').hover(function() {
    $('.image').dequeue().stop().css("opacity", "1");
    $('.image:not(:hover)').dequeue().stop().css("opacity", "0.3");
  }, function() {
    $('.image').dequeue().stop().css("opacity", "1");
    $('.image:not(:hover)').dequeue().stop().css("opacity", "1");
  })
})
*/
