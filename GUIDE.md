# React-Ionic Guide

**Warning: this guide is still under development!**

## Routing



## Layout Structure



## Navigation


## Global States


## Global Methods


## Components

### Action Sheet

The Action Sheet is a slide-up pane that lets the user choose from a set of options.
Dangerous options are highlighted in red and made obvious.

**How to use**

    To be implemented

**More information**

- Example: [Action Sheet demo](@@@) ([source](@@@))
- SCSS: [action-sheet.scss](https://github.com/driftyco/ionic/blob/master/scss/_action-sheet.scss)
- Angular.js ref: [$ionicActionSheet](http://ionicframework.com/docs/api/service/$ionicActionSheet/)

### Backdrop

Shows and hides a backdrop over the UI. Appears behind popups, loading, and other overlays.

**How to use**

    // Method propagates from IonBody:
    this.props.ionShowBackdrop(true); // or false

**More information**

- Example: [Backdrop demo](@@@) ([source](@@@))
- SCSS: [backdrop.scss](https://github.com/driftyco/ionic/blob/master/scss/_backdrop.scss)
- Angular.js ref: [$ionicBackdrop](http://ionicframework.com/docs/api/service/$ionicBackdrop/) 

### Buttons

The full range of button options of Ionic is supported next to either onClick or "Link" behaviour.

**How to use**

    // As a link, using the "link" prop:
    <IonButton  icon="ion-chevron-right"
                iconPosition="right"
                link="/next/page"
                color="dark"
                type="outline"
    >Forward</IonButton>
    
    // Call a function onClick:
    <IonButton color="dark" 
               type="outline" 
               onClick={() => this.props.ionShowModal(false)}
    >Close modal</IonButton>


**More information**

- Example: [Buttons demo](@@@) ([source](@@@))
- SCSS: [button.scss](https://github.com/driftyco/ionic/blob/master/scss/_button.scss)


### Form Elements

Some form elements don't have Ionic specific javascript functionality. React-Ionic includes the following components:

- IonItemCheckbox
- IonItemRadio
- IonItemToggle

**How to use**

    import { IonContent, IonList, IonItem, IonItemCheckBox, IonItemToggle, IonItemRadio } from 'reactionic';
    // for the full example check out the source link below

    
- Example: [From Elements demo](@@@) ([source](@@@))
- SCSS: [form.scss](https://github.com/driftyco/ionic/blob/master/scss/_form.scss), [checkbox.scss](https://github.com/driftyco/ionic/blob/master/scss/_checkbox.scss), [radio.scss](https://github.com/driftyco/ionic/blob/master/scss/_radio.scss), [toggle.scss](https://github.com/driftyco/ionic/blob/master/scss/_toggle.scss).
- Ionic style ref: [Forms & Inputs](http://ionicframework.com/docs/components/#forms)
- Angular.js ref: [Form Inputs](http://ionicframework.com/docs/api/directive/ionCheckbox/) 


### Headers & Footers
Headers are fixed regions at the top of a screen that can contain a title label, and left/right buttons for navigation or to carry out various actions.

Footers are regions at the bottom of a screen that can contain various types of content.

**How to use**

    // To see it in context, have a look at the source of 
    // the demo app, or at the layout section above.
    <IonHeaderBar customClasses="with-class"
                  platform={this.props.platform}
                  title="About life"
                  leftButton={leftHeaderButton}
                  rightButton={null}
    />

    // ....
    
    <IonFooterBar><h1 className="title">The End</h1></IonFooterBar>
    
    
**More information**

- Example: [Header & Footers demo](@@@) ([source](@@@))
- SCSS: [bar.scss](https://github.com/driftyco/ionic/blob/master/scss/_bar.scss)
- Ionic style ref: [Header](http://ionicframework.com/docs/components/#header) & [Footer](http://ionicframework.com/docs/components/#footer)
- Angular.js ref: [ion-header-bar](http://ionicframework.com/docs/api/directive/ionHeaderBar/) 


### Lists
The List is a common and simple way of displaying... that's right, a list. This is a widely used interface across most current mobile OS's, and can include content ranging from basic text all the way to buttons, toggles, icons, and thumbnails.

**How to use**

    // Simple list with just one item
    <IonList>
      <IonItem divider>List Icons</IonItem>
      <IonItem iconLeft>
        <IonIcon icon="email" />
        Check mail
      </IonItem>
    </IonList>

**More information**
    
- Example: [Lists demo](@@@) ([source](@@@))
- SCSS: [list.scss](https://github.com/driftyco/ionic/blob/master/scss/_list.scss) & [items.scss](https://github.com/driftyco/ionic/blob/master/scss/_items.scss)
- Ionic style ref: [List](http://ionicframework.com/docs/components/#list)
- Angular.js ref: [ion-list](http://ionicframework.com/docs/api/directive/ionList/) 

### Loading
An overlay that can be used to indicate activity while blocking user interaction.

**How to use**

    // See the demo source for more examples
    <IonButton color="dark"
               type="outline"
               onClick={() => this.props.ionShowLoading(true, {
                                backdrop:false,
                                delay:0,
                                duration: 3000,
                                customTemplate:null
                              })}>Show Loading (3 sec)
    </IonButton>

**More information**
    
- Example: [Loading demo](@@@) ([source](@@@))
- SCSS: [loading.scss](https://github.com/driftyco/ionic/blob/master/scss/_loading.scss)
- Angular.js ref: [$ionicLoading](http://ionicframework.com/docs/api/service/$ionicLoading/) 

### Modal
The Modal is a content pane that can go over the user’s main view temporarily. Usually used for making a choice or editing an item.

**How to use**

    // Define what is in the modal first (the modal contents etc.)
    var DemoModal = React.createClass({
    render() {
      return (
          <IonModal {...this.props}
                  customTemplate={false}
                  title="Some modal"
                  barClasses="bar-dark"
                  customClasses="">
            <div>Content goes here</div>
          </IonModal>
        );
      }
    });
    
    // Then open it like this:
    var demoModal = <DemoModal {...this.props} />;

    // ....
    
    <IonButton color="dark" 
               type="outline" 
               onClick={() => this.props.ionShowModal(demoModal)}
    >Open modal</IonButton>


**More information**
    
- Example: [Modal demo](@@@) ([source](@@@))
- SCSS: [modal.scss](https://github.com/driftyco/ionic/blob/master/scss/_modal.scss)
- Angular.js ref: [$ionicModal](http://ionicframework.com/docs/api/service/$ionicModal/)

### Popover
The Popover is a view that floats above an app’s content. Popovers provide an
easy way to present or gather information from the user.

**How to use**

    To be implemented
    
**More information**

- Example: [Popover demo](@@@) ([source](@@@))
- SCSS: [popover.scss](https://github.com/driftyco/ionic/blob/master/scss/_popover.scss)
- Angular.js ref: [$ionicPopover](http://ionicframework.com/docs/api/service/$ionicPopover/) 

### Popup
The Ionic Popup component allows programmatically creating and showing popup
windows that require the user to respond in order to continue.

**How to use**

    To be implemented

**More information**
    
- Example: [Popup demo](@@@) ([source](@@@))
- SCSS: [popup.scss](https://github.com/driftyco/ionic/blob/master/scss/_popup.scss)
- Angular.js ref: [$ionicPopup](http://ionicframework.com/docs/api/service/$ionicPopup/) 

### Side Menu
A container element for side menu(s) and the main content. Allows the left and/or right side menu to be toggled by dragging the main content area side to side.

**How to use**

    To be implemented

**More information**
    
- Example: [Side Menu demo](@@@) ([source](@@@))
- SCSS: [menu.scss](https://github.com/driftyco/ionic/blob/master/scss/_menu.scss)
- Angular.js ref: [ion-side-menus](http://ionicframework.com/docs/api/directive/ionSideMenus/) 

### Spinner
The IonSpinner component provides a variety of animated spinners.

**How to use**

    // Depending on this.props.platform show one of these
    <IonSpinner icon="ios" />
    <IonSpinner icon="android" />

**More information**
    
- Example: [Spinner demo](@@@) ([source](@@@))
- SCSS: [spinner.scss](https://github.com/driftyco/ionic/blob/master/scss/_spinner.scss)
- Angular.js ref: [ion-spinner](http://ionicframework.com/docs/api/directive/ionSpinner/) 

### Tabs
Tabs are a horizontal region of buttons or links that allow for a consistent navigation experience between screens. It can contain any combination of text and icons, and is a popular method for enabling mobile navigation.

**How to use**

    <IonTabs platform={this.props.platform} 
             customClasses="tabs-light tabs-icon-top">
       <IonTab icon="ios-home" to="/tabs/one" label="Tab 1" />
       <IonTab icon="ios-star" to="/tabs/two" label="Tab 2" />
       <IonTab icon="ios-heart" to="/tabs/three" label="Tab 3" />
       <IonTab icon="ios-gear" to="/tabs/four" label="Tab 4" />
    </IonTabs>
    
**More information**
    
- Example: [Tabs demo](@@@) ([source](@@@))
- SCSS: [tabs.scss](https://github.com/driftyco/ionic/blob/master/scss/_tabs.scss)
- Ionic style ref: [Tabs](http://ionicframework.com/docs/components/#tabs)
- Angular.js ref: [ion-tabs](http://ionicframework.com/docs/api/directive/ionTabs/) 


## Helpers

### Platform

### Timeouts

### Keyboard
