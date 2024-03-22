type YandexMetricaMethods = 'getClientID'

declare global {
    interface Window {
        ym?: (ycId: number | string, method: YandexMetricaMethods, callback: (clientId?: string | number) => void) => void
    }
}

export type Config = {
    phoneInputSelector: string
    emailInputSelector?: string
    nameInputSelector?: string
    contentElementSelector?: string
    submitButtonSelector: string
    sourceId: number
    ycId?: number | string
}

export type StoreAbandonedCartResponse = {
    data: {
        uuid: string
    }
}