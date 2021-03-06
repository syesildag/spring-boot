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
   
   <script src="/resources/js/dist/jreact.js"></script>
   
   <script type="text/javascript">
       $(document).ready(function() {
       });
   </script>
</head>

<body>
   <table class="table-striped table-bordered table-condensed table-hover">
     <tr>
       <th><h2>Links</h2></th>
     </tr>
     <tr>
       <td><a href="/rest">REST</a></td>
     </tr>
     <tr>
       <td><a href="/welcome/chat">Chat (WebSocket)</a></td>
     </tr>
     <tr>
       <c:url value="/welcome/test" var="testURL">
         <c:param name="echo" value="Hello World!"/>
       </c:url>
       <td><a href="${testURL}">Test</a></td>
     </tr>
     <tr>
       <td><a href="/welcome/redux">Counter (Vanilla Redux)</a></td>
     </tr>
     <tr>
       <td><a href="/welcome/jreact">JReact</a></td>
     </tr>
     <tr>
       <td><a href="/welcome/scrollSync">ScrollSync</a></td>
     </tr>
     <tr>
       <td><a href="/welcome/redirect">REDIRECT</a></td>
     </tr>
     <tr>
       <td>time: ${time} <br> message: ${message}</td>
     </tr>
   </table>
</body>

</html>