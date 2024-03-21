## Description

This plugin implements the sending of abandoned carts on the website.

Cart details will be sent to `https://my.globaldrive.ru/abandoned-cart`.

## Demo

[Demo](https://unpkg.com/abandoned-cart-plugin@latest/dist/demo/index.html)

## How to use

```html
<script src="https://unpkg.com/abandoned-cart-plugin@latest/dist/global/abandoned-cart.js"></script>
<script>
  new AbandonedCart({
      phoneInputSelector: '#phone-input',
      emailInputSelector: '#email-input', // optional
      nameInputSelector: '#name-input', // optional
      contentElementSelector: '#content-element', // optional
      submitButtonSelector: '#submit-button',
      sourceId: 122,
  })
</script>
```
