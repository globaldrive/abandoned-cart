export type Config = {
    phoneInputSelector: string
    emailInputSelector?: string
    nameInputSelector?: string
    contentElementSelector?: string
    submitButtonSelector: string
    sourceId: number
}

export type StoreAbandonedCartResponse = {
    data: {
        uuid: string
    }
}