window.Content = React.createClass({
  render : function(){
    return React.createElement("section",{className:'main-content'},
      React.createElement("h2",{className : 'welcome-message'},
        "Hi there =)\n" +
        "I am tired of all that test things with Redux and derived things.\n"+
        "All you see here is possible thanks to those guys: React, Redux and Redux Thunk.\n"+
        "Here should've been some content depended on selection or search.\n"+
        "But Search is not working so far. And you won't see anything here.\n"+
        "However, you still can have some fun with that tree of countries to the left.\n",
        React.createElement("a",{href:"https://github.com/Valercheck/VerticalH",target:"_blank"},
          "Click here for some Source"
        )
      )
    );
  }
});
