window.Node = React.createClass({
	render : function(){
		var childNodes;
		var self = this.props;
		if (this.props.children){
			childNodes = self.children.map(function(node){
				return React.createElement(Node,Object.assign({},node,{
					key:node.id
				}));
			});
		}

		return React.createElement("div",{
			className : "tree-node",
			key : self.id
			onClick : function(e){
				e.stopPropagation();
				store.dispatch(TOGGLE_NODE(self.id));
			}
		},
			React.createElement("span",{
				className : self.children ?
										"title":
										"title leaf",
			},
				self.title,
				React.createElement("span",{
					className:
					(self.children && self.children.length?
						"expander":
						"expander hide"
					)
				},self.expander)
			),
			React.createElement("div",{className:self.childrenClass},
				childNodes));
	}
});

var lazyNodeType = (function(){
	return lazyNode.apply(this,arguments);
});

var lazyNode = React.PropTypes.shape({
	id : React.PropTypes.number.isRequired,
	title : React.PropTypes.string,
	expander : React.PropTypes.string,
	childrenClass : React.PropTypes.string,
	children : React.PropTypes.arrayOf(lazyNodeType)
});

window.Node.propTypes = {
	id : React.PropTypes.number,
	title : React.PropTypes.string,
	expander : React.PropTypes.string,
	childrenClass : React.PropTypes.string,
	children : React.PropTypes.arrayOf(lazyNode)
}

window.TreeView = React.createClass({
	render : function(){
		var self = this.props;
		if (!self.data.length)
			return React.createElement("div",{className:"tree-view"});

		var nodes = self.data.map(function(node){
			return React.createElement(Node,Object.assign({},node,{
				key					: node.id,
			}));
		});

		return React.createElement("div",{className:"tree-view"},nodes);
	}
});

window.TreeView.propTypes = {
	data : React.PropTypes.arrayOf(React.PropTypes.object.isRequired)
}

window.TreeView = ReactRedux.connect(
  mapStateToPropsTreeView
)(TreeView);
