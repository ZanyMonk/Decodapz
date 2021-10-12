import {SettingConfig} from '@/types/Setting';
import GenericSetting from '@/types/GenericSetting';

interface Choices {
    [key: string]: {
        label: string
        value: string
    }
}

interface MultichoiceSettingConfig extends SettingConfig {
    choices: Choices
}

class MultichoiceSetting extends GenericSetting<object> {
    choices: Choices

    constructor(config: MultichoiceSettingConfig) {
        super(config)
        this.choices = config.choices || {}
    }

    get(key: string) {
        if (!(key in this.choices)) return undefined
        return this.choices[key]
    }
}

export default MultichoiceSetting