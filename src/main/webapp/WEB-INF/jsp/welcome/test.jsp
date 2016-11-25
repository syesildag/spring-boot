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
   
   <script type="text/javascript">
       $(document).ready(function() {
           $('p').animate({
               fontSize: '32px'
           }, "slow");
           
           $.ajax({type: "POST",
             url: "/rest/appInstances",
             data: JSON.stringify({
               //appInstanceId: 24,
               appInstanceCd : "xtra",
               appInstanceLb : "xork"}),
             contentType: "application/json",
             processData: true});
           
//            $.ajax({type: "POST",
//              url: "/rest/customers",
//              data: JSON.stringify({
//                firstName : "Serkan",
//                lastName : "YESILDAG",
//                age : 99 }),
//              contentType: "application/json",
//              processData: true});
           
//            $.ajax({type: "DELETE", url: "/rest/appInstances/17" });
       });
   </script>
</head>

<%String sExample = "Example Test SERKAN";%>

<body>
   session new: <%=session.isNew()%> <br>
   session id: <%=session.getId()%> <br>
   session creation time: <%=session.getCreationTime()%> <br>
   session last accessed time: <%=session.getLastAccessedTime()%> <br>
   
   Welcome class name: <%=Welcome.class.getName()%>
   
   <%=sExample%><br>
   <c:url value="/resources/text.txt" var="url"/>
   <spring:url value="/resources/text.txt" htmlEscape="true" var="springUrl" />
   Spring URL: ${springUrl} at ${time}
   <br>
   <p>JSTL URL: ${url}</p>
   <br>
   This is room: ${room}
   <br>
   This is parameter echo: <%=request.getParameter("echo") %>
</body>

</html>