var nextNodeId = 0;
var ids = [];

const ADD_NODE = function(title,children){
  //var nextId = 0;
  /*while (ids.indexOf(nextId) > -1)
    nextId = Math.floor((Math.random() * 1024) + 1);*/
  while(ids.indexOf(nextNodeId) > -1)
    nextNodeId+=1;
  ids.push(nextNodeId);

  return {
    type : 'ADD_NODE',
    id : nextNodeId,
    title,
    children
  }
}

const TOGGLE_NODE = function(id){
  return {
    type  : 'TOGGLE_NODE',
    id    : id
  }
}

function nodeReducer(state, action){
  state = state || {};
  switch(action.type){
    case 'ADD_NODE':
      var children;
      if (action.children) {
        children = action.children.map(function(el){
          return nodeReducer(undefined,ADD_NODE(el.title,el.children))
        });
      }
      return {
        id : action.id,
        title : action.title,
        children : children,
        expander : "+",
        childrenClass : (action.children&&action.children.length)?
          "children hide":
          "empty-children"
      };
    case 'TOGGLE_NODE':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({},state,{
        expander : (state.expander == "+" ? "-" : "+"),
        childrenClass : (state.expander == "+" ?
          "children" :
          "children hide")
      })
    default:
      return state;
  }
}

function treeViewReducer(state, action){
  state = state || {data : [],isFetching:false};
  switch(action.type){
    case 'REQUEST_DATA':
      return Object.assign({},state,{
        isFetching : true
      });
    case 'RECEIVE_DATA':
      return Object.assign({},state,{
        isFetching : false,
        data : action.data
      });
    case 'FETCH_DATA':
      console.log('IN FETCH_DATA');
      if (GetItem('geoPoints') || action.data) {
        var obj = GetItem('geoPoints') || action.data;
        var data = [JSON.parse(obj)].map(
          function(el) {
            return nodeReducer(undefined,ADD_NODE(el.title,el.children));
          });
        return Object.assign({},state,{isFetching:false,data});
      }
      else return state;
    case 'TOGGLE_NODE':
      var stack = [], parent, data;
      var closest = {
        parent : undefined,
        data : state.data[0],
        index : 0
      }

      while (closest.data.id != action.id) {
        parent = closest;
        stack.push(parent);
        var indexes = [];
        var closest = parent.data
        .children.filter(function(el,i){
          var cond = (action.id >= el.id);
          if (cond) indexes.push(i);
          return cond;
        });
        if (closest.length) closest = closest[closest.length-1];
        closest = {
          parent  : parent,
          data    : closest,
          index   : indexes[indexes.length - 1]
        }
      }

      closest.data = nodeReducer(closest.data,action);

      while (stack.length) {
        parent = stack.pop();
        parent.data.children[parent.index] = closest.data;
        closest = parent;
      }

      data = [closest.data];
      return { data }
    default:
      return state;
  }
}

const mapStateToPropsTreeView = function(state){
  return {
    data : state.treeViewReducer.data
  }
}

const mapDispatchToPropsTreeView = function(dispatch){
  return {
    dispatch,
    onNodeClick : function(id){
      dispatch(TOGGLE_NODE(id));
    }
  }
}

const appReducer = Redux.combineReducers({
  treeViewReducer
});

function fetchData(){
  return function(dispatch){
    if (GetItem('geoPoints')) return Promise.resolve(true);
    dispatch({type:'REQUEST_DATA'});
    return fetch("https://restcountries.eu/rest/v1/all")
      .then(function(response){
        return response.json()
      })
      .then(function(data){

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
        SetItem('geoPoints',JSON.stringify(geoPoints));
        dispatch({type:'FETCH_DATA',data : [geoPoints]})
      });
  }
}
