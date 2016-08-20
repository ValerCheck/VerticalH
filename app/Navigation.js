window.Navigation = React.createClass({
  render : function(){
    return (
      <nav>
        <div className="left-menu">
          <a href="http://github.com/valercheck" target="_blank" className="link-button">DEVELOPER</a>
        </div>
        <div className="right-menu">
          <input type="text" placeholder="Start typing your request"/>
        </div>
      </nav>
    )
  }
});
