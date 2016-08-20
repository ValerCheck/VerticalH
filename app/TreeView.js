window.Node = React.createClass({
	getInitialState : function(){
		return {expander : (this.props.children&&this.props.children.length ?
												"+" : ""),
						childrenClass : (this.props.children&&this.props.children.length ?
														"children hide" :
														"empty-children")}
	},
	toggleChildren : function(){
		if (this.state.expander == "+")
			this.setState({expander:"-",childrenClass:"children show"})
		else if (this.state.expander == "-")
			this.setState({expander:"+",childrenClass:"children hide"})
	},
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
					<span className="title" onClick={this.toggleChildren}>
						{this.props.title}
						<span className="expander">{this.state.expander}</span>
					</span>
					<div className={this.state.childrenClass}>
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
