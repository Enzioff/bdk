import Slider from "./slider";
import {Fancybox} from "@fancyapps/ui";
import Mask from "./mask";
import MobileMenu from "./mobile-menu";
import Tabs from "./tabs";
import Video from "./video";
import Form from "./form";
import Visualiser from "./visualiser";
import Audio from "./audio";
import Faq from "./faq";
import Animation from "./animation/animation";

class App {
    constructor() {
        this.init();
    }
    
    init = () => {
        this.createSlider()
        this.createFancybox()
        this.createMask()
        this.createMobileMenu()
        this.createShowMore()
        this.createTabs()
        this.createVideo()
        this.createForm()
        this.createHoverPhotos()
        // this.createVisualiser()
        this.createAudioControl()
        this.createFaq()
        
        new Animation()
    }
    
    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }
    
    createFancybox = () => {
        const customCloseButton =
            `<button data-fancybox-close class="fancybox-btn" title="Закрыть">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L10 10M18 18L10 10M10 10L18 2L2 18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>`
        
        // @ts-ignore
        Fancybox.bind('[data-fancybox]', {
            defaultType: "inline",
            Toolbar: {
                enabled: false,
                items: false,
            },
            Carousel: {
                Navigation: {
                    nextTpl: '<svg class="swiper-button" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 55.918 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 49.0684 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 42.2188 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 35.3672 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 28.5195 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 21.668 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 49.0645 25.6514)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135285 42.2168 19.4258)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 42.2207 46.8232)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 48.4453 39.9736)" fill="#134AFF"/>\n' +
                        '</svg>\n',
                    prevTpl: '<svg class="swiper-button" style="transform: rotate(180deg)" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 55.918 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 49.0684 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 42.2188 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 35.3672 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 28.5195 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 21.668 32.501)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 49.0645 25.6514)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135285 42.2168 19.4258)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 42.2207 46.8232)" fill="#134AFF"/>\n' +
                        '<ellipse cx="2.80223" cy="2.80068" rx="2.80223" ry="2.80068" transform="matrix(0.000135198 1 -1 -0.000135183 48.4453 39.9736)" fill="#134AFF"/>\n' +
                        '</svg>\n',
                },
            },
            tpl: {
                closeButton: customCloseButton,
            },
        })
    }
    
    createMask = () => {
        new Mask();
    }
    
    createMobileMenu = () => {
        new MobileMenu()
    }
    
    createShowMore = () => {
        const showMoreBtn = document.querySelectorAll('[data-show-more]');
        if (!showMoreBtn) return
        
        showMoreBtn.forEach(el => {
            const textElement = el.querySelector('span')
            const innerText = textElement.textContent.trim();
            
            el.addEventListener('click', (evt) => {
                evt.preventDefault()
                const content = el.parentElement.querySelector('[data-content]');
                const textContent = el.parentElement.querySelector('[data-text-content]')
                if (content) {
                    content.classList.toggle('active')
                    if (content.classList.contains('active')) {
                        textElement.textContent = 'Свернуть'
                        el.classList.add('active')
                    } else {
                        textElement.textContent = innerText
                        el.classList.remove('active')
                    }
                }
                if (textContent) {
                    textContent.classList.toggle('text-visible')
                    if (textContent.classList.contains('text-visible')) {
                        textElement.textContent = 'Свернуть'
                        el.classList.add('active')
                    } else {
                        textElement.textContent = innerText
                        el.classList.remove('active')
                    }
                }
            })
        })
    }
    
    createTabs = () => {
        const tabs = document.querySelectorAll('[data-tabs]');
        if (!tabs) return
        
        tabs.forEach(tab => {
            new Tabs(tab)
        })
    }
    
    createVideo = () => {
        const videos = document.querySelectorAll('[data-video]');
        if (!videos) return
        
        videos.forEach(video => {
            new Video(video)
        })
    }
    
    createForm = () => {
        const forms = document.querySelectorAll('.form');
        if (!forms) return
        forms.forEach(form => {
            new Form(form)
        })
    }
    
    createHoverPhotos = () => {
        const photos = document.querySelectorAll('[data-photo]')
        if (!photos) return
        photos.forEach(photo => {
            photo.addEventListener('mouseover', (evt) => {
                photos.forEach(temp => temp.classList.remove('active'))
                photo.classList.add('active');
            })
        })
    }
    
    createVisualiser = () => {
        const sounds = document.querySelectorAll('[data-sound]');
        if (!sounds) return
        sounds.forEach(sound => {
            new Visualiser(sound)
        })
    }
    
    createAudioControl = () => {
        const audioBlocks = document.querySelectorAll('[data-sound-block]');
        
        if (!audioBlocks) return
        
        audioBlocks.forEach(audio => {
            new Audio(audio)
        })
    }
    
    createFaq = () => {
        const faqs = document.querySelectorAll('[data-faq]');
        if (!faqs) return
        faqs.forEach(faq => {
            new Faq(faq)
        })
    }
}

export {App};



