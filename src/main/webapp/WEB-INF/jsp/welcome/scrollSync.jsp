<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.serkan.controllers.Welcome" %>
<%@ page import="com.serkan.websocket.WebSocketConfig" %>
<%@ page import="com.serkan.websocket.handlers.Chat" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">

<head>
   <link rel="stylesheet" type="text/css" href="/resources/css/scrollsync.css">
   <script src="/resources/js/dist/scrollsync_bundle.js"></script>
   
   <style type="text/css">
      .selected {color: red;}
      .resizable, .longpress {display: inline-block;}
      .todo-div {background-color: whitesmoke;}
      /*.jreact-resizable-div .todo-div {height: 100%;}*/
   </style>
   
   <script>
   </script>
   
</head>

<body>
   <div>
     <p>
       <span id="scroll_sync_example" />
     </p>
   </div>
</body>

</html>