window.Content = React.createClass({
  render : function(){
    return React.createElement("section",{className:'main-content'},
      React.createElement("h2",{className : 'welcome-message'},
        "Hi there :)\n" +
        "I am tired of all that test things.\n"+
        "Here should been some content depended on selection or search.\n"+
        "But Search is not working so far. And you won't see anything here.\n"+
        "However, you still can have some fun with that tree of countries to the left."
      )
    );
  }
});
