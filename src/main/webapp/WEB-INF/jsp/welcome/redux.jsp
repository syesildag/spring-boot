<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.serkan.controllers.Welcome" %>
<%@ page import="com.serkan.websocket.WebSocketConfig" %>
<%@ page import="com.serkan.websocket.handlers.Chat" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

<head>
   <link rel="stylesheet" type="text/css" href="/resources/css/serkan.css">
   <link rel="stylesheet" type="text/css" href="/resources/css/base.css">
   <link rel="stylesheet" type="text/css" href="/resources/css/index.css">
   <link rel="stylesheet" type="text/css" href="/webjars/jquery-ui/1.11.3/jquery-ui.css">
   
   <link rel="stylesheet" type="text/css" href="/resources/css/bootstrap.css">
   <link rel="stylesheet" type="text/css" href="/resources/css/bootstrap-theme.css">
   
   <script src="/webjars/es5-shim/4.0.6/es5-shim.js"></script>
   <script src="/webjars/es6-shim/0.20.2/es6-shim.js"></script>
   <script src="/webjars/es6-promise/2.0.1/es6-promise.js"></script>
   <script src="/webjars/jquery/2.1.3/jquery.js"></script>
   <script src="/webjars/jquery-ui/1.11.3/jquery-ui.js"></script>
   <script src="/webjars/react/0.14.0/react-with-addons.js"></script>
   <script src="/webjars/react/0.14.0/react-dom.js"></script>
   <script src="/webjars/react-bootstrap/0.28.1/react-bootstrap.js"></script>
   <script src="/webjars/react-dnd/2.0.2/ReactDnD.min.js"></script>
   <script src="/webjars/react-dnd-html5-backend/2.0.0/ReactDnDHTML5Backend.min.js"></script>
   <script src="/webjars/redux/3.0.4/dist/redux.js"></script>
   <script src="/webjars/react-redux/4.0.0/dist/react-redux.js"></script>
   <script src="/webjars/EventEmitter.js/4.3.0/EventEmitter.js"></script>
   <script src="/resources/js/freezer.js"></script>
   <script src="/resources/js/bundle.js"></script>
   
   <script>
     jQuery(function(){
        function counter(state, action) {
          if (typeof state === 'undefined') {
            return 0
          }
          switch (action.type) {
            case 'INCREMENT':
              return state + 1
            case 'DECREMENT':
              return state - 1
            default:
              return state
          }
        }
        var store = Redux.createStore(counter);
        var valueEl = document.getElementById('value');
        function render() {
          valueEl.innerHTML = store.getState().toString();
        }
        render();
        store.subscribe(render);
        
//         document.getElementById('increment')
//           .addEventListener('click', function () {
//             store.dispatch({ type: 'INCREMENT' })
//           });
        
//         document.getElementById('decrement')
//           .addEventListener('click', function () {
//             store.dispatch({ type: 'DECREMENT' })
//           });
        
//         document.getElementById('incrementIfOdd')
//           .addEventListener('click', function () {
//             if (store.getState() % 2 !== 0) {
//               store.dispatch({ type: 'INCREMENT' })
//             }
//           });
        
//         document.getElementById('incrementAsync')
//           .addEventListener('click', function () {
//             setTimeout(function () {
//               store.dispatch({ type: 'INCREMENT' })
//             }, 1000)
//           });
        
        ReactDOM.render(React.createElement(ReactBootstrap.Button,
                                            {bsStyle: "primary", bsSize: "small", onClick: function (){store.dispatch({ type: 'INCREMENT' });}}, 'INCREMENT'),
                        document.getElementById('increment'));
        
        ReactDOM.render(React.createElement(ReactBootstrap.Button,
                                            {bsStyle: "primary", bsSize: "small", onClick: function (){store.dispatch({ type: 'DECREMENT' });}}, 'DECREMENT'),
                        document.getElementById('decrement'));
        
        ReactDOM.render(React.createElement(ReactBootstrap.Button,
                                            {bsStyle: "primary", bsSize: "small", onClick: function (){if(store.getState() % 2 !== 0){store.dispatch({ type: 'INCREMENT' });}}}, 'INCREMENT ID ODD'),
                        document.getElementById('incrementIfOdd'));
        
        ReactDOM.render(React.createElement(ReactBootstrap.Button,
                                            {bsStyle: "primary", bsSize: "small", onClick: function (){setTimeout(function () { store.dispatch({ type: 'INCREMENT' }); }, 1000);}}, 'INCREMENT ASYNC'),
                        document.getElementById('incrementAsync'));
     });
   </script>
   
</head>

<body>
   <div>
     <p>
       Clicked: <h2 id="value">0</h2> times
       <button id="increment">+</button>
       <button id="decrement">-</button>
       <button id="incrementIfOdd">Increment if odd</button>
       <button id="incrementAsync">Increment async</button>
     </p>
   </div>
</body>

</html>