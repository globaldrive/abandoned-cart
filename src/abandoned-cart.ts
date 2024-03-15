import type { Config } from "./lib/types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AbandonedCart {
    public constructor(config: Config) {
        console.log('Init plugin', config)
    }
}

window['AbandonedCart'] = AbandonedCart
