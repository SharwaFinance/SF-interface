
$(function() {
	initSwiper();
	initSwitchers();
	initMarquee();
	initReveal();
	initSmoothScrolling();

	initResponsive();
});


const initSwitchers = () => {
	const switchers = document.querySelectorAll(".switcher");
	switchers.forEach(activateSwitcher);
}
const activateSwitcher = (switcher) => {
	const _getActiveButtonAndContent = () => {
		const activeButton = buttons.find(button => button.classList.contains("_active"));
		const activeContent = contents.find(content => content.classList.contains("_active"));
		return [activeButton, activeContent];
	}
	const resetActiveEls = () => {
		const activeEls = _getActiveButtonAndContent();
		activeEls.forEach(el => el.classList.remove("_active"));
	}
	const setNewActiveEls = (newActiveEls) => {
		newActiveEls.forEach(el => el.classList.add("_active"));
	}
	
	const buttons = Array.from(switcher.querySelectorAll(".switcher__button"));
	const contents = Array.from(switcher.querySelectorAll(".switcher__content"));
	setNewActiveEls([buttons[0], contents[0]]);
	
	buttons.forEach((button, i) => {
		button.addEventListener("click", () => {
			resetActiveEls();
			const newActiveButton = button;
			const newActiveContent = contents[i];
			setNewActiveEls([newActiveButton, newActiveContent]);
		});
	});

	const navigationBtns = switcher.querySelectorAll(".switcher__navigation button");
	if (!navigationBtns.length) {
		return;
	}

	const prevBtn = navigationBtns[0];
	const nextBtn = navigationBtns[1];
	

	const getActiveId = () => {
		return buttons.findIndex(button => button.classList.contains("_active"));
	}

	const handleNavigation = (isNext) => {
		const activeId = getActiveId();
		resetActiveEls();
		let newActiveId = isNext ? activeId + 1 : activeId - 1;
		if (isNext && (newActiveId >= buttons.length)) {
			newActiveId = 0;
		}
		if (!isNext && (newActiveId < 0)) {
			newActiveId = buttons.length - 1;
		}
		const newActiveButton = buttons[newActiveId];
		const newActiveContent = contents[newActiveId];
		setNewActiveEls([newActiveButton, newActiveContent]);
	}
	prevBtn.addEventListener("click", () => {
		handleNavigation(false);
	});
	nextBtn.addEventListener("click", () => {
		handleNavigation(true);
	});
}

const initMarquee = () => {
	const config = {
		speed: 20,
		duplicated: true,
		startVisible: true,
		delayBeforeStart: 0,
	}
	
	$(".marquee:not(._right)").marquee(config);
	$(".marquee._right").marquee({
		...config,
		direction: "right"
	});
}

const initSwiper = () => {
	const _initReviewsSwiper = () => {
		const swiper = new Swiper(".reviews-block__swiper", {
			longSwipes: false,
			pagination: {
				el: ".reviews-block .swiper__pagination",
			},
			breakpoints: {
				1400: {
					slidesPerView: 4,
					enabled: false,
					spaceBetween:30,
				},
				992: {
					slidesPerView: 3,
					spaceBetween:30,
				},
				650: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				0: {
					slidesPerView: 1,
					enabled: true,
				}
			}
		})
	}

	const _initOurStorySwiper = () => {
		const swiper = new Swiper(".our-story-block__swiper", {
			mousewheel: true,
			followFinger: false,
			pagination: {
				el: ".our-story-block .swiper__pagination",
			},
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					origin: "top center",
					translate: [0, "5%", -200],
					rotate: [-100, 0, 0],
				},
				next: {
					origin: "bottom center",
					translate: [0, "-5%", -200],
					rotate: [100, 0, 0],
				},
			},
			breakpoints: {
				0: {
					enabled: false,
					slidesPerView: 2,
					direction: "vertical",
					pagination: false,
					effect: "slide",
					spaceBetween: 30,
				},
				768: {
					enabled: false,
					slidesPerView: 2,
					direction: "horizontal",
					pagination: false,
					effect: "slide",
					spaceBetween: 30,
				},
				1300: {
					enabled: true,
					slidesPerView: 1,
					direction: "vertical",
				}
			}
		})
	}
	
	/* const ourStoryBreakpoint = 1300;
	if ($(window).width() >= ourStoryBreakpoint) {
		_initOurStorySwiper();
	} */

	_initReviewsSwiper();
}

const initResponsive = () => {
	const faqBreakpoint = 992;

	if ($(window).width() < faqBreakpoint) {
		const faqSwitcher = document.querySelector(".faq-block .switcher");
		const contents = Array.from(faqSwitcher.querySelectorAll(".switcher__content"));
		const buttons = faqSwitcher.querySelectorAll(".switcher__button");

		contents.forEach((content, i) => {
			buttons[i].after(content);
		})
	};
}

const initReveal = () => {
	const reveal = () => {
		const reveals = document.querySelectorAll(".reveal");
		for (let i = 0; i < reveals.length; i++) {
			const windowHeight = window.innerHeight;
			const elementTop = reveals[i].getBoundingClientRect().top;
			const elementVisible = 150;
			if (elementTop < windowHeight - elementVisible) {
				reveals[i].classList.add("_active");
			} else {
				reveals[i].classList.remove("_active");
			}
		}
	}

	window.addEventListener("scroll", reveal);
}

const initSmoothScrolling = () => {
	let hashTagActive = "";
	$(".header__nav-item").on("click touchstart" , function (event) {
			if(hashTagActive != this.hash) {
					event.preventDefault();
					var dest = 0;
					if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
							dest = $(document).height() - $(window).height();
					} else {
							dest = $(this.hash).offset().top;
					}
					$('html,body').animate({
							scrollTop: dest
					}, 1000, 'swing');
					hashTagActive = this.hash;
			}
	});
}