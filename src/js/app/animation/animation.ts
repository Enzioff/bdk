import gsap from "gsap"
import SplitText from 'gsap/SplitText'
import ScrollTrigger from "gsap/ScrollTrigger"
import CustomEase from "gsap/CustomEase"
import {breakPointsValues, Direction} from "../../types/types";

class Animation {
    matchMediaDesktop;
    matchMediaMobile;
    windowWidth;
    windowHeight;
    mm;
    breakPoints;
    
    constructor() {
        this.matchMediaDesktop = matchMedia('(min-width: 1300px)');
        this.matchMediaMobile = matchMedia('(max-width: 1299px)');
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        
        this.mm = gsap.matchMedia()
        this.breakPoints = {
            desktop: breakPointsValues.DESKTOP,
            mobileMax: breakPointsValues.MOBILE_MAX,
            mobile: breakPointsValues.MOBILE,
        }
        
        this.init()
    }
    
    init() {
        this.register()
        
        this.animationTitle()
        this.animationIn()
        this.animationInSimple()
        this.animationOpacity()
        this.animationCards()
        this.animationSlides()
        this.animationCollapse()
        this.animationHeader()
    }
    
    register() {
        gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase)
    }
    
    animationTitle = () => {
        const titles = document.querySelectorAll('.trigger-title')
        
        titles.forEach(title => {
            const splittedText = new SplitText(title);
            
            gsap.from(splittedText.chars, {
                scrollTrigger: {
                    trigger: title,
                },
                opacity: 0,
                duration: 0.05,
                stagger: 0.05,
                ease: 'none',
                onComplete: () => {
                    splittedText.revert()
                }
            })
        })
    }
    
    animationIn = () => {
        const elements = document.querySelectorAll('.trigger-in');
        
        elements.forEach(element => {
            const delay = element.getAttribute('data-delay');
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                },
                y: 100,
                scale: 0.6,
                width: 40+ '%',
                duration: 0.5,
                opacity: 0,
                delay: delay ? delay : null,
            })
        })
    }
    
    animationInSimple = () => {
        const elements = document.querySelectorAll('.trigger-in-simple');
        
        elements.forEach(element => {
            const delay = element.getAttribute('data-delay');
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                },
                scale: 0.6,
                duration: 0.5,
                opacity: 0,
                delay: delay ? delay : null,
            })
        })
    }
    
    animationOpacity = () => {
        const elements = document.querySelectorAll('.trigger-opacity');
        
        elements.forEach(element => {
            const delay = element.getAttribute('data-delay');
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                },
                duration: 1,
                opacity: 0,
                delay: delay ? delay : null,
            })
        })
    }
    
    animationCards = () => {
        const elements = document.querySelectorAll('.trigger-cards');
        
        elements.forEach(element => {
            const delay = element.getAttribute('data-delay');
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                },
                y: 50,
                duration: 1,
                stagger: 1,
                opacity: 0,
                delay: delay ? delay : null,
            })
        })
    }
    
    animationSlides = () => {
        const elements = document.querySelectorAll('.trigger-slides');
        
        elements.forEach(element => {
            const innerEls = element.querySelectorAll('div')
            
            gsap.from(innerEls, {
                scrollTrigger: {
                    trigger: innerEls,
                },
                y: 150,
                duration: 1,
                stagger: 0.2,
                opacity: 0,
                ease: "power4.out",
            })
        })
    }
    
    animationCollapse = () => {
        const elements = document.querySelectorAll('.trigger-collapse');
        
        elements.forEach(element => {
            const direction = element.getAttribute('data-direction');
            
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                },
                xPercent: direction === Direction.LEFT ? -100 : 100,
                duration: 1,
                ease: "power4.out",
            })
        })
    }
    
    animationHeader = () => {
        const header = document.querySelector('.trigger-header') as HTMLElement;
        
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= 50) {
                header.classList.add('fixed')
            } else {
                header.classList.remove('fixed')
            }
            
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (window.pageYOffset >= 1000) {
                if (currentScroll > lastScrollTop) {
                    gsap.to(header, {
                        yPercent: -100,
                        duration: 0.3,
                        ease: 'none'
                    })
                } else if (currentScroll < lastScrollTop) {
                    gsap.to(header, {
                        yPercent: 0,
                        duration: 0.3,
                        ease: 'none'
                    })
                }
            } else {
                gsap.to(header, {
                    yPercent: 0,
                    duration: 0.1,
                    ease: 'none'
                })
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Убедимся, что значение не отрицательное
        })
    }
}

export default Animation;
