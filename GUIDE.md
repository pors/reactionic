# React-Ionic Guide

If you just got here and miss some context, check out the [README](https://github.com/reactionic/reactionic/blob/master/README.md) first, and have a look at the [React-Ionic site](http://reactionic.github.io/).

## Routing

In most cases the routing definition will be the entry point of your app. React-Ionic uses [react-router](https://github.com/reactjs/react-router) for routing.

The way you set up routing is not different from any other React app, there is no specific React-Ionic way of using the router.

A very basic example will look like this:

    import ReactDOM from 'react-dom';
    import React from 'react';
    import { Router, Route, IndexRoute } from "react-router";
    import createBrowserHistory from 'history/lib/createBrowserHistory';
    import App from './components/app.jsx';
    import Page from './components/page.jsx';

    var main = function () {
      var history = createBrowserHistory();
  
      var routes = (
        <Route path="/" component={App}>
          <Route path="/page" component={Page}/>
        </Route>
     );
  
     ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));
    };

Then simply call main() or if you work with Meteor you need to run it with Meteor.startup():

    if (typeof Meteor !== 'undefined') {
      Meteor.startup(main);
    } else {
      main();
    }

See the [kitchensink router](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/router.jsx) for a more extensive example.

**Important**: For React-Ionic to work properly with React-router it is required that `IonBody` has access to the `this.props.location` property (which is set by React-router to the top level Route component: the component that included IonBody). This can be accomplished by passing `this.props.location` as a prop to `IonBody` in your top-level route component:

    return (
      <IonBody location={this.props.location} >
        { this.props.children }
      </IonBody>
    );



## Layout Structure

The overall structure of a typical app will be like: `App > Layout > Page`.

Where `App` contains `IonBody`, Layout contains `IonHeaderBar` and `IonView` (or the navigation versions of it, see below), and the Page contains `IonContent` wrapped around the actual content.

This multi-layer approach allows for creating one or more templates for multiple pages that share similar design, functionality, state, layout etc.

The actual Page component will the inserted into the IonView component by the router as `this.props.children`. The same is true for embedding the Layout into the IonBody component.

For actual examples of this approach see: [App](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/app.jsx
) > [Layout](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/layouts/main.jsx) > [Page](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/about.jsx).



## Navigation

The Navigation components ensure that page transitions are animated following the iOS or Android requirements.

Navigation is usually placed in a layout component (see above) inside the IonBody. It typically looks like this:

    <IonNavBar customClasses="bar-dark"
               title={headerTitle}
               leftButton={backButton}
    />

    <IonNavView>
      <IonView>
        {this.props.children}
      </IonView>
    </IonNavView>

Where the backButton is created from the IonNavBackButton component:


    var backButton = (
      <IonNavBackButton icon="ion-ios-arrow-back"
                        color=""
                        type="clear"
                        history={this.props.history}
                        customClasses="button-stage"
      />
    );

A complete example can be found [here](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/layouts/main.jsx).

## Global States

The full list of global states is:

    ionNavDirection
    ionModal
    ionPopover
    ionActionSheet
    ionPopup
    ionBackdrop
    ionLoading
    ionKeyboardHeight
    ionHasTabs
    ionHasTabsTop
    ionHasHeader
    ionHasSubheader
    ionHasFooter
    ionHasSubfooter
    ionSnapper
    ionKeyboard

About most of them you don't need to bother, but they are all accessible like "props" (i.e. read-only) through [context](https://facebook.github.io/react/docs/context.html).

For example, to read the state of `ionKeyboardHeight` in your component add this:

    contextTypes: {
      ionKeyboardHeight: React.PropTypes.number
    },

and read it like: 

    this.context.ionKeyboardHeight

The use of the relevant states in your app is explained in the appropriate sections below.

## Global Methods

The full list of global methods is:

    ionSetTransitionDirection
    ionShowModal
    ionUpdateActionSheet
    ionUpdatePopup
    ionShowBackdrop
    ionShowLoading
    ionUpdateHasX
    ionSetSnapper
    ionShowPopover

These methods are also accessible though context like:

    contextTypes: {
      ionShowBackdrop: React.PropTypes.func
    },

and call it like:

    this.context.ionShowBackdrop(true);

The use of the relevant methods is explained in more detail in the components section below.

## Components

### Action Sheet

The Action Sheet is a slide-up pane that lets the user choose from a set of options.
Dangerous options are highlighted in red and made obvious.

**How to use**

First define the actionSheet object, e.g.:

    var actionSheet = {
      titleText: 'ActionSheet Demo',
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      buttons: [
        { text: <span>Share <i className="icon ion-share"></i></span> },
        { text: <span>Move <i className="icon ion-arrow-move"></i></span> },
      ],
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Shared!');
        }
        if (index === 1) {
          console.log('Moved!');
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    };


Then, to activate the actionSheet, simply call the ionUpdateActionSheet method:

    contextTypes: {
      ionUpdateActionSheet: React.PropTypes.func
    },
    
and

    this.context.ionUpdateActionSheet(actionSheet)

**More information**

- Example: [Action Sheet demo](https://app.pors.net/actionSheet) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/actionSheet.jsx))
- SCSS: [action-sheet.scss](https://github.com/driftyco/ionic/blob/master/scss/_action-sheet.scss)
- Angular.js ref: [$ionicActionSheet](http://ionicframework.com/docs/api/service/$ionicActionSheet/)

### Backdrop

Shows and hides a backdrop over the UI. Appears behind popups, loading, and other overlays.

**How to use**

    // Method propagates from IonBody:
    this.context.ionShowBackdrop(true); // or false

**More information**

- Example: [Backdrop demo](https://app.pors.net/backdrop) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/backdrop.jsx))
- SCSS: [backdrop.scss](https://github.com/driftyco/ionic/blob/master/scss/_backdrop.scss)
- Angular.js ref: [$ionicBackdrop](http://ionicframework.com/docs/api/service/$ionicBackdrop/) 

### Buttons

The full range of button options of Ionic is supported next to either onClick or "Link" behavior.

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
               onClick={() => this.context.ionShowModal(false)}
    >Close modal</IonButton>


**More information**

- Example: [Buttons demo](https://app.pors.net/buttons) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/buttons.jsx))
- SCSS: [button.scss](https://github.com/driftyco/ionic/blob/master/scss/_button.scss)


### Form Elements

Some form elements don't have Ionic specific javascript functionality. React-Ionic includes the following components:

- IonItemCheckbox
- IonItemRadio
- IonItemToggle

**How to use**

    import { IonContent, IonList, IonItem, IonItemCheckBox, IonItemToggle, IonItemRadio, IonRange } from 'reactionic';
    // for the full example check out the source link below

    
- Example: [From Elements demo](https://app.pors.net/forms) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/forms.jsx))
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
                  title="About life"
                  leftButton={leftHeaderButton}
                  rightButton={null}
    />

    // ....
    
    <IonFooterBar><h1 className="title">The End</h1></IonFooterBar>
    
    
**More information**

- Example: [Header & Footers demo](https://app.pors.net/headersFooters) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/headersFooters.jsx))
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
    
- Example: [Lists demo](https://app.pors.net/lists) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/lists.jsx))
- SCSS: [list.scss](https://github.com/driftyco/ionic/blob/master/scss/_list.scss) & [items.scss](https://github.com/driftyco/ionic/blob/master/scss/_items.scss)
- Ionic style ref: [List](http://ionicframework.com/docs/components/#list)
- Angular.js ref: [ion-list](http://ionicframework.com/docs/api/directive/ionList/) 

### Loading
An overlay that can be used to indicate activity while blocking user interaction.

**How to use**

    // See the demo source for more examples
    <IonButton color="dark"
               type="outline"
               onClick={() => this.context.ionShowLoading(true, {
                                backdrop:false,
                                delay:0,
                                duration: 3000,
                                customTemplate:null
                              })}>Show Loading (3 sec)
    </IonButton>

**More information**
    
- Example: [Loading demo](https://app.pors.net/loading) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/loading.jsx))
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
               onClick={() => this.context.ionShowModal(demoModal)}
    >Open modal</IonButton>


**More information**
    
- Example: [Modal demo](https://app.pors.net/modal) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/modal.jsx))
- SCSS: [modal.scss](https://github.com/driftyco/ionic/blob/master/scss/_modal.scss)
- Angular.js ref: [$ionicModal](http://ionicframework.com/docs/api/service/$ionicModal/)

### Popover
The Popover is a view that floats above an app’s content. Popovers provide an easy way to present or gather information from the user.

**How to use**

The popover is typically opened from the top-right header button. First define a component, say demoPopover, as a basic list:

    <div className="content">
      <div className="list">
        <a className="item item-icon-right" href="https://facebook.github.io/react/" target="_blank">
          React
          <IonIcon icon="ios-arrow-right" />
        </a>            
        <a className="item item-icon-right" href="http://ionicframework.com/" target="_blank">
          Ionic
          <IonIcon icon="ios-arrow-right" />
        </a>
      </div>
    </div>

Then add an onClick event on the button that will open the popover calling:

    this.context.ionShowPopover(demoPopover)

**More information**

- Example: [Popover demo](https://app.pors.net/popover) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/popover.jsx))
- SCSS: [popover.scss](https://github.com/driftyco/ionic/blob/master/scss/_popover.scss)
- Angular.js ref: [$ionicPopover](http://ionicframework.com/docs/api/service/$ionicPopover/) 

### Popup
The Ionic Popup component allows programmatically creating and showing popup
windows that require the user to respond in order to continue.

**How to use**

First define the Popup object, e.g.:

    {
        popupType: 'show',
        title: 'A Popup',
        template: 'Here\'s a quick popup.',
        buttons: [{
          text: 'Close me',
          type: 'button-positive',
          onTap: function() {
                              console.log('Closed');
                            }
        }]
    }    

Then, to activate the Popup, simply call the ionUpdatePopup method:

    this.context.ionUpdatePopup(popupObject)

For different Popup types see the example demo source code below.

**More information**
    
- Example: [Popup demo](https://app.pors.net/popup) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/popup.jsx))
- SCSS: [popup.scss](https://github.com/driftyco/ionic/blob/master/scss/_popup.scss)
- Angular.js ref: [$ionicPopup](http://ionicframework.com/docs/api/service/$ionicPopup/) 

### Side Menu
A container element for side menu(s) and the main content. Allows the left and/or right side menu to be toggled by dragging the main content area side to side.

**How to use**

The side-menu wraps two components inside the `IonSideMenuContainer`: `IonSideMenus` and `IonSideMenuContent`.

`IonSideMenuContent` contains the page content as it would for a normal page without side menus, 

`IonSideMenus` contains the two actual side menus wrapped in the `IonSideMenu` component.

A complete example can be found [here](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/layouts/main.jsx).

**More information**
    
- Example: [Side Menu demo](https://app.pors.net/sideMenus) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/sidemenus.jsx))
- SCSS: [menu.scss](https://github.com/driftyco/ionic/blob/master/scss/_menu.scss)
- Angular.js ref: [ion-side-menus](http://ionicframework.com/docs/api/directive/ionSideMenus/) 

### Slide box
The Slide Box is a multi-page container where each page can be swiped or dragged between.

**How to use**

Simply add a div for each slide inside the `IonSlideBox` component like:

    <IonSlideBox>
      <div className="slide-demo"><h3>Slide 1</h3></div>
      <div className="slide-demo dark"><h3>Slide 2</h3></div>
      <div className="slide-demo blue"><h3>Slide 3</h3></div>
    </IonSlideBox>



**More information**
    
- Example: [Slide box demo](https://app.pors.net/slideBox) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/slidebox.jsx))
- SCSS: [slide-box.scss](https://github.com/driftyco/ionic/blob/master/scss/_slide-box.scss)
- Angular.js ref: [ion-slide-box](http://ionicframework.com/docs/api/directive/ionSlideBox/) 


### Spinner
The IonSpinner component provides a variety of animated spinners.

**How to use**

Depending on `this.context.ionPlatform` show one of these

    <IonSpinner icon="ios" />
    <IonSpinner icon="android" />

And there a are a few more spinners to choose from, see the demo source.

**More information**
    
- Example: [Spinner demo](https://app.pors.net/spinners) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/spinners.jsx))
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
    
- Example: [Tabs demo](https://app.pors.net/tabs/one) ([source](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/tabs.jsx))
- SCSS: [tabs.scss](https://github.com/driftyco/ionic/blob/master/scss/_tabs.scss)
- Ionic style ref: [Tabs](http://ionicframework.com/docs/components/#tabs)
- Angular.js ref: [ion-tabs](http://ionicframework.com/docs/api/directive/ionTabs/) 


## Helpers

### Platform

React-Ionic changes looks and feel depending on the platform (web, iOS or Android). For this to work you will have to set the `platform` property of IonBody.

The default platform object looks like this:

     platform: {
       isIOS: false,
       isAndroid: false,
       isCordova: false,
       transitionTimeOut: 450,
       name: 'Web'
     }

and is made available as a context: `this.context.ionPlatform`.

An example of how the platform object can be set dynamically is provided [here](https://github.com/reactionic/reactionic-kitchensink/blob/master/app/client/imports/components/utils/helpers.jsx) (requires Meteor).

### Timeouts

When using time-out in a React app, it's best to use something like this [setTimeoutMixin](https://github.com/reactionic/reactionic/blob/master/src/helpers/timeout.js
) mixing.

If you are working in a Meteor app, `Meteor.setTimeout()` will do as well.

### Keyboard

React-Ionic makes use of a Cordova keyboard plugin for some direct keyboard manipulation and access. This [keyboard helper](https://github.com/reactionic/reactionic/blob/master/src/helpers/keyboard.js
) is wrapping that plugin.

This IonKeyboard object is available as a context: `this.context.ionKeyboard`.
