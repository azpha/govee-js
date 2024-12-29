# Govee JS/TS Client

Not affiliated with Govee. just a fun project

## Install

```
npm i @awexx/govee
```

## Setup

You'll need an API key from Govee in order to use this client. You can get one following [these steps](https://developer.govee.com/reference/apply-you-govee-api-key) from inside the Govee mobile app.

## Usage

```typescript
import Govee from "@awexx/govee";

(async () => {
  const govee = new Govee("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");
  const device = "aa:bb:cc:dd:ee:ff:gg:hh";
  const sku = "H6003";

  await govee.light.off(device, sku); // turns off light
  await govee.light.on(device, sku); // turns off light
  await govee.light.color(device, sku, 8388736); // sets color to purple
  await govee.light.brightness(device, sku, 30); // sets brightness to 30%
})();
```

Some notes;

- RGB needs to be the decimal value of that color. You can you something like [SpyColor](https://www.spycolor.com/) to find that.
- This package only supports Govee lights for now.
