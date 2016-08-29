var nextNodeId = 0;

const ADD_NODE = function(title,children){
  return {
    type : 'ADD_NODE',
    id : nextNodeId++,
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
  state = state || {data : []};//{data:{},url:"https://restcountries.eu/rest/v1/all"};
  switch(action.type){
    case 'FETCH_DATA':
      console.log('IN FETCH_DATA');
      if (GetItem('geoPoints')) {
        var data = [JSON.parse(GetItem('geoPoints'))].map(
          function(el){
            return nodeReducer(undefined,ADD_NODE(el.title,el.children));
          });
        return Object.assign({},state,{data});
      }
      else return state;
    case 'TOGGLE_NODE':
      return {
        data : state.data.map(function(node){
            return nodeReducer(node,action);
          })
      }
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
