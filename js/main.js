
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuJChmdW5jdGlvbigpIHtcblx0aW5pdFN3aXBlcigpO1xuXHRpbml0U3dpdGNoZXJzKCk7XG5cdGluaXRNYXJxdWVlKCk7XG5cdGluaXRSZXZlYWwoKTtcblx0aW5pdFNtb290aFNjcm9sbGluZygpO1xuXG5cdGluaXRSZXNwb25zaXZlKCk7XG59KTtcblxuXG5jb25zdCBpbml0U3dpdGNoZXJzID0gKCkgPT4ge1xuXHRjb25zdCBzd2l0Y2hlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN3aXRjaGVyXCIpO1xuXHRzd2l0Y2hlcnMuZm9yRWFjaChhY3RpdmF0ZVN3aXRjaGVyKTtcbn1cbmNvbnN0IGFjdGl2YXRlU3dpdGNoZXIgPSAoc3dpdGNoZXIpID0+IHtcblx0Y29uc3QgX2dldEFjdGl2ZUJ1dHRvbkFuZENvbnRlbnQgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYWN0aXZlQnV0dG9uID0gYnV0dG9ucy5maW5kKGJ1dHRvbiA9PiBidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2FjdGl2ZVwiKSk7XG5cdFx0Y29uc3QgYWN0aXZlQ29udGVudCA9IGNvbnRlbnRzLmZpbmQoY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5jb250YWlucyhcIl9hY3RpdmVcIikpO1xuXHRcdHJldHVybiBbYWN0aXZlQnV0dG9uLCBhY3RpdmVDb250ZW50XTtcblx0fVxuXHRjb25zdCByZXNldEFjdGl2ZUVscyA9ICgpID0+IHtcblx0XHRjb25zdCBhY3RpdmVFbHMgPSBfZ2V0QWN0aXZlQnV0dG9uQW5kQ29udGVudCgpO1xuXHRcdGFjdGl2ZUVscy5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpKTtcblx0fVxuXHRjb25zdCBzZXROZXdBY3RpdmVFbHMgPSAobmV3QWN0aXZlRWxzKSA9PiB7XG5cdFx0bmV3QWN0aXZlRWxzLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIikpO1xuXHR9XG5cdFxuXHRjb25zdCBidXR0b25zID0gQXJyYXkuZnJvbShzd2l0Y2hlci5xdWVyeVNlbGVjdG9yQWxsKFwiLnN3aXRjaGVyX19idXR0b25cIikpO1xuXHRjb25zdCBjb250ZW50cyA9IEFycmF5LmZyb20oc3dpdGNoZXIucXVlcnlTZWxlY3RvckFsbChcIi5zd2l0Y2hlcl9fY29udGVudFwiKSk7XG5cdHNldE5ld0FjdGl2ZUVscyhbYnV0dG9uc1swXSwgY29udGVudHNbMF1dKTtcblx0XG5cdGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpKSA9PiB7XG5cdFx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRyZXNldEFjdGl2ZUVscygpO1xuXHRcdFx0Y29uc3QgbmV3QWN0aXZlQnV0dG9uID0gYnV0dG9uO1xuXHRcdFx0Y29uc3QgbmV3QWN0aXZlQ29udGVudCA9IGNvbnRlbnRzW2ldO1xuXHRcdFx0c2V0TmV3QWN0aXZlRWxzKFtuZXdBY3RpdmVCdXR0b24sIG5ld0FjdGl2ZUNvbnRlbnRdKTtcblx0XHR9KTtcblx0fSk7XG5cblx0Y29uc3QgbmF2aWdhdGlvbkJ0bnMgPSBzd2l0Y2hlci5xdWVyeVNlbGVjdG9yQWxsKFwiLnN3aXRjaGVyX19uYXZpZ2F0aW9uIGJ1dHRvblwiKTtcblx0aWYgKCFuYXZpZ2F0aW9uQnRucy5sZW5ndGgpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBwcmV2QnRuID0gbmF2aWdhdGlvbkJ0bnNbMF07XG5cdGNvbnN0IG5leHRCdG4gPSBuYXZpZ2F0aW9uQnRuc1sxXTtcblx0XG5cblx0Y29uc3QgZ2V0QWN0aXZlSWQgPSAoKSA9PiB7XG5cdFx0cmV0dXJuIGJ1dHRvbnMuZmluZEluZGV4KGJ1dHRvbiA9PiBidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2FjdGl2ZVwiKSk7XG5cdH1cblxuXHRjb25zdCBoYW5kbGVOYXZpZ2F0aW9uID0gKGlzTmV4dCkgPT4ge1xuXHRcdGNvbnN0IGFjdGl2ZUlkID0gZ2V0QWN0aXZlSWQoKTtcblx0XHRyZXNldEFjdGl2ZUVscygpO1xuXHRcdGxldCBuZXdBY3RpdmVJZCA9IGlzTmV4dCA/IGFjdGl2ZUlkICsgMSA6IGFjdGl2ZUlkIC0gMTtcblx0XHRpZiAoaXNOZXh0ICYmIChuZXdBY3RpdmVJZCA+PSBidXR0b25zLmxlbmd0aCkpIHtcblx0XHRcdG5ld0FjdGl2ZUlkID0gMDtcblx0XHR9XG5cdFx0aWYgKCFpc05leHQgJiYgKG5ld0FjdGl2ZUlkIDwgMCkpIHtcblx0XHRcdG5ld0FjdGl2ZUlkID0gYnV0dG9ucy5sZW5ndGggLSAxO1xuXHRcdH1cblx0XHRjb25zdCBuZXdBY3RpdmVCdXR0b24gPSBidXR0b25zW25ld0FjdGl2ZUlkXTtcblx0XHRjb25zdCBuZXdBY3RpdmVDb250ZW50ID0gY29udGVudHNbbmV3QWN0aXZlSWRdO1xuXHRcdHNldE5ld0FjdGl2ZUVscyhbbmV3QWN0aXZlQnV0dG9uLCBuZXdBY3RpdmVDb250ZW50XSk7XG5cdH1cblx0cHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGhhbmRsZU5hdmlnYXRpb24oZmFsc2UpO1xuXHR9KTtcblx0bmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGhhbmRsZU5hdmlnYXRpb24odHJ1ZSk7XG5cdH0pO1xufVxuXG5jb25zdCBpbml0TWFycXVlZSA9ICgpID0+IHtcblx0Y29uc3QgY29uZmlnID0ge1xuXHRcdHNwZWVkOiAyMCxcblx0XHRkdXBsaWNhdGVkOiB0cnVlLFxuXHRcdHN0YXJ0VmlzaWJsZTogdHJ1ZSxcblx0XHRkZWxheUJlZm9yZVN0YXJ0OiAwLFxuXHR9XG5cdFxuXHQkKFwiLm1hcnF1ZWU6bm90KC5fcmlnaHQpXCIpLm1hcnF1ZWUoY29uZmlnKTtcblx0JChcIi5tYXJxdWVlLl9yaWdodFwiKS5tYXJxdWVlKHtcblx0XHQuLi5jb25maWcsXG5cdFx0ZGlyZWN0aW9uOiBcInJpZ2h0XCJcblx0fSk7XG59XG5cbmNvbnN0IGluaXRTd2lwZXIgPSAoKSA9PiB7XG5cdGNvbnN0IF9pbml0UmV2aWV3c1N3aXBlciA9ICgpID0+IHtcblx0XHRjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLnJldmlld3MtYmxvY2tfX3N3aXBlclwiLCB7XG5cdFx0XHRsb25nU3dpcGVzOiBmYWxzZSxcblx0XHRcdHBhZ2luYXRpb246IHtcblx0XHRcdFx0ZWw6IFwiLnJldmlld3MtYmxvY2sgLnN3aXBlcl9fcGFnaW5hdGlvblwiLFxuXHRcdFx0fSxcblx0XHRcdGJyZWFrcG9pbnRzOiB7XG5cdFx0XHRcdDE0MDA6IHtcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA0LFxuXHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjozMCxcblx0XHRcdFx0fSxcblx0XHRcdFx0OTkyOiB7XG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46MzAsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDY1MDoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcblx0XHRcdFx0fSxcblx0XHRcdFx0MDoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRjb25zdCBfaW5pdE91clN0b3J5U3dpcGVyID0gKCkgPT4ge1xuXHRcdGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoXCIub3VyLXN0b3J5LWJsb2NrX19zd2lwZXJcIiwge1xuXHRcdFx0bW91c2V3aGVlbDogdHJ1ZSxcblx0XHRcdGZvbGxvd0ZpbmdlcjogZmFsc2UsXG5cdFx0XHRwYWdpbmF0aW9uOiB7XG5cdFx0XHRcdGVsOiBcIi5vdXItc3RvcnktYmxvY2sgLnN3aXBlcl9fcGFnaW5hdGlvblwiLFxuXHRcdFx0fSxcblx0XHRcdGVmZmVjdDogXCJjcmVhdGl2ZVwiLFxuXHRcdFx0Y3JlYXRpdmVFZmZlY3Q6IHtcblx0XHRcdFx0cHJldjoge1xuXHRcdFx0XHRcdHNoYWRvdzogdHJ1ZSxcblx0XHRcdFx0XHRvcmlnaW46IFwidG9wIGNlbnRlclwiLFxuXHRcdFx0XHRcdHRyYW5zbGF0ZTogWzAsIFwiNSVcIiwgLTIwMF0sXG5cdFx0XHRcdFx0cm90YXRlOiBbLTEwMCwgMCwgMF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG5leHQ6IHtcblx0XHRcdFx0XHRvcmlnaW46IFwiYm90dG9tIGNlbnRlclwiLFxuXHRcdFx0XHRcdHRyYW5zbGF0ZTogWzAsIFwiLTUlXCIsIC0yMDBdLFxuXHRcdFx0XHRcdHJvdGF0ZTogWzEwMCwgMCwgMF0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdFx0MDoge1xuXHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0XHRcdFx0ZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXG5cdFx0XHRcdFx0cGFnaW5hdGlvbjogZmFsc2UsXG5cdFx0XHRcdFx0ZWZmZWN0OiBcInNsaWRlXCIsXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAzMCxcblx0XHRcdFx0fSxcblx0XHRcdFx0NzY4OiB7XG5cdFx0XHRcdFx0ZW5hYmxlZDogZmFsc2UsXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcblx0XHRcdFx0XHRkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuXHRcdFx0XHRcdHBhZ2luYXRpb246IGZhbHNlLFxuXHRcdFx0XHRcdGVmZmVjdDogXCJzbGlkZVwiLFxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMzAsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDEzMDA6IHtcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHRcdFx0ZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cdFxuXHQvKiBjb25zdCBvdXJTdG9yeUJyZWFrcG9pbnQgPSAxMzAwO1xuXHRpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gb3VyU3RvcnlCcmVha3BvaW50KSB7XG5cdFx0X2luaXRPdXJTdG9yeVN3aXBlcigpO1xuXHR9ICovXG5cblx0X2luaXRSZXZpZXdzU3dpcGVyKCk7XG59XG5cbmNvbnN0IGluaXRSZXNwb25zaXZlID0gKCkgPT4ge1xuXHRjb25zdCBmYXFCcmVha3BvaW50ID0gOTkyO1xuXG5cdGlmICgkKHdpbmRvdykud2lkdGgoKSA8IGZhcUJyZWFrcG9pbnQpIHtcblx0XHRjb25zdCBmYXFTd2l0Y2hlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmFxLWJsb2NrIC5zd2l0Y2hlclwiKTtcblx0XHRjb25zdCBjb250ZW50cyA9IEFycmF5LmZyb20oZmFxU3dpdGNoZXIucXVlcnlTZWxlY3RvckFsbChcIi5zd2l0Y2hlcl9fY29udGVudFwiKSk7XG5cdFx0Y29uc3QgYnV0dG9ucyA9IGZhcVN3aXRjaGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3dpdGNoZXJfX2J1dHRvblwiKTtcblxuXHRcdGNvbnRlbnRzLmZvckVhY2goKGNvbnRlbnQsIGkpID0+IHtcblx0XHRcdGJ1dHRvbnNbaV0uYWZ0ZXIoY29udGVudCk7XG5cdFx0fSlcblx0fTtcbn1cblxuY29uc3QgaW5pdFJldmVhbCA9ICgpID0+IHtcblx0Y29uc3QgcmV2ZWFsID0gKCkgPT4ge1xuXHRcdGNvbnN0IHJldmVhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJldmVhbFwiKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJldmVhbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdGNvbnN0IGVsZW1lbnRUb3AgPSByZXZlYWxzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblx0XHRcdGNvbnN0IGVsZW1lbnRWaXNpYmxlID0gMTUwO1xuXHRcdFx0aWYgKGVsZW1lbnRUb3AgPCB3aW5kb3dIZWlnaHQgLSBlbGVtZW50VmlzaWJsZSkge1xuXHRcdFx0XHRyZXZlYWxzW2ldLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV2ZWFsc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCByZXZlYWwpO1xufVxuXG5jb25zdCBpbml0U21vb3RoU2Nyb2xsaW5nID0gKCkgPT4ge1xuXHRsZXQgaGFzaFRhZ0FjdGl2ZSA9IFwiXCI7XG5cdCQoXCIuaGVhZGVyX19uYXYtaXRlbVwiKS5vbihcImNsaWNrIHRvdWNoc3RhcnRcIiAsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0aWYoaGFzaFRhZ0FjdGl2ZSAhPSB0aGlzLmhhc2gpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHZhciBkZXN0ID0gMDtcblx0XHRcdFx0XHRpZiAoJCh0aGlzLmhhc2gpLm9mZnNldCgpLnRvcCA+ICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gJCh3aW5kb3cpLmhlaWdodCgpKSB7XG5cdFx0XHRcdFx0XHRcdGRlc3QgPSAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRkZXN0ID0gJCh0aGlzLmhhc2gpLm9mZnNldCgpLnRvcDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0XHRcdHNjcm9sbFRvcDogZGVzdFxuXHRcdFx0XHRcdH0sIDEwMDAsICdzd2luZycpO1xuXHRcdFx0XHRcdGhhc2hUYWdBY3RpdmUgPSB0aGlzLmhhc2g7XG5cdFx0XHR9XG5cdH0pO1xufSJdLCJmaWxlIjoibWFpbi5qcyJ9