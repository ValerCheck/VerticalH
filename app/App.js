var App = React.createClass({
	getInitialState : function() {
		return {data:[]};
	},
	componentDidMount : function(){
		/*var geoPoints = JSON.parse(GetItem('geoPoints'));
		if (geoPoints) {
			this.setState({data : [geoPoints]});
			console.log('geoPoints are in local');
			return;
		};*/
		$.ajax({
			url : this.props.url,
			dataType : "json",
			success : function(data){
				console.log(data);
				if (data[0].title) {
					this.setState({data : data});
					return;
				}
				var handleNode = function(parent,country,field){
					var node = parent.children.filter(function(el){
						return el.title == country[field];
					});
					node = node.length ? node : [{
						title 		: country[field],
						children 	: []
					}];
					parent.children.push(node[0]);
					return node;
				}

				var geoPoints = {title:"World",children:[]};
				data.forEach(function(country){
					if (!country.region || !country.subregion) return;

					var region = handleNode(geoPoints, country,'region');
					var subRegion = handleNode(region[0], country,'subregion');
					var localCountry = handleNode(subRegion[0], country, 'name');

					if (country.capital) {
						localCountry[0].children.push({title : country.capital})
					} else localCountry[0].children = undefined;

				});
				this.setState({data : [geoPoints]});
				SetItem('geoPoints',JSON.stringify(geoPoints));
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
	<App url="./app/testData.json"/>,
	document.getElementById('app-container')
);
