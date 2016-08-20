var App = React.createClass({
	getInitialState : function() {
		return {data:[]};
	},
	componentDidMount : function(){
		$.ajax({
			url : "./app/testData.json",
			dataType : "json",
			success : function(data){
				this.setState({data : data});
			}.bind(this),
			error : function(xhr,status,err){
				console.error("./js/testData.json",status,err.toString());
			}.bind(this)
		});
	},
	render : function() {
		return (
			<div className="app-content">
				<Header />
				<TreeView data={this.state.data}/>
			</div>
		)
	}
})

ReactDOM.render(
	<App/>,
	document.getElementById('app-container')
);
