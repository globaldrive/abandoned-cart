import { API_URL } from "./vars"

export const getElementBySelector = <T extends Element>(selector: string | null | undefined): T | null => {
    return selector
        ? document.querySelector<T>(selector)
        : null
}

export const updateAbandonedCart = async (uuid: string, data: object): Promise<Response> => {
    return await fetch(`${API_URL}/${uuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })
}

export const storeAbandonedCart = async (data: object): Promise<Response> => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })
}

export const destroyAbandonedCart = async (uuid: string): Promise<Response> => {
    return await fetch(`${API_URL}/${uuid}`, {
        method: 'DELETE',
    })
}