export interface Setting {
    label: string
    icon?: string
    value: any

    typeof(): string
}

export interface SettingConfig {
    label: string
    icon?: string
    value: any
}

export default Setting