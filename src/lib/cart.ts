import { Config, StoreAbandonedCartResponse } from "./types"
import { destroyAbandonedCart, getElementBySelector, storeAbandonedCart, updateAbandonedCart } from "./utils"
import { LOCALSTORAGE_KEY } from "./vars"

export const useCart = (config: Config) => {
    let abandonedCartItemUuid: string | null = localStorage.getItem(LOCALSTORAGE_KEY)

    const phoneInput = getElementBySelector<HTMLInputElement>(config.phoneInputSelector)
    const emailInput = getElementBySelector<HTMLInputElement>(config.emailInputSelector)
    const nameInput = getElementBySelector<HTMLInputElement>(config.nameInputSelector)
    const contentElement = getElementBySelector<HTMLElement>(config.contentElementSelector)
    const submitButton = getElementBySelector<HTMLButtonElement>(config.submitButtonSelector)

    const getData = () => {
        return {
            phone: phoneInput?.value,
            email: emailInput?.value,
            name: nameInput?.value,
            content: contentElement?.innerText,
            source_id: config.sourceId,
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

    const init = (): void => {
        if (!phoneInput || !submitButton) {
            return
        }

        phoneInput.addEventListener('blur', handlePhoneInputBlur)
        emailInput?.addEventListener('blur', handlePhoneInputBlur)
        nameInput?.addEventListener('blur', handlePhoneInputBlur)
        submitButton.addEventListener('click', handleSubmitButtonClick)
    }

    return {
        init,
    }
}