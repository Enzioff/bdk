class Tabs {
    container;
    headerEls;
    contentEls;
    dropdown;
    
    constructor(container: Element) {
        this.container = container;
        this.headerEls = container.querySelectorAll('[data-tabs-head]');
        this.contentEls = container.querySelectorAll('[data-tabs-element]');
        this.dropdown = this.container.querySelector('.dropdown');
        
        this.init()
    }
    
    init() {
        this.headerEls.forEach((headerEl, idx) => {
            headerEl.addEventListener('click', () => {
                this.headerEls.forEach(temp => {
                    temp.classList.remove('active')
                    temp.classList.remove('clean')
                });
                this.contentEls.forEach(temp => temp.classList.remove('active'));
                headerEl.classList.add('active');
                if (this.headerEls.item(idx - 1)) {
                    this.headerEls.item(idx - 1).classList.add('clean');
                }
                
                if (this.contentEls.item(idx)) {
                    this.contentEls.item(idx).classList.add('active');
                }
                
                const dropdownItems = this.dropdown.querySelectorAll('.dropdown__item');
                const currentDropdownEl = dropdownItems.item(idx) as HTMLElement;
                currentDropdownEl.click()
            })
        })
        
        this.initDropdown()
    }
    
    initDropdown = () => {
        const header = this.dropdown.querySelector('.dropdown__header');
        const headerTitle = header.querySelector('span');
        const dropdownItems = this.dropdown.querySelectorAll('.dropdown__item');
        
        header.addEventListener('click', () => {
            this.dropdown.classList.toggle('active');
        })
        
        dropdownItems.forEach((el, idx) => {
            el.addEventListener('click', () => {
                const currentHeadEl = this.headerEls.item(idx) as HTMLElement;
                currentHeadEl.click()
                this.dropdown.classList.remove('active');
                headerTitle.textContent = el.textContent;
            })
        })
    }
}

export default Tabs;
