package com.serkan.websocket.handlers;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.redis.connection.Message;
import org.springframework.session.web.socket.server.SessionRepositoryMessageInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.serkan.websocket.AbstractTextWebSocketHandler;

@Component
public class Chat extends AbstractTextWebSocketHandler
{
   static Log logger = LogFactory.getLog(Chat.class);
   
   Set<WebSocketSession> hWebSocketSessions = Collections.newSetFromMap(new ConcurrentHashMap<WebSocketSession, Boolean>());
   
   public Chat()
   {
   }
   
   /* (non-Javadoc)
    * @see org.springframework.web.socket.handler.AbstractWebSocketHandler#afterConnectionEstablished(org.springframework.web.socket.WebSocketSession)
    */
   @Override
   public void afterConnectionEstablished(WebSocketSession session)
      throws Exception
   {
      this.hWebSocketSessions.add(session);
   }
   
   /* (non-Javadoc)
    * @see org.springframework.web.socket.handler.AbstractWebSocketHandler#handleTextMessage(org.springframework.web.socket.WebSocketSession, org.springframework.web.socket.TextMessage)
    */
   @Override
   protected void handleTextMessage(WebSocketSession session, TextMessage message)
      throws Exception
   {
      Map<String, Object> attributes = session.getAttributes();
      
      //System.out.println("web socket session => " + SessionRepositoryMessageInterceptor.getSessionId(attributes));
      //System.out.println("handling web socket text message => " + message.getPayload());
      //System.out.println("sending redis message => " + message.getPayload());
      
      logger.debug("web socket session => " + SessionRepositoryMessageInterceptor.getSessionId(attributes));
      logger.debug("handling web socket text message => " + message.getPayload());
      logger.debug("sending redis message => " + message.getPayload());
      
      convertAndSend(message.getPayload());
   }
   
   /* (non-Javadoc)
    * @see org.springframework.web.socket.handler.AbstractWebSocketHandler#afterConnectionClosed(org.springframework.web.socket.WebSocketSession, org.springframework.web.socket.CloseStatus)
    */
   @Override
   public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
      throws Exception
   {
      this.hWebSocketSessions.remove(session);
   }
   
   /* (non-Javadoc)
    * @see org.springframework.data.redis.connection.MessageListener#onMessage(org.springframework.data.redis.connection.Message, byte[])
    */
   @Override
   public void onMessage(Message message, byte[] pattern)
   {
      //System.out.println("received redis body => " + stringRedisSerializer.deserialize(message.getBody()));
      //System.out.println("received redis channel => " + stringRedisSerializer.deserialize(message.getChannel()));
      //System.out.println("received redis pattern => " + stringRedisSerializer.deserialize(pattern));
      
      logger.debug("received redis body => " + deserialize(message.getBody()));
      logger.debug("received redis channel => " + deserialize(message.getChannel()));
      logger.debug("received redis pattern => " + deserialize(pattern));
      
      for(WebSocketSession webSocketSession : this.hWebSocketSessions) {
         if(webSocketSession.isOpen()) {
            try {
               webSocketSession.sendMessage(new TextMessage(deserialize(message.getBody())));
            }
            catch(IOException e) {
               StringWriter stringWriter = new StringWriter();
               e.printStackTrace(new PrintWriter(stringWriter));
               logger.error(stringWriter.toString());
            }
         }
      }
   }
}
