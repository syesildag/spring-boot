package com.serkan.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public abstract class AbstractTextWebSocketHandler extends TextWebSocketHandler implements MessageListener
{
   @Autowired
   protected StringRedisTemplate stringRedisTemplate;
   
   protected StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
   
   public AbstractTextWebSocketHandler()
   {
   }
   
   public String getChannelName()
   {
      return getClass().getSimpleName().toLowerCase();
   }
   
   public void convertAndSend(String message)
   {
      this.stringRedisTemplate.convertAndSend(this.getChannelName(), message);
   }
   
   public String deserialize(byte[] bytes)
   {
      //stringRedisTemplate.getValueSerializer().deserialize(bytes);
      return this.stringRedisSerializer.deserialize(bytes);
   }
}
