/*!
 * cpIFramePrivacy Version v1.0.0
 * https://github.com/codeprofis/cpIFramePrivacy
 *
 * Licensed under the MIT-License, © 2019 CodeProfis Inh. Tim Afholderbach - https://wwww.codeprofis.eu/
 */

(function(window, document) {
  function cpIFramePrivacy() {
    var _cpIFramePrivacy = {};

    _cpIFramePrivacy.config = {
      cookiesEnabled: false,
      cookieDuration: 1,
    };

    /**
     * setCookieEnabled
     * Set if a cookie will be set once the iframe was accepted.
     */
    _cpIFramePrivacy.setCookieEnabled = function(value) {
      _cpIFramePrivacy.config.cookiesEnabled = value;
    };

    /**
     * setCookieDuration
     * Sets the expiry time of the duration to x days
     */
    _cpIFramePrivacy.setCookieDuration = function(value) {
      if(value < 1) {
        throw 'Do not set the Cookie-Duration to a value lower than 1. If you want to disable the cookie, please use setCookieEnabled(false)';
      }
      _cpIFramePrivacy.config.cookieDuration = value;
    };

    _cpIFramePrivacy.setCookie = function(name) {
      var d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * this.config.cookieDuration);
      document.cookie =
        "cpIFramePrivacy_" + name + "=1;expires=" + d.toGMTString() + ";path=/";
    };

    /**
     * checkCookie
     * Checks if the named cookie exists
     */
    _cpIFramePrivacy.checkCookie = function(name) {
      var v = document.cookie.match(
        "(^|;) ?" + "cpIFramePrivacy_" + name + "=([^;]*)(;|$)"
      );

      return v ? true : false;
    };

    /**
     * initIFrame
     * Inits a frame on given container
     */
    _cpIFramePrivacy.initIFrame = function(containerId) {
      // Get the container element based on the containerId
      var containerElement = document.getElementById(containerId);

      // Check if the given container element really exists
      if (containerElement === null) {
        // and if not, throw a message
        throw "No container element with #" + containerId + " found.";
      }

      // Check if the confirmation-message attribute has been set
      if (containerElement.attributes["data-confirmation-message"] === null) {
        // and if not, throw a message
        throw "data-confirmation-message not set on ContainerElement #" + containerId;
      }

      // Check if the url attribute has been set
      if (containerElement.attributes["data-url"] === null) {
        // and if not, throw a message
        throw "data-url not set on ContainerElement #" + containerId;
      }

      // Get messageId from attributes
      var messageId = containerElement.attributes["data-confirmation-message"].value;
      // and obtain the messageElement
      var messageElement = document.getElementById(messageId);


      // Check if the message element really exists
      if (messageElement === null) {
        // and if not, throw a message
        throw "Element containing message is not set";
      }

      // Append message element as a child to the ContainerElement
      containerElement.appendChild(messageElement);


      var cookieFound = false;

      // If cookie checking is enabled
      if (this.config.cookiesEnabled) {
        // check if the cookie for this element exists
        if (this.checkCookie(containerId)) {
          // if the cookie for this element exists
          // set cookieFound for later checking to true
          cookieFound = true;
          // and directly show the IFrame
          this.showIFrame(containerElement, messageElement);
        }
      }

      // if no cookie was found:
      if (!cookieFound) {
        // assign confirmAnchor
        var confirmAnchor = document.querySelector("#" + messageId + " .cpIframePrivacy__confirm-button");

        // and check if a confirm anchor really exists
        if (confirmAnchor === null) {
          // if it doesn't exist, throw a message
          throw "Container Element does not contain .cpIframePrivacy__confirm-button";
        }

        // if the confirmAnchor exists
        // add eventlistender for clicking on the confirmAnchor element
        confirmAnchor.addEventListener("click",
          function(event) {
            // prevent default behavior for clicking on this element
            event.preventDefault();

            // check if coookies are enabled
            if(this.config.cookiesEnabled) {
              // if so: set cookie for current containerId
              this.setCookie(containerId);
            }

            this.showIFrame(containerElement, messageElement);
          }.bind(this)
        );
      }
    };

    /**
     * showIFrame
     * Shows iframe of given containerElement
     */
    _cpIFramePrivacy.showIFrame = function(containerElement, messageElement) {

      // create a new iframe element
      var iframe = document.createElement("iframe");
      // set src to the url of the given container element
      iframe.setAttribute("src", containerElement.attributes["data-url"].value);

      // set 100% width, 100% height and frameborder 0
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "100%");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      
      iframe.setAttribute("frameborder", 0);

      
      // append iframe as a child of container element
      containerElement.appendChild(iframe);

      // remove messageElement from DOM
      messageElement.remove();
    };

    return _cpIFramePrivacy;
  }

  if (window.cpIFramePrivacy === undefined) {
    window.cpIFramePrivacy = cpIFramePrivacy();
  }
})(window, document); 
