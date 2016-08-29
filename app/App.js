var App = React.createClass({
	/*getInitialState : function() {
		return {data:[]};
	},*/
	componentDidMount : function(){
		store.dispatch({
			type 	: 'FETCH_DATA',
			url 	: "https://restcountries.eu/rest/v1/all"
		});
		return;
		var geoPoints = JSON.parse(GetItem('geoPoints'));
		if (geoPoints) {
			this.setState({data : [geoPoints]});
			console.log('geoPoints are in local');
			return;
		};
		$.ajax({
			url : this.props.url,
			dataType : "json",
			success : function(data){
				var handleNode = function(parent,country,field){
					var node = parent.children.filter(function(el){
						return el.title == country[field];
					});

					if (!node.length) {
						node = [{
							title 		: country[field],
							children 	: []
						}];
						parent.children.push(node[0])
					}
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
				console.log(geoPoints);
				debugger;
				//this.setState({data : [geoPoints]});
				SetItem('geoPoints',JSON.stringify(geoPoints));
			}.bind(this),
			error : function(xhr,status,err){
				console.error("./js/testData.json",status,err.toString());
			}.bind(this)
		});
	},
	render : function() {
		return React.createElement("div",{
				className : "app-content"
			},
				React.createElement(Header),
				React.createElement(TreeView)//,{
					//data : this.state.treeViewReducer.data
				//})
			);
	}
})

const store = Redux.createStore(appReducer);
//debugger;
ReactDOM.render(
	React.createElement(ReactRedux.Provider,{store:store},
		React.createElement(App)
	),
	document.getElementById('app-container')
);
