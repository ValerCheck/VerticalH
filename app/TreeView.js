window.Node = React.createClass({
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

window.TreeView = React.createClass({
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
