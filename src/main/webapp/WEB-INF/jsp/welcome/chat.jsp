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
       <%="var sWebSocketPath = '" + getServletContext().getContextPath() + "'"%> + '<%=WebSocketConfig.PREFIX%>' + '/' + '<%=new Chat().getChannelName()%>';
       
       var Chat = {};
       Chat.socket = null;
       
       Chat.connect = function(host) {
           if ('WebSocket' in window) {
               Chat.socket = new WebSocket(host);
           } else if ('MozWebSocket' in window) {
               Chat.socket = new MozWebSocket(host);
           } else {
             Chat.log('Error: WebSocket is not supported by this browser.');
               return;
           }
           
           Chat.socket.onopen = function () {
             Chat.log('Info: WebSocket connection opened.');
               document.getElementById('chat').onkeydown = function(event) {
                   if (event.keyCode == 13) {
                       Chat.sendMessage();
                   }
               };
           };
           
           Chat.socket.onclose = function () {
               document.getElementById('chat').onkeydown = null;
               Chat.log('Info: WebSocket closed.');
           };
           
           Chat.socket.onmessage = function (message) {
             Chat.log(JSON.parse(message.data).sUser + ' -> ' + JSON.parse(message.data).sValue);
           };
       };
       
       Chat.initialize = function() {
           if (window.location.protocol == 'http:') {
               Chat.connect('ws://' + window.location.host + sWebSocketPath);
           } else {
               Chat.connect('wss://' + window.location.host + sWebSocketPath);
           }
       };
       
       Chat.sendMessage = (function() {
           var message = document.getElementById('chat').value;
           if (message != '') {
               Chat.socket.send(JSON.stringify({sUser: 'serkan', sValue: message}));
               document.getElementById('chat').value = '';
           }
       });
       
       Chat.log = (function(message) {
              var console = document.getElementById('console');
              var p = document.createElement('span');
              var br = document.createElement('br');
              //p.style.wordWrap = 'break-word';
              p.innerHTML = message;
              console.appendChild(br);
              console.appendChild(p);
              while (console.childNodes.length > 25) {
                  console.removeChild(console.firstChild);
              }
              console.scrollTop = console.scrollHeight;
          });
       
       Chat.initialize();
   </script>
</head>

<body>
   <input type="text" placeholder="type and press enter to chat" id="chat" />
   <div id="console-container">
     <div id="console"/>
   </div>
   <br>
</body>

</html>