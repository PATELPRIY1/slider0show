$(document).ready(function () {
  const $slider = $('.hero-slider-content');
  const $progressTop = $('.progress-bar');
  const $labels = $('.nav-label');
  const $progressBottom = $('.slider-progress-fill');
  const slideDuration = 6000;

  // Initialize slider
  $slider.slick({
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: slideDuration,
    arrows: false,
    dots: false,
    fade: true,
    cssEase: 'linear'
  });

  // === TOP PROGRESS BAR (blue at top) ===
  function startTopProgress() {
    $progressTop.css({ width: '0%', transition: 'none' });
    setTimeout(() => {
      $progressTop.css({
        width: '100%',
        transition: `width ${slideDuration}ms linear`
      });
    }, 50);
  }

  function resetTopProgress() {
    $progressTop.css({ width: '0%', transition: 'none' });
  }

  // === BOTTOM PROGRESS (NAVIGATION LINE) ===
  function updateBottomProgress(currentSlide) {
    const totalSlides = $slider.slick('getSlick').slideCount;
    const percentage = ((currentSlide + 1) / totalSlides) * 100;
    $progressBottom.css({
      width: `${percentage}%`,
      transition: 'width 0.6s ease-in-out'
    });
  }

  // === Label Active Update ===
  function updateNavLabels(currentSlide) {
    $labels.removeClass('active');
    $labels.eq(currentSlide).addClass('active');
  }

  // === SLIDER EVENTS ===
  $slider.on('init', function () {
    startTopProgress();
    updateBottomProgress(0);
    updateNavLabels(0);
  });

  $slider.on('beforeChange', function () {
    resetTopProgress();
  });

  $slider.on('afterChange', function (event, slick, currentSlide) {
    startTopProgress();
    updateBottomProgress(currentSlide);
    updateNavLabels(currentSlide);
  });

  // === Nav label click ===
  $labels.on('click', function () {
    const index = $(this).data('slide');
    $slider.slick('slickGoTo', index);
  });

  // === Pause on hover ===
  $slider.on('mouseenter', function () {
    $slider.slick('slickPause');
    $progressTop.css('transition', 'none');
  });

  $slider.on('mouseleave', function () {
    $slider.slick('slickPlay');
    $progressTop.css({
      width: '100%',
      transition: `width ${slideDuration}ms linear`
    });
  });

  // Trigger init manually
  $slider.slick('slickGoTo', 0);
});
