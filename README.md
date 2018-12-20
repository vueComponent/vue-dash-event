# vue-dash-event
The library function, implemented in the DOM template, can use the custom event of the ant-design-vue component (camelCase)

[![NPM version](https://img.shields.io/npm/v/vue-dash-event.svg?style=flat)](https://npmjs.org/package/vue-dash-event) [![NPM downloads](http://img.shields.io/npm/dm/vue-dash-event.svg?style=flat)](https://npmjs.org/package/vue-dash-event)
[![](https://data.jsdelivr.com/v1/package/npm/vue-dash-event/badge)](https://www.jsdelivr.com/package/npm/vue-dash-event)

## Usage

```js
<script src="https://cdn.jsdelivr.net/npm/vue-dash-event@1.0.1/dist/index.min.js"></script>
<script>
Vue.use(window['vue-dash-event'])
</script>
```
## Why

### If you not use DOM templates, You don't need this plugin.

Unlike components and props, event names don’t provide any automatic case transformation. Instead, the name of an emitted event must exactly match the name used to listen to that event. For example, if emitting a camelCased event name:

```js
this.$emit('myEvent')
```
Listening to the kebab-cased version will have no effect:

```html
<my-component v-on:my-event="doSomething"></my-component>
```
Unlike components and props, event names will never be used as variable or property names in JavaScript, so there’s no reason to use camelCase or PascalCase. Additionally, `v-on` event listeners inside DOM templates will be automatically transformed to lowercase (due to HTML’s case-insensitivity), so `v-on:myEvent` would become `v-on:myevent` – making `myEvent` impossible to listen to.

But ant-design-vue use camelCase for event names. In order to properly monitor the internal camelCase events of the component.
If you use DOM templates, you must use `<my-component v-on:my-event="doSomething"></my-component>` and `Vue.use(window['vue-dash-event'])`. Then component will monitor the internal camelCase events of the component.
