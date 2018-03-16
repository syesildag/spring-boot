package com.serkan.components;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@Scope(value="request", proxyMode=ScopedProxyMode.INTERFACES)
public class Engine implements EnvironmentAware, IEngine {
   
   String database;
   
   //@Autowired
   Environment environment;
   
   /* (non-Javadoc)
    * @see org.springframework.context.EnvironmentAware#setEnvironment(org.springframework.core.env.Environment)
    */
   @Override
   public void setEnvironment(Environment environment)
   {
      this.environment = environment;
   }
   
   @Override
   public Environment getEnvironment()
   {
      return this.environment;
   }
   
   /* (non-Javadoc)
    * @see com.serkan.components.IEngine#getDatabase()
    */
   @Override
   public String getDatabase()
   {
      return this.database;
   }
   
   /* (non-Javadoc)
    * @see com.serkan.components.IEngine#setDatabase(java.lang.String)
    */
   @Override
   public void setDatabase(String database)
   {
      this.database = database;
   }
}