import { ITextLocale } from "../Data/ITextLocale"

export const findContentByLanguage = (locale: ITextLocale[], code: string ): string => {
    const obj = locale.find(x => x.code === code)
    if (obj) return obj.content
    return ""
}

export const findIdByLanguage = (locale: ITextLocale[], code: string): string => {
    const obj = locale.find(x => x.code == code)
    if (obj) return obj.id
    return ""
}