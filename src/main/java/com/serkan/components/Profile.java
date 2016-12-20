package com.serkan.components;

import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class Profile implements EnvironmentAware {
   
   //@Autowired
   Environment environment;
   
   public static final String DEV = "dev";
   public static final String PROD = "prod";
   
   @SuppressWarnings("boxing")
   public Boolean isDevEnvironment()
   {
      for(String sActiveProfile : this.environment.getActiveProfiles())
         if(sActiveProfile.contains(DEV))
            return true;
      
      return false;
   }

   /* (non-Javadoc)
    * @see org.springframework.context.EnvironmentAware#setEnvironment(org.springframework.core.env.Environment)
    */
   @Override
   public void setEnvironment(Environment environment)
   {
      this.environment = environment;
   }
}