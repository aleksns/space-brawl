export default class SoundChannel {
    constructor(audioFile, channels, volume) {
        this.channels = [];
        for (let i = 0; i < channels; i++) {
            let audio = new Audio(audioFile);
            audio.preload = "auto";
            audio.volume = volume;  
            this.channels.push(audio);
        }
        this.currentChannel = 0;
    } 

    play() {
        this.channels[this.currentChannel].play();
        this.currentChannel++;
        if (this.currentChannel >= this.channels.length) {
            this.currentChannel = 0;
        }
    }
}