package com.serkan.components;

import org.springframework.core.env.Environment;

public interface IEngine
{
   
   /**
    * @return the database
    */
   String getDatabase();
   
   /**
    * @param database the database to set
    */
   void setDatabase(String database);

   Environment getEnvironment();
   
}