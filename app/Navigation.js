window.Navigation = React.createClass({
  render : function(){
    return React.createElement("nav",null,
      React.createElement("div",{className:"left-menu"},
        React.createElement("a",{
          href:"https://github.com/valercheck",
          target : "_blank",
          className : "link-button"
        },"DEVELOPER")
      ),React.createElement("div",{className:"right-menu"},
        React.createElement("input",{type:"text",placeholder:"Search ..."})
      )
    );
  }
});
