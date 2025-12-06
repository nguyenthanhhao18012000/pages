jQuery(document).ready(function ($) {
  gsap.registerPlugin(ScrollTrigger);

  const wrappers = gsap.utils.toArray(".solution-card");
  const cards = wrappers.map((w) => w);

  wrappers.forEach((wrapper, i) => {
    let scale = 1;
    let opacity = 1;

    if (i !== wrappers.length - 1) {
      scale = 0.9 + 0.025 * i;
      opacity = 0.5;
    }
    gsap.to(cards[i], {
      scale: scale,
      opacity: opacity,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top " + (60 + 10 * i),
        end: "bottom 656",
        endTrigger: ".home-solution__content",
        scrub: true,
        pin: wrapper,
        pinSpacing: false,
        id: "card-" + (i + 1),
        // markers: true,
      },
    });
  });
});
