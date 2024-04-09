import { Config, StoreAbandonedCartResponse } from "./types"
import {debounce, destroyAbandonedCart, getAsyncElement, storeAbandonedCart, updateAbandonedCart} from "./utils"
import { LOCALSTORAGE_KEY } from "./vars"

export const useCart = async (config: Config) => {
    let abandonedCartItemUuid: string | null = localStorage.getItem(LOCALSTORAGE_KEY)
    let ymClientId: string | number | null = null

    const phoneInput = await getAsyncElement<HTMLInputElement>(config.phoneInputSelector)
    const emailInput = await getAsyncElement<HTMLInputElement>(config.emailInputSelector)
    const nameInput = await getAsyncElement<HTMLInputElement>(config.nameInputSelector)
    const contentElement = await getAsyncElement<HTMLElement>(config.contentElementSelector)
    const submitButton = await getAsyncElement<HTMLButtonElement>(config.submitButtonSelector)

    const getData = () => {
        return {
            phone: phoneInput?.value,
            email: emailInput?.value,
            name: nameInput?.value,
            content: contentElement?.innerText,
            source_id: config.sourceId,
            client_id: ymClientId,
        }
    }

    const handlePhoneInputBlur = async (): Promise<void> => {
        const data = getData()

        if (!data.phone || !data.source_id) {
            return
        }

        if (abandonedCartItemUuid) {
            await updateAbandonedCart(abandonedCartItemUuid, data)

            return
        }

        const response = await storeAbandonedCart(data)

        if (response.ok) {
            const data: StoreAbandonedCartResponse = await response.json()

            localStorage.setItem(LOCALSTORAGE_KEY, data.data.uuid)
            abandonedCartItemUuid = data.data.uuid
        }
    }

    const handleSubmitButtonClick = async (event: Event): Promise<void> => {
        if (!abandonedCartItemUuid) {
            return
        }

        event.preventDefault()

        const response = await destroyAbandonedCart(abandonedCartItemUuid)

        if (response.ok) {
            localStorage.removeItem(LOCALSTORAGE_KEY)
            abandonedCartItemUuid = null
        }

        const button = (event.currentTarget || event.target) as HTMLButtonElement

        setTimeout(() => button.click())
    }

    let tries = 0
    const getYandexMetricaClientId = (): void => {
        window.ym && window.ym(config.ymId, 'getClientID', (clientId?: string | number) => {
            ymClientId = clientId || null
        })

        if (!ymClientId && tries < 4) {
            tries++
            setTimeout(getYandexMetricaClientId, 1000)
        }
    }

    const init = (): void => {
        if (!phoneInput || !submitButton) {
            console.warn('Abandoned cart form is not initialized. Phone input or submit button not found.')
            return
        }

        getYandexMetricaClientId()

        const handler = debounce(handlePhoneInputBlur, 1000)

        phoneInput.addEventListener('input', handler)
        emailInput?.addEventListener('input', handler)
        nameInput?.addEventListener('input', handler)
        submitButton.addEventListener('click', handleSubmitButtonClick)
    }

    return {
        init,
        phoneInput,
        emailInput,
        nameInput,
        contentElement,
        submitButton,
    }
}