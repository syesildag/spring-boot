package com.serkan.runners;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Component
public class FirstCommandLineRunner implements CommandLineRunner, Ordered, DisposableBean
{
   static Log logger = LogFactory.getLog(FirstCommandLineRunner.class);
   
   @Override
   public void run(String ... args)
      throws Exception
   {
      logger.debug("Order: "+getOrder()+": FirstCommandLineRunner args: " + args);
   }
   
   /* (non-Javadoc)
    * @see org.springframework.core.Ordered#getOrder()
    */
   @Override
   public int getOrder()
   {
      return Ordered.HIGHEST_PRECEDENCE;
   }
   
   /* (non-Javadoc)
    * @see org.springframework.beans.factory.DisposableBean#destroy()
    */
   @Override
   public void destroy()
      throws Exception
   {
      logger.debug("FirstCommandLineRunner destroyed...");
   }
}