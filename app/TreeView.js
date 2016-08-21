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
				return React.createElement(Node,Object.assign({},this.props,{
					title : node.title,
					children : node.children,
					key: i
				}));
			});
		}
		return React.createElement("div",{className : "tree-node"},
			React.createElement("span",{
				className : "title",
				onClick : this.toggleChildren
			},
				this.props.title,
				React.createElement("span",{
					className:
					(this.props.children&&this.props.children.length?
						"expander":
						"expander hide"
					)
				},this.state.expander)
			),
			React.createElement("div",{className:this.state.childrenClass},
				childNodes));
	}
});

window.TreeView = React.createClass({
	render : function(){
		console.log(this.props.data);
		var nodes = this.props.data.map(function(node, i){
			return React.createElement(Node,Object.assign({},this.props,{
				title:node.title,
				children:node.children,
				key:i
			}));
		});
		return React.createElement("div",{className:"tree-view"},nodes);
	}
});
