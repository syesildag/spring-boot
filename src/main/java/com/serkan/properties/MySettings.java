/**
 * @author SYESILDAG
 */
package com.serkan.properties;

import java.util.ArrayList;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Required;

//@Component
//@ConfigurationProperties(prefix="my")
public class MySettings
{
   @NotNull
   public String message;
   
   public ArrayList<String> servers;
   public String secret;
   public int number;
   public long bignumber;
   public int numberLessThanTen;
   public int numberInRange;
   public String embeddedRedisServerMaxHeap;
   
   public MySettings()
   {
   }

   /**
    * @return the servers
    */
   public ArrayList<String> getServers()
   {
      return servers;
   }

   /**
    * @param servers the servers to set
    */
   public void setServers(ArrayList<String> servers)
   {
      this.servers = servers;
   }

   /**
    * @return the message
    */
   public String getMessage()
   {
      return message;
   }

   /**
    * @param message the message to set
    */
   @Required
   public void setMessage(String message)
   {
      this.message = message;
   }

   /**
    * @return the secret
    */
   public String getSecret()
   {
      return secret;
   }

   /**
    * @param secret the secret to set
    */
   public void setSecret(String secret)
   {
      this.secret = secret;
   }

   /**
    * @return the number
    */
   public int getNumber()
   {
      return number;
   }

   /**
    * @param number the number to set
    */
   public void setNumber(int number)
   {
      this.number = number;
   }

   /**
    * @return the bignumber
    */
   public long getBignumber()
   {
      return bignumber;
   }

   /**
    * @param bignumber the bignumber to set
    */
   public void setBignumber(long bignumber)
   {
      this.bignumber = bignumber;
   }

   /**
    * @return the numberLessThanTen
    */
   public int getNumberLessThanTen()
   {
      return numberLessThanTen;
   }

   /**
    * @param numberLessThanTen the numberLessThanTen to set
    */
   public void setNumberLessThanTen(int numberLessThanTen)
   {
      this.numberLessThanTen = numberLessThanTen;
   }

   /**
    * @return the numberInRange
    */
   public int getNumberInRange()
   {
      return numberInRange;
   }

   /**
    * @param numberInRange the numberInRange to set
    */
   public void setNumberInRange(int numberInRange)
   {
      this.numberInRange = numberInRange;
   }

   /**
    * @return the embeddedRedisServerMaxHeap
    */
   public String getEmbeddedRedisServerMaxHeap()
   {
      return embeddedRedisServerMaxHeap;
   }

   /**
    * @param embeddedRedisServerMaxHeap the embeddedRedisServerMaxHeap to set
    */
   public void setEmbeddedRedisServerMaxHeap(String embeddedRedisServerMaxHeap)
   {
      this.embeddedRedisServerMaxHeap = embeddedRedisServerMaxHeap;
   }
}
