var App = React.createClass({
	/*getInitialState : function() {
		return {data:[]};
	},*/
	componentDidMount : function(){
		store.dispatch({
			type 	: 'FETCH_DATA',
			url 	: "https://restcountries.eu/rest/v1/all"
		});
	},
	render : function() {
		return React.createElement("div",{
				className : "app-content"
			},
				React.createElement(Header),
				React.createElement(TreeView),
				React.createElement(Content)
			);
	}
})

const store = Redux.createStore(appReducer,Redux.applyMiddleware(ReduxThunk.default));
store.dispatch(fetchData()).then(function(){
	ReactDOM.render(
		React.createElement(ReactRedux.Provider,{store:store},
			React.createElement(App)
		),
		document.getElementById('app-container')
	);
})
//debugger;
