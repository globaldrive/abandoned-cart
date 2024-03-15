## Description

This plugin implements the sending of abandoned carts on the website.

## How to use

```html
<script src="abandoned-cart.js" type="module"></script>
<script>
  new AbandonedCart({
      phoneInputSelector: '#phone-input',
      emailInputSelector: '#email-input', // optional
      nameInputSelector: '#name-input', // optional
      contentElementSelector: '#content-element', // optional
      submitButtonSelector: '#submit-button',
  })
</script>
```
