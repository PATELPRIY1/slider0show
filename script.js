$(document).ready(function () {
  const $slider = $('.hero-slider-content');
  const $progressBar = $('.progress-bar');
  const slideDuration = 6000; // Match autoplaySpeed

  // Init slick
  $slider.on('init', function () {
    startProgressBar();
  });

  $slider.on('beforeChange', function () {
    resetProgressBar();
  });

  $slider.on('afterChange', function () {
    startProgressBar();
  });

  $slider.slick({
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: slideDuration,
    arrows: false,
    dots: false
  });

  function startProgressBar() {
    $progressBar.css({
      width: '0%',
      transition: 'none'
    });

    setTimeout(() => {
      $progressBar.css({
        width: '100%',
        transition: `width ${slideDuration}ms linear`
      });
    }, 50);
  }

  function resetProgressBar() {
    $progressBar.css({
      width: '0%',
      transition: 'none'
    });
  }
});
