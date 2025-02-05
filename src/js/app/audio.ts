class Audio {
    container;
    playBtn;
    audioEl;
    playImg;
    pauseImg;
    svg;
    progress;
    audioContext: AudioContext;
    
    constructor(container: Element) {
        this.container = container;
        this.playBtn = this.container.querySelector('[data-sound-btn]')
        this.audioEl = this.container.querySelector('[data-sound-audio]') as HTMLAudioElement;
        this.svg = this.container.querySelector('[data-sound-waveform]');
        this.progress = this.container.querySelector('.sound__progress');
        
        this.playImg = 'icon-play'
        this.pauseImg = 'icon-pause'
        
        this.init()
    }
    
    init() {
        const svg = this.playBtn.querySelector('svg');
        
        this.playBtn.addEventListener('click', () => {
            this.audioContext = new (window.AudioContext);
            
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            if (this.audioEl.paused) {
                this.audioEl.play();
            } else {
                this.audioEl.pause();
            }
        })
        
        // Слушатели событий для обновления прогресса
        this.audioEl.addEventListener('timeupdate', this.updateProgress);
        
        this.audioEl.addEventListener('play', () => {
            if (svg) {
                const useEl = svg.querySelector('use');
                if (useEl) {
                    useEl.setAttribute('xlink:href', `${useEl.getAttribute('xlink:href').replace(this.playImg, this.pauseImg)}`);
                }
            }
        })
        
        this.audioEl.addEventListener('pause', () => {
            if (svg) {
                const useEl = svg.querySelector('use');
                if (useEl) {
                    useEl.setAttribute('xlink:href', `${useEl.getAttribute('xlink:href').replace(this.pauseImg, this.playImg)}`);
                }
            }
        })
        
        this.audioEl.addEventListener('ended', () => {
            if (svg) {
                const useEl = svg.querySelector('use');
                if (useEl) {
                    useEl.setAttribute('xlink:href', `${useEl.getAttribute('xlink:href').replace(this.pauseImg, this.playImg)}`);
                }
            }
        })
    }
    
    updateProgress =() => {
        const duration = this.audioEl.duration;
        const currentTime = this.audioEl.currentTime;
        
        if (!isNaN(duration)) {
            const progressWidth = (currentTime / duration) * this.svg.clientWidth;
            this.progress.setAttribute('style', `width:${progressWidth}px`);
        }
    }
}

export default Audio;
