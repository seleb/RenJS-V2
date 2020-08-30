import RJSManagerInterface from './RJSManager';
import RJS from '../RJS';

export interface AudioManagerInterface extends RJSManagerInterface {
    play(key: string, type: string, looped: boolean, transition: string): void;
    stop (type: string, transition: string): void;
    playSFX (key: string): void;
    isMusic(actor): boolean;
    isSfx(actor): boolean;
    init(cb): void;
    mute(): void;
    changeVolume(type, volume): void;
    stopAll(): void;
    current: {
        bgm: any;
        bgs: any;
    };
    audioLoaded: boolean;
    sfx: object;
    musicList: object;
}

export default class AudioManager implements AudioManagerInterface {
    current: { bgm: any; bgs: any };
    audioLoaded: boolean;
    musicList: object;
    sfx: object;
    private game: RJS

    constructor(game: RJS) {
        this.game = game
    }

    play (key,type,looped,transition): void {
        if (looped === undefined){
            looped = true;
        }
        const oldAudio = this.musicList[this.current[type]];
        this.current[type] = key;
        if (!this.game.defaultValues.settings.muted && this.current[type]) {
            if (transition === 'FADE') {
                this.musicList[key].fadeIn(1500,looped);
                if (oldAudio) {
                    oldAudio.fadeOut(1500);
                }
            } else {
                if (oldAudio) {
                    oldAudio.stop();
                }
                this.musicList[key].play('',0,1,looped);
            }
        }
    }

    stop(type: string, transition: string): void {
        if (!this.current[type]){
            return;
        }
        const oldAudio = this.musicList[this.current[type]];
        this.current[type] = null;
        if (!this.game.defaultValues.settings.muted) {
            if (transition === 'FADE') {
                oldAudio.fadeOut(1500);
            } else {
                oldAudio.stop();
            }
        }
    }

    playSFX(key): void {
        if (this.audioLoaded && !this.game.defaultValues.settings.muted){
            // debugger;
            this.sfx[key].volume = this.game.defaultValues.settings.sfxv;
            this.sfx[key].play();

        }
    }

    set (current): void {
        if (current.bgm){
            this.play(current.bgm,'bgm',true,'FADE');
        }
        if (current.bgs){
            this.play(current.bgs,'bgs',true,'FADE');
        }

    }

    changeVolume(type, volume): void {
        this.game.sound.volume = volume;
    }

    init(cb): void {
        const audioList = [];
        if (this.game.RJS.setup.music){
            Object.keys(this.game.RJS.setup.music).forEach(key => {
                this.musicList[key] = this.game.add.audio(key);
                audioList.push(this.musicList[key]);
            },this);
        }
        if (this.game.RJS.setup.sfx){
            Object.keys(this.game.RJS.setup.sfx).forEach(key => {
                this.sfx[key] = this.game.add.audio(key);
                audioList.push(this.sfx[key]);
            });
        }

        this.game.sound.setDecodedCallback(audioList, () => {
            this.audioLoaded = true;
            cb();
        });
    }

    isMusic(actor): boolean {
        return actor in this.musicList
    }

    isSfx(actor): boolean {
        return actor in this.sfx
    }

    mute(): void {
        if (this.game.defaultValues.settings.muted){
            if (this.current.bgm) {
                this.musicList[this.current.bgm].play('',0,1,true);
            }
            if (this.current.bgs) {
                this.musicList[this.current.bgs].play('',0,1,true);
            }
        } else {
            if (this.current.bgm) {
                this.musicList[this.current.bgm].stop();
            }
            if (this.current.bgs) {
                this.musicList[this.current.bgs].stop();
            }
        }
        this.game.defaultValues.settings.muted = !this.game.defaultValues.settings.muted;
    }

    stopAll(): void {
        this.stop('bgs','FADE');
        this.stop('bgm','FADE');
    }


}