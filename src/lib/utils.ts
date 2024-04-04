import { API_URL } from "./vars"

export const getAsyncElement = <T extends Element>(selector: string | null | undefined): Promise<T | null> => {
    return new Promise(resolve => {
        if (!selector) {
            return resolve(null)
        }

        if (document.querySelector(selector)) {
            return resolve(document.querySelector<T>(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector<T>(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
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