import type { Config } from "./lib/types"
import { useCart } from "./lib/cart"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AbandonedCart {
    public cart: Awaited<ReturnType<typeof useCart>>

    public constructor(config: Config) {
        useCart(config).then(result => {
            this.cart = result
            this.cart.init()

            window['AbandonedCartInstance'] = result
        })
    }
}

window['AbandonedCart'] = AbandonedCart
