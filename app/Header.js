window.Header = React.createClass({
  render : function(){
    return React.createElement("header",null,React.createElement(window.Navigation));
    /*(
      <header>
        <Navigation/>
      </header>
    )*/
  }
});
