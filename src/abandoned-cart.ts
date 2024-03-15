import type { Config } from "./lib/types"
import { useCart } from "./lib/cart"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AbandonedCart {
    public constructor(config: Config) {
        useCart(config).init()
    }
}

window['AbandonedCart'] = AbandonedCart
