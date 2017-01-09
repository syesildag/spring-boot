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
   <script src="/webjars/react/0.14.0/react-with-addons.js"></script>
   <script src="/webjars/react/0.14.0/react-dom.js"></script>
   <script src="/webjars/jquery/2.1.3/jquery.js"></script>
   <script src="/webjars/jquery-ui/1.11.3/jquery-ui.js"></script>
   <script src="/resources/js/jquery.ui.touch-punch.js"></script>
   <script src="/resources/js/freezer.js"></script>
   <script src="/resources/js/bundle.js"></script>
   
   <script type="text/html" id="serkan">
     <span name="xxxxx">---8<---Test Template---8<---</span>
   </script>
   
   <style type="text/css">
      .selected {color: red;}
      .resizable, .longpress {display: inline-block;}
      .todo-div {background-color: whitesmoke;}
      /*.jreact-resizable-div .todo-div {height: 100%;}*/
   </style>
   
   <script>
   
   JReact.DEBUG = true;
   
   JReact.bootstrap(document);
   
   jQuery(function(){
     var index = 0, todos = [], nIntervalID;
     
     function xxx(e, message){
       todos = todos.map(function(todo){
         
         if(todo.message === message) {
           return jQuery.extend({}, todo, {active: true, selected: e.ctrlKey ? !todo.selected : true});
         }
         else if(!e.ctrlKey && (todo.active || todo.selected) ) {
           return jQuery.extend({}, todo, {active: false, selected: false});
         }
         else if(todo.active) {
           return jQuery.extend({}, todo, {active: false});
         }
         
         return todo;
       });
       
       JReact.renderDOM(JReact.createElement(JReactComponents.Todos, {todos: todos, todoClick: xxx}), jQuery('#value'));
     }
     
     nIntervalID = setInterval(function(){
       ++index;
       
       if(index > 4) {
         clearInterval(nIntervalID);
         todos.shift();
         todos = [{key: index, message: index, resizable: true}, ...todos];
       } else {
         todos = todos.concat({key: index, message: index, active: false, selected: false});
       }
       
       JReact.renderDOM(JReact.createElement(JReactComponents.Todos, {todos: todos, todoClick: xxx}), jQuery('#value'));
     }, 500);
     
     JReact.renderDOM(JReact.createElement(JReactComponents.Counter, {state: {times: 3}}), jQuery('#counter'));
     JReact.renderDOM(JReact.createElement(JReactComponents.MyList, {}), jQuery('#mylist'));
     JReact.renderDOM(JReact.createElement(JReactComponents.MyGridList, {}), jQuery('#mygridlist'));
     JReact.renderDOM(JReact.createElement(JReactComponents.Template, {templateID: 'serkan', name: 'xxxxx', label: 'hello template'}), jQuery('#template'));
   });
   </script>
   
</head>

<body>
   <div>
     <p>
<!--        <span id="counter"></span> -->
<!--        <span id="value"></span> -->
<!--        <span id="svg"></span> -->
<!--        <span id="draggable"></span> -->
<!--        <span id="droppable"></span> -->
<!--        <span id="mylist"></span> -->
<!--        <span>==========</span> -->
       <span id="mygridlist"></span>
       <span id="template"></span>
     </p>
   </div>
</body>

</html>