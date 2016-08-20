var Node = React.createClass({
	render : function(){
		var childNodes;
		if (this.props.children) {
			childNodes = this.props.children.map(function(node,i){
				return (
					<Node title={node.title} key={i} children={node.children}/>
				);
			})
		}

		return (
				<div className="tree-node">
					<span className="title">{this.props.title}</span>
					<div className={(this.props.children && this.props.children.length) ?
													"children" :
													"empty-children"}>
						{childNodes}
					</div>
				</div>
		)
	}
});

var TreeView = React.createClass({
	render : function(){

		var nodes = this.props.data.map(function(node, i){
			return (
				<Node title={node.title} key={i} children={node.children}/>
			);
		});
		return (
			<div className="tree-view">
				{nodes}
			</div>
		)
	}
});

var App = React.createClass({
	getInitialState : function() {
		return {data:[]};
	},
	componentDidMount : function(){
		$.ajax({
			url : "./app/testData.json",
			dataType : "json",
			success : function(data){
				console.log(data);
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
				<TreeView data={this.state.data}/>
			</div>
		)
	}
})

ReactDOM.render(
	<App/>,
	document.getElementById('app-container')
);
