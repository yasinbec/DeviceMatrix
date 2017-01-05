(function($) {

  // Create plugin
  $.fn.deviceMatrix = function() {

    var $html = $('html'),
      $platform,
      $device,
      $version,
      $orientation;

    // iOS 8 and up
    // iOS 9 and up
    // iOS 10 and up

    function iOSversion() {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      }
    }

    // iPhone 5
    // iPhone 6
    // iPhone 7

    function isIphone() {
      return !!navigator.userAgent.match(/iPhone/i);
    }

    function isIPad() {
      return !!navigator.userAgent.match(/iPad/i);
    }

    function iPhoneVersion() {
      if(isIphone) {
        var iHeight = window.screen.height;
        var iWidth = window.screen.width;
        if (iWidth === 320 && iHeight === 480) {
          return 'iPhone4';
        }
        else if (iWidth === 375 && iHeight === 667) {
          return 'iPhone6';
        }
        else if (iWidth === 414 && iHeight === 736) {
          return 'iPhone6Plus';
        }
        else if (iWidth === 320 && iHeight === 568) {
          return 'iPhone5';
        }
        else if (iHeight <= 480) {
          return 'iPhone2-3';
        }

        return '';
      } 
    }


    function iPad() {
      if(isIPad()) {
        return 'iPad';
      }
    }

    // Samsung Galaxy S4-7

    var samsungDevice = '';
    if(navigator.userAgent.match(/SAMSUNG|SGH-[I|N|T]|GT-[I|P|N]|SM-[N|P|T|Z|G]|SHV-E|SCH-[I|J|R|S]|SPH-L/i))  {
      samsungDevice = 'samsung-phone';
    }


    // Nexus 7
    // Kindle Fire

    var deviceTablet = '';
    var deviceStrings = [
        //{s:'Android', r:/Android/},
        {s:'Kindle-Fire', r:/Silk/},
        {s:'Nexus', r:/Nexus/}
        //{s:'iPad', r:/(iPad)/},
    ];
    for (var id in deviceStrings) {
        var cs = deviceStrings[id];
        if (cs.r.test(navigator.userAgent)) {
            deviceTablet = cs.s;
            break;
        }
    }

    // MacOS
    // Window 7
    // Window 8
    // Window 10
    // Android
    // http://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
    var os = '';
    var clientStrings = [
        {s:'Windows-10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows-8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows-8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows-7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Mac-OS-X', r:/Mac OS X/},
        {s:'Mac-OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/}
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(navigator.userAgent)) {
            os = cs.s;
            break;
        }
    }


    // IE9
    // IE10
    // IE11
    // IE Edge
    function detectIE() {
      var ua = window.navigator.userAgent;

      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      // other browser
      return false;
    }


    // Chrome
    // Firefox
    // Safari
    // Opera
    function browserName() {
      var $browser;
      if( navigator.userAgent.indexOf('Chrome') > -1  ) {
        $browser = 'chrome';
      } else if (navigator.userAgent.indexOf('Firefox') > -1) {
        $browser = 'firefox'
      } else if (navigator.userAgent.toLowerCase().indexOf("op") > -1) {
        $browser = 'opera';
      } else if (navigator.userAgent.indexOf("Safari") > -1) {
        $browser = 'safari';
      } else if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf("Safari") > -1) {
        $browser = 'chrome';
      } else if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.toLowerCase().indexOf("op") > -1) {
        $browser = 'opera';
      } else {
        $browser = '';
      }
      return $browser; 
    }


    // Bonus Feature
    // IF Mobile
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

      function doOnOrientationChange()
      {
        var orientation;
        switch(window.orientation) 
        {  
          case -90:
          case 90:
            orientation ='landscape';
            break; 
          default:
            orientation ='portrait';
            break; 
        }
        return orientation;
      }
     
      window.addEventListener('orientationchange', doOnOrientationChange);
     
      // Initial execution if needed
      $orientation = doOnOrientationChange();

    } else {
      $orientation = '';
    }

    $device = iPhoneVersion();
    $device = iPad();
    $device = samsungDevice;
    $device = deviceTablet;

    if(iPhoneVersion()) {
      $device = iPhoneVersion();
    } else if (iPad()) {
      $device = iPad();
    } else if(samsungDevice) {
      $device = samsungDevice;
    } else if(deviceTablet) {
      $device = deviceTablet;
    }

    if(iOSversion()) {
      $version = iOSversion();
    } else if(browserName()){
      $version = browserName();
    } else if(detectIE()) {
      $version = detectIE();
    }

    if(!isIphone() && !isIPad()) {
      $platform = os;
    } else {
      $platform = '';
    }

    console.log($platform);
    console.log($device);
    console.log($version);
    console.log($orientation);


    return $html.addClass($platform +' '+ $device +' '+ $version +' '+ $orientation);

  }

})(jQuery);
