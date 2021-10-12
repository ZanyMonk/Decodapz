import Setting from '@/types/Setting'
import GenericSetting from "@/types/GenericSetting";

function pick(obj: {[key: string]: Setting}, predicate: Function): {[key: string]: Setting} {
    if (!obj || typeof obj !== 'object') return obj

    const newObj: {[key: string]: Setting} = {}

    for (const [name, value] of Object.entries(obj)) {
        if (!predicate(name, value)) continue
        newObj[name] = value
    }
    return newObj
}

export abstract class Encoder {
    large: boolean = false
    readonly: boolean = false
    class?: string
    settings?: {
        [key: string]: Setting
    }

    abstract encode(input: string): string|Promise<string>|boolean
    abstract decode(input: string): string|Promise<string>|boolean

    get stringSettings() {
        if (!this.settings) return {}
        return pick(this.settings, (name: string, setting: Setting) => setting.typeof() === 'string')
    }

    get booleanSettings() {
        if (!this.settings) return {}
        return pick(this.settings, (name: string, setting: Setting) => setting.typeof() === 'boolean')
    }

    get objectSettings() {
        if (!this.settings) return {}
        return pick(this.settings, (name: string, setting: Setting) => setting.typeof() === 'object')
    }
}

export default Encoder