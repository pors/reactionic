// IonKeyboard relies on https://github.com/driftyco/ionic-plugin-keyboard
// and only works within platform.isCordova

var IonKeyboard = function(platform) {

  return (
    {
      close: function () {
        if (platform.isCordova && window.cordova) {
          window.cordova.plugins.Keyboard.close();
        }
      },

      show: function () {
        if (platform.isCordova && window.cordova) {
          window.cordova.plugins.Keyboard.show();
        }
      },
      
      hideKeyboardAccessoryBar: function () {
        if (platform.isCordova && window.cordova) {
          window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
      },
      
      showKeyboardAccessoryBar: function () {
        if (platform.isCordova && window.cordova) {
          window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
      },
      
      disableScroll: function () {
        if (platform.isCordova && window.cordova) {
          window.cordova.plugins.Keyboard.disableScroll(true);
        }
      },
      
      enableScroll: function () {
        if (platform.isCordova && window.cordova) {
          window.cordova.plugins.Keyboard.disableScroll(false);
        }
      }
    }
  );
};

// window.addEventListener('native.keyboardshow', function (event) {
// To be implemented @@@@@@@@@@@@@@@@
// });

export default IonKeyboard;
