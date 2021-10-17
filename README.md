# proxy-decor [TODO]

proxy-decor provides mediator capabilities between two DOM elements, one of which is a built-in element enhanced by a decorator / behavior following the pattern established by [be-decorated](https://github.com/bahrus/be-decorated).  For example, the [re-formable](https://github.com/bahrus/be-reformable) decorator enhances the form, to get the JSON response on the client side.  But how do we pass the result down to the JSON viewer?  

```html
<link id=newton-microservice rel=preconnect href=https://newton.now.sh/ >
<form be-reformable='{
    "base-link": "newton-microservice",
    "path": ["api/v2/", "operation", "/", "expression"],
    "autoSubmit": true
}'>
    <label for=operation>Operation:</label>
    <input id=operation value=integrate>
    <label for=expression>Expression:</label>
    <input id=expression value="x^2">
</form>
<json-viewer be-observant='{
    "object": {"observe": "form", "on": "reformable::fetch-result-changed"}
}'></json-viewer>
```

We could have the form emit a namespaced event, e.g. "reformable::fetch-result-changed" everytime the fetch completes.  But what if json-viewer upgrades after the fetch completed?  How can json-viewer "catch up" and extract the value of the last event?

This is difficult, without plopping on a custom property onto the native form element, which we are loathe to do.

So that's where proxy-decor steps in.

proxy-decor overrides the built-in addEventListener method, and applies some special logic.

If the event name starts with reformable::fetch-result-changed then it:

1.  Finds the proxy associated with be-reformable.
2.  Extracts the value fetchResult from the proxy.
3.  Invokes the callback specified in addEventListener if there is a defined value in step 2.
4.  Subscribes to the proxy for further changes to virtual property fetchResult.
5.  Invokes the callback when changes happen to the virtual property.

So the markup looks like:

```html
<link id=newton-microservice rel=preconnect href=https://newton.now.sh/ >
<form be-reformable='{
    "base-link": "newton-microservice",
    "path": ["api/v2/", "operation", "/", "expression"],
    "autoSubmit": true
}'>
    <label for=operation>Operation:</label>
    <input id=operation value=integrate>
    <label for=expression>Expression:</label>
    <input id=expression value="x^2">
</form>
<proxy-decor></proxy-decor>
<json-viewer be-observant='{
    "object": {"observe": "proxy-decor", "on": "reformable::fetch-result-changed"}
}'></json-viewer>
```

