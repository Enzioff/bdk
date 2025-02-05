class Faq {
    element;
    toggleEl;
    
    constructor(element: Element) {
        this.element = element;
        this.toggleEl = this.element.querySelector('.faq__icon');
        
        this.init();
    }
    
    init() {
        this.toggleEl.addEventListener('click', () => {
            this.element.classList.toggle('active');
        })
    }
}

export default Faq;
