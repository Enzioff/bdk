class Video {
    video;
    content;
    videoEl;
    playBtn;
    frame;
    
    constructor(video: Element) {
        this.video = video;
        this.content = this.video.querySelector('[data-video-content]')
        this.videoEl = this.video.querySelector('[data-video-video]')
        this.playBtn = this.content.querySelector('button')
        this.frame = this.videoEl.querySelector('iframe')
    
        this.init()
    }
    
    init() {
        this.playBtn.addEventListener('click', () => {
            this.content.classList.add('hidden');
            this.videoEl.classList.add('visible');
            const copy = this.frame.cloneNode(true) as HTMLElement;
            this.frame.remove();
            const symbol = copy.getAttribute('src').includes('?') ? '&' : '?';
            copy.setAttribute('src', `${copy.getAttribute('src')}${symbol}autoplay=1`);
            this.videoEl.appendChild(copy);
        })
    }
}

export default Video;
