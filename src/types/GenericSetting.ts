import {Setting, SettingConfig} from "@/types/Setting";

export type SettingType = string | number | boolean | object;

export class GenericSetting<Type extends SettingType> implements Setting {
    label: string
    icon?: string
    alwaysShow?: boolean = false
    value: Type

    constructor(config: SettingConfig) {
        this.label = config.label
        this.icon = config.icon
        this.value = config.value
    }

    typeof(): string {
        return typeof this.value;
    }

    toString(separator = ' = ') {
        return [this.label, this.value].filter((s) => String(s).length).join(separator)
    }
}

export default GenericSetting