import type { Config } from "./lib/types"
import { useCart } from "./lib/cart"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AbandonedCart {
    public constructor(config: Config) {
        useCart(config).then(result => result.init())
    }
}

window['AbandonedCart'] = AbandonedCart
