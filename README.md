# proxy-decor

```html
<be-sorted-impl upgrade=* if-wants-to-be=sorted></be-sorted-impl>

...

<proxy-decor id=proxyDecor for=be-sorted></proxy-decor>
<ul be-sorted='{"direction":"asc","nodeSelectorToSortOn":"span"}'>
    <li>
        <span>Zorse</span>
    </li>
    <li>
        <span>Aardvark</span>
    </li>
</ul>

...
<script>
    proxyDecor.addEventListener('sorted', e => {
        console.log('list has been sorted');
    });
    proxyDecor.proxy.direction = 'desc';
</script>

```