package com.serkan.websocket;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.session.data.redis.RedisOperationsSessionRepository;
import org.springframework.session.web.socket.server.SessionRepositoryMessageInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.ClassUtils;
import org.springframework.util.SystemPropertyUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer, ApplicationContextAware {
   
   static List<Class<AbstractTextWebSocketHandler>> webSocketHandlers = findClasses(WebSocketConfig.class.getPackage(), AbstractTextWebSocketHandler.class, Component.class);
   
   public static final String PREFIX = "/websocket";
   
   @Autowired
   RedisOperationsSessionRepository redisOperationsSessionRepository;
   
   ApplicationContext applicationContext;
   
   /* (non-Javadoc)
    * @see org.springframework.web.socket.config.annotation.WebSocketConfigurer#registerWebSocketHandlers(org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry)
    */
   @SuppressWarnings({"rawtypes", "unchecked"})
   @Override
   public void registerWebSocketHandlers(WebSocketHandlerRegistry registry)
   {
      for(Class<AbstractTextWebSocketHandler> webSocketHandlerClass : webSocketHandlers) {
         AbstractTextWebSocketHandler webSocketHandler = this.applicationContext.getBean(webSocketHandlerClass);
         registry.addHandler(webSocketHandler, PREFIX + "/" + webSocketHandler.getChannelName())
                 .addInterceptors(new SessionRepositoryMessageInterceptor(this.redisOperationsSessionRepository));
      }
   }
   
   @Bean
   public RedisMessageListenerContainer redisMessageListenerContainer(RedisConnectionFactory connectionFactory)
   {
      RedisMessageListenerContainer container = new RedisMessageListenerContainer();
      container.setConnectionFactory(connectionFactory);
      
      for(Class<AbstractTextWebSocketHandler> webSocketHandlerClass : webSocketHandlers) {
         AbstractTextWebSocketHandler webSocketHandler = this.applicationContext.getBean(webSocketHandlerClass);
         container.addMessageListener(webSocketHandler, new ChannelTopic(webSocketHandler.getChannelName()));
      }
      return container;
   }
   
   @SuppressWarnings("unchecked")
   public static <T, A extends Annotation> List<Class<T>> findClasses(Package basePackage, Class<T> baseClass, Class<A> annotation)
   {
      PathMatchingResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
      CachingMetadataReaderFactory cachingMetadataReaderFactory = new CachingMetadataReaderFactory(resourcePatternResolver);
      
      List<Class<T>> candidates = new ArrayList<>();
      String packageSearchPath = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + ClassUtils.convertClassNameToResourcePath(SystemPropertyUtils.resolvePlaceholders(basePackage.getName())) + "/" + "**/*.class";
      try {
         for (Resource resource : resourcePatternResolver.getResources(packageSearchPath)) {
            if (resource.isReadable()) {
               MetadataReader cachingMetadataReader = cachingMetadataReaderFactory.getMetadataReader(resource);
               
               try {
                  Class<?> c = Class.forName(cachingMetadataReader.getClassMetadata().getClassName());
                  
                  if ((baseClass == null || ClassUtils.isAssignable(baseClass, c))
                        && (annotation == null || c.getAnnotation(annotation) != null))
                     candidates.add((Class<T>)c);
               }
               catch(ClassNotFoundException e) {
                  e.printStackTrace();
               }
            }
         }
      }
      catch(IOException e) {
         e.printStackTrace();
      }
      return candidates;
   }
   
   /* (non-Javadoc)
    * @see org.springframework.context.ApplicationContextAware#setApplicationContext(org.springframework.context.ApplicationContext)
    */
   @Override
   public void setApplicationContext(ApplicationContext applicationContext)
      throws BeansException
   {
      this.applicationContext = applicationContext;
   }
}