class Visualiser {
    sound;
    audio
    svg
    svgWidth: number;
    svgHeight: number;
    audioContext: AudioContext;
    
    constructor(sound: Element) {
        this.sound = sound;
        
        this.audio = this.sound.querySelector('[data-sound-audio]');
        this.svg = this.sound.querySelector('[data-sound-waveform]');
        this.svgWidth = +this.svg.getAttribute('width');
        this.svgHeight = +this.svg.getAttribute('height');
        
        this.audioContext = new AudioContext();
        
        this.init()
    }
    
    init() {
        this.audio.addEventListener('loadeddata', () => {
            this.drawWaveform(this.audio, this.svg).then(r => {
                this.audioContext.close();
            });
        });
    }
    
    async drawWaveform (audioElement: Element, svgElement: Element) {
        const source = this.audioContext.createMediaElementSource(<HTMLMediaElement>audioElement);
        
        const analyser = this.audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(this.audioContext.destination);
        
        const response = await fetch(audioElement.querySelector('source').src);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        
        const rawData = audioBuffer.getChannelData(0);
        const sampleRate = Math.floor(rawData.length / this.svgWidth);
        
        const peaks = [];
        for (let i = 0; i < this.svgWidth; i++) {
            const start = i * sampleRate;
            const end = start + sampleRate;
            const segment = rawData.slice(start, end);
            // @ts-ignore
            const peak = Math.max(...segment.map(Math.abs));
            peaks.push(peak);
        }
        
        const maxPeak = Math.max(...peaks);
        const normalizedPeaks = peaks.map(p => (p / maxPeak) * (this.svgHeight / 2));
        
        let pathData = '';
        for (let i = 0; i < normalizedPeaks.length; i+=6) {
            const x = i;
            const y1 = (this.svgHeight / 2) - normalizedPeaks[i];
            const y2 = (this.svgHeight / 2) + normalizedPeaks[i];
            pathData += `M${x},${y1} L${x},${y2}` ;
        }
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', '#D3E0F4');
        path.setAttribute('stroke-width', '2')
        path.setAttribute('fill', 'none');
        svgElement.appendChild(path);
    }
}

export default Visualiser;
