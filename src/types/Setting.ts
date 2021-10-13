export interface Setting {
    label: string
    icon?: string
    alwaysShow?: boolean
    value: any

    typeof(): string
}

export interface SettingConfig {
    label: string
    icon?: string
    alwaysShow?: boolean
    value: any
}

export default Setting