jQuery(document).ready(function ($) {
  $('.gallery__wrap').slick({
    slidesToShow: 4,
    autoplay: true,
    variableWidth: true,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    speed: 500,
    useTransform: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });


  // add id to tag a js-referrer
  const js_referrer = document.querySelector('#js-referrer');
  const expectedReferral = "https://bludelego.it";
  const referringURL = document.referrer;
  console.log(referringURL, "referringURL");

  if (referringURL.indexOf(expectedReferral) !== -1) {
    const img = `<img src="https://bludelego.it/downloads/color-bludelego.svg" alt="">`;
    js_referrer.innerHTML = '';
    js_referrer.setAttribute('href', expectedReferral);
    js_referrer.insertAdjacentHTML('afterbegin', img);
  }


  const gallery = document.querySelector(".gallery-grid__wrap");
  if (gallery) {
    $(".gallery-grid__item").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
      removalDelay: 300,
      mainClass: "mfp-fade mfp-with-zoom",
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function (openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  }
});
