<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.serkan.controllers.Welcome" %>
<%@ page import="com.serkan.websocket.WebSocketConfig" %>
<%@ page import="com.serkan.websocket.handlers.Chat" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

<head>
   <link rel="stylesheet" href="https://rawgit.com/STRML/react-grid-layout/master/css/styles.css" type="text/css" />
   <link rel="stylesheet" href="https://rawgit.com/STRML/react-grid-layout/master/examples/example-styles.css" type="text/css" />
   <link rel="stylesheet" href="https://rawgit.com/STRML/react-resizable/master/css/styles.css" type="text/css" />
   
<!--    <link rel="stylesheet" type="text/css" href="/resources/css/react-grid-layout-styles.css"> -->
<!--    <link rel="stylesheet" type="text/css" href="/resources/css/react-resizable-styles.css"> -->
   
   <script src="/webjars/es5-shim/4.0.6/es5-shim.js"></script>
   <script src="/webjars/es6-shim/0.20.2/es6-shim.js"></script>
   <script src="/webjars/lodash/4.0.0/lodash.min.js"></script>
   <script src="/webjars/jquery/2.1.3/jquery.js"></script>
   
<!--    <script src="/resources/js/react-with-addons.js"></script> -->
<!--    <script src="/resources/js/react-dom.js"></script> -->
<!--    <script src="/webjars/react/0.14.0/react-with-addons.js"></script> -->
<!--    <script src="/webjars/react/0.14.0/react-dom.js"></script> -->

   <script src="https://fb.me/react-with-addons-0.14.8.js"></script>
   <script src="https://fb.me/react-dom-0.14.8.js"></script>
   
<!--    <script src="https://fb.me/react-with-addons-15.0.1.js"></script> -->
<!--    <script src="https://fb.me/react-dom-15.0.1.js"></script> -->
   
   <script src="/resources/js/react-grid-layout.min.js"></script>
<!--    <script src="/webjars/react-grid-layout/0.9.2/react-grid-layout.min.js"></script> -->
   
   <script type="text/javascript">
       $(document).ready(function() {
         
         var BasicLayout = React.createClass({
           mixins: [React.PureRenderMixin],
           
           componentDidMount: function() {
             var ev = document.createEvent('Event');
             ev.initEvent('resize', true, true);
             window.dispatchEvent(ev);
           },
           
           getDefaultProps: function() {
             return {
               className: "layout",
               items: 3,
               rowHeight: 30,
               width: 100,
               cols: 12
             };
           },
           
           getInitialState: function() {
             var layout = this.generateLayout();
             return {
               layout: layout
             };
           },
           
           generateDOM: function() {
             return _.map(_.range(this.props.items), function(i) {
               return React.DOM.div({key: i}, React.DOM.span({className: "text"}, i));
             });
           },
           
           generateLayout: function() {
             var p = this.props;
             var layout = [];
             var y;
             for (i = 0; i <= p.items - 1; i++) {
               y = p['y'] || Math.ceil(Math.random() * 4) + 1;
               layout[i] = {x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: y, i: i};
             }
             return layout;
           },
           
           render: function() {
             return React.createElement(ReactGridLayout, Object.assign({}, this.props, {layout: this.state.layout}), this.generateDOM());
           }
         });
         
         ReactDOM.render(React.createElement(BasicLayout), document.getElementById('container'));
       });
   </script>
</head>

<body>
   <div id="container"></div>
</body>

</html>