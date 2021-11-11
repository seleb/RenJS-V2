import 'pixi';
import 'p2';
import { Game, Graphics } from 'phaser-ce';
import RJSControl from './RJSControl';
import BackgroundManager from '../managers/BackgroundManager';
import CharacterManager from '../managers/CharacterManager';
import AudioManager from '../managers/AudioManager';
import CGSManager from '../managers/CGSManager';
import TextManager from '../managers/TextManager';
import TweenManager from '../managers/TweenManager';
import LogicManager from '../managers/LogicManager';
import StoryManager from '../managers/StoryManager';
import Ambient from '../screen-effects/Ambient';
import Effects from '../screen-effects/Effects';
import Transition from '../screen-effects/Transition';
import RJSGUI from '../gui/RJSGUI';
import { RJSGameConfig, StoryConfig } from './RJSGameConfig';
import UserPreferences from './UserPreferences';
export default class RJS extends Game {
    gameStarted: boolean;
    control: RJSControl;
    xShots: any[];
    blackOverlay: Graphics;
    setup: any;
    story: object;
    guiSetup: any;
    gui: RJSGUI;
    tools: any;
    screenReady: boolean;
    pluginsRJS: any;
    addPlugin(name: string, cls: any): void;
    get renjsversion(): string;
    config: RJSGameConfig;
    userPreferences: UserPreferences;
    storyConfig: StoryConfig;
    textLog: any[];
    interruptAction: any;
    managers: {
        background?: BackgroundManager;
        character?: CharacterManager;
        audio: AudioManager;
        cgs?: CGSManager;
        text: TextManager;
        tween: TweenManager;
        logic: LogicManager;
        story: StoryManager;
    };
    screenEffects: {
        ambient: Ambient;
        effects: Effects;
        transition: Transition;
    };
    propertyRanges: {
        textSpeed: number[];
        autoSpeed: number[];
        bgmv: number[];
        sfxv: number[];
    };
    constructor(config: RJSGameConfig);
    launch(): void;
    setupScreen(): void;
    initStory(): Promise<void>;
    checkPlugins(signal: string, params?: any[]): Promise<void>;
    pause(keepGUI?: boolean): void;
    takeXShot(): void;
    unpause(): Promise<void>;
    endGame(): Promise<void>;
    start(initialVars?: {}): Promise<void>;
    skip(): void;
    auto(): void;
    save(slot?: any): Promise<void>;
    getSlotThumbnail(slot: any): string;
    loadSlot(slot: any): Promise<void>;
    waitForClick(callback?: any): void;
    waitTimeout(time: any, callback?: any): void;
    waitForClickOrTimeout(time: any, callback: any): void;
    onTap(pointer: any, doubleTap?: any): void;
    initInput(): void;
    lockClick(): void;
    resolveAction: () => void;
    onInterpretActions(): void;
}
