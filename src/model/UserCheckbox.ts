import { MapCkeckboxProps } from "../types/userCheckbox";

class MapCheckbox {

    activity: string = '';

    id: string | number = 0;

    key = '0';
    
    private __callbacks: Record<string, (props: any) => void> = {
        'changeActivity': ({ activity }) => this.activity = activity === this.id ?  'active' : '',
    };

    private __callbackNames: string[] = [];

    constructor(options: Partial<MapCkeckboxProps>) {
        const { activity, id, key } = options;
        if (activity) {
            this.activity = activity;
        };
        if (id) {
            this.id = id;
        }
        if (key) {
            this.key = key;
        }
    }

    addCallback(newCallback: Record<string, (props: any) => void>) {
        this.__callbacks = {
            ...this.__callbacks,
            ...newCallback,
        };
        this.__callbackNames = Object.keys(this.__callbacks);
        return this;
    }

    updateActivity = (newActivity?: number) => {
        this.__callbacks[this.__callbackNames.filter((name) => name === 'changeActivity')[0]]({ activity: newActivity });
    }

    onClick = () => {
        return this.__callbacks[this.__callbackNames.filter((name) => name === 'onClick')[0]]({ id: this.id });
    }
}

export default MapCheckbox;
