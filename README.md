# cpIFramePrivacy
DGSVO-compliant integration of IFrames (Google Maps for example) with prior confirmation.

## How to integrate
It is easy to integrate cpIFramePrivacy.

**The integration is finally done in 4 steps:**
1. Integrate cpIFramePrivacy.min.js as ```<script>``` in the Header-Section of your page.

2. A div container - identified by a unique ID (in the examples we use *mapContainer* as the ID) - is created at the previous location of the iframe. The styles of the previous frame are assigned to this container. The attribute ```data-url``` is used to specify the iframes URL. The attribute ```data-confirmation-message``` specifies the ID of the container created in the next step.

3. Next, a div container containing the confirmation message has to be defined (we define it as a direct sibling of ```mapContainer``` in our examples. This div can be designed freely.
The HTML element, which is actually clicked by the user for confirmation, must contain the class ```cpIframePrivacy__confirm-button```.

4. At the end of the body area the iframes are initialized using the following script:
```
<script>
  cpIFramePrivacy.initIFrame('mapContainer');    
</script>
```

Simply have a look at the example in ```example/Example.html```

## Enable cookie
cpIFramePrivacy can store user's confirmation in a cookie, which leads to not showing the confirmation message again for a specified time (1 day by default)

```
<script>
  cpIFramePrivacy.setCookieEnabled(true);
  cpIFramePrivacy.initIFrame('mapContainer');    
</script>
```

### Set cookie timeout
You can easily adjust the expiry time of the cookie by invoking ```cpIFramePrivacy.setCookieDuration``` with number of days as an argument:

```
<script>
  cpIFramePrivacy.setCookieEnabled(true);
  cpIFramePrivacy.setCookieDuration(2); // <--- sets the cookie expiry time to two days
  cpIFramePrivacy.initIFrame('mapContainer');    
</script>
```
