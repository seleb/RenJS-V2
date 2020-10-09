import RJSManagerInterface from './RJSManager';
import RJS from '../core/RJS';
export interface TextManagerInterface extends RJSManagerInterface {
}
export default class TextManager implements TextManagerInterface {
    private game;
    constructor(game: RJS);
    set(...args: any): void;
    show(text: any, title?: any, colour?: any): void;
    hide(): void;
    say(name: any, look: any, text: any): void;
}