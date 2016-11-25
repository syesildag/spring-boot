package org.springframework.session.redis.embedded;

import java.io.IOException;
import java.util.ArrayList;

public class RedisServer extends redis.embedded.RedisServer
{
   public static final String EMBEDDED_REDIS_SERVER_MAX_HEAP = "embedded.redis.server.max.heap";
   public static final String EMBEDDED_REDIS_SERVER_PORT = "embedded.redis.server.port";
   
   public RedisServer(Integer port) throws IOException
   {
      super(port);
      
      ArrayList<String> args = new ArrayList<String>(this.args);
      
      String sRedisServerMaxHeap = System.getProperty(EMBEDDED_REDIS_SERVER_MAX_HEAP);
      if(sRedisServerMaxHeap == null)
         sRedisServerMaxHeap = "1GB";
      
      args.add("--maxheap");
      args.add(sRedisServerMaxHeap);
      
      this.args = args;
   }
}
