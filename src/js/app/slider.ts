import Swiper from "swiper";
import {Autoplay, EffectCoverflow, Navigation, Pagination, Thumbs} from "swiper/modules";

enum PaginationType {
    BULLETS = "bullets",
    PROGRESS = "progress",
}

class Slider {
    el;
    sliderType;
    buttonPrev;
    buttonNext;
    slidesCount;
    pagination;
    desktopOnly;
    mobileOnly;
    media;
    isAuto;
    paginationType;
    
    constructor(el: Element) {
        this.el = el;
        this.sliderType = this.el.getAttribute('data-slider');
        this.slidesCount = this.el.getAttribute('data-slides')
        this.isAuto = this.el.hasAttribute('data-auto');
        this.paginationType = this.el.getAttribute('data-pagination');
        
        this.buttonPrev = this.el.querySelector('.swiper-btn-prev');
        this.buttonNext = this.el.querySelector('.swiper-btn-next');
        this.pagination = this.el.querySelector('.swiper-pagination');
        
        this.media = matchMedia('(max-width: 1199px)');
        this.desktopOnly = this.el.hasAttribute('data-desktop-only');
        this.mobileOnly = this.el.hasAttribute('data-mobile-only');
        
        this.init();
    }
    
    init() {
        switch (this.sliderType) {
        case 'default':
            this.initDefaultSlider();
            break;
        case 'photos':
            this.initPhotosSlider();
            break;
        case 'thumbs':
            this.initThumbsSlider();
            break;
        case 'infinite':
            this.initInfiniteSlider();
            break;
        case 'autoplay':
            this.initAutoSlider();
            break;
        case 'slides':
            this.initSlidesSlider();
            break;
        case 'people':
            this.initPeopleSlider();
            break;
        }
    }
    
    initDefaultSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination],
            slidesPerView: 1,
            spaceBetween: 20,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'swiper-btn--disabled'
            },
            pagination: {
                el: '.swiper-pagination',
                type: this.paginationType === PaginationType.PROGRESS ? 'progressbar' : 'bullets',
            }
        })
    }
    
    initPhotosSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination],
            slidesPerView: 'auto',
            spaceBetween: 16,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'swiper-btn--disabled'
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                1199: {
                    spaceBetween: 30,
                }
            }
        })
    }
    
    initSlidesSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination],
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            spaceBetween: 16,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'swiper-btn--disabled'
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                1199: {
                    spaceBetween: 30,
                    slidesPerGroup: 2,
                }
            }
        })
    }
    
    initThumbsSlider() {
        const slider = this.el.querySelector('.swiper');
        const thumb = document.querySelector('[data-slider="thumb"]');
        const thumbSwiper = thumb.querySelector('.swiper');
        
        const thumbSlider = new Swiper(thumbSwiper, {
            slidesPerView: 3,
            spaceBetween: 8,
            breakpoints: {
                1199: {
                    spaceBetween: 30,
                }
            }
        })
        
        new Swiper(slider, {
            modules: [Navigation, Pagination, Thumbs],
            slidesPerView: 1,
            spaceBetween: 10,
            thumbs: {
                swiper: thumbSlider,
            },
        })
    }
    
    initInfiniteSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Autoplay],
            autoplay: {
                delay: 0,
            },
            speed: 3000,
            loop: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
            simulateTouch: false,
        })
    }
    
    initAutoSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Autoplay],
            autoplay: {
                delay: 3000,
            },
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            simulateTouch: false,
        })
    }
    
    initPeopleSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Autoplay, Navigation, Pagination],
            autoplay: {
                delay: 2000,
            },
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'swiper-btn--disabled'
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
        })
    }
}

export default Slider
