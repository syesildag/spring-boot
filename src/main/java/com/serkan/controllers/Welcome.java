package com.serkan.controllers;

import java.util.Date;
import java.util.Enumeration;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.scheduling.quartz.SimpleThreadPoolTaskExecutor;
import org.springframework.session.redis.embedded.RedisServerPort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.serkan.components.IEngine;
import com.serkan.components.Profile;
import com.serkan.elasticsearch.Customer;
import com.serkan.repository.elasticsearch.CustomerRepository;
import com.serkan.repository.jpa.AppInstanceRepository;
import com.serkan.jpa.AppInstance;
import com.serkan.properties.MySettings;

@Controller
@RequestMapping(value="/welcome", method=RequestMethod.GET)
public class Welcome
{
   AtomicLong al = new AtomicLong(999L);
   
   @Autowired
   AppInstanceRepository appInstanceRepository;
   
   @Autowired
   JpaProperties jpaProperties;
   
   //@Value("${my.message}")
   //private String message;
   
   @Autowired
   MySettings mySettings;
   
   @Autowired
   ServerProperties serverProperties;
   
   @RedisServerPort
   String sRedisServerPort;
   
   @Autowired
   Profile profile;
   
   @Autowired
   IEngine engine;
   
   @Autowired
   SimpleThreadPoolTaskExecutor mySimpleThreadPoolTaskExecutor;
   
   @Autowired
   ThreadPoolTaskExecutor myThreadPoolTaskExecutor;
   
   @Autowired
   CustomerRepository customerRepository;
   
   static Log logger = LogFactory.getLog(Welcome.class);
   
   public static class MyRunnable implements Runnable
   {
      public final String name;
      public final Integer index;
      
      public MyRunnable(String name, Integer index)
      {
         this.name = name;
         this.index = index;
      }
      
      @Override
      public void run()
      {
         logger.debug(this.name + " " + this.index);
      }
   }
   
   @RequestMapping(method=RequestMethod.GET)
   public String welcomeHome(@RequestParam(required=false) String action,
                             @RequestParam(required=false) String attributeName,
                             @RequestParam(required=false) String attributeValue,
                             ModelMap modelMap,
                             @SuppressWarnings("unused") HttpServletRequest req,
                             @SuppressWarnings("unused") HttpServletResponse resp,
                             HttpSession session)
   {
      //HttpSession session = req.getSession();
      if(this.profile.isDevEnvironment())
      {
         //long appInstanceId, String appInstanceCd, String appInstanceLb
         long index = this.al.incrementAndGet();
         //AppInstance appInstance = new AppInstance(index, "Code" + index, "Label" + index);
         AppInstance appInstance = new AppInstance("Code" + index, "Label" + index);
         this.appInstanceRepository.save(appInstance);
         
         for(int i = 0; i < 5; i++) {
            final int fi = i;
            
            this.mySimpleThreadPoolTaskExecutor.execute(new MyRunnable("mySimpleThreadPoolTaskExecutor", fi));
            this.myThreadPoolTaskExecutor.execute(new MyRunnable("myThreadPoolTaskExecutor", fi));
         }
      }
      
      if(attributeName != null)
         session.setAttribute(attributeName, attributeValue);
      
      modelMap.addAttribute("time", new Date());
      
      String sOutput = "secret: " + this.mySettings.getSecret() + "<br>";
      
      sOutput += "Engine Request before: "+this.engine.getDatabase()+"<br>";
      this.engine.setDatabase("XXX");
      sOutput += "Engine Request after: "+this.engine.getDatabase()+"<br>";
      
      Enumeration<String> attributeNames = session.getAttributeNames();
      while(attributeNames.hasMoreElements())
      {
         String sLocalAttributeName = attributeNames.nextElement();
         sOutput += "attribute " + sLocalAttributeName + "=>" + session.getAttribute(sLocalAttributeName) + "<br>"; 
      }
      
      for (AppInstance currency : this.appInstanceRepository.findAll())
         sOutput += currency.getAppInstanceCd() + " -> " + currency.getAppInstanceLb() + " -> " + currency.getAppInstanceId() + "<br>";
      
      for (AppInstance currency : this.appInstanceRepository.findByAppInstanceCd("SMITH"))
         sOutput += currency.getAppInstanceCd() + " -> " + currency.getAppInstanceLb() + " -> " + currency.getAppInstanceId() + "<br>";
      
      sOutput += "database -> " + this.jpaProperties.getDatabase() + "<br>";
      sOutput += "redis server port -> " + this.sRedisServerPort + "<br>";
      
      for (Customer customer : this.customerRepository.findAll())
         sOutput += "ElasticSearch: " + customer + "<br>";
      
      modelMap.addAttribute("message", this.mySettings.getMessage() + " with <strong>input</strong> action: " + action + " <br><br>" + sOutput);
      
      if(action != null && action.equals("logout"))
         session.invalidate();
      
      return "welcome";
   }
   
   @SuppressWarnings("static-method")
   @RequestMapping(value="/{room}", method=RequestMethod.GET)
   public String welcomeRoom(@PathVariable String room,
                             ModelMap modelMap,
                             @SuppressWarnings("unused") HttpServletRequest req,
                             @SuppressWarnings("unused") HttpServletResponse resp,
                             @SuppressWarnings("unused") HttpSession session)
   {
      modelMap.addAttribute("room", room);
      return "welcome/" + room;
   }
   
   @SuppressWarnings("static-method")
   @RequestMapping("/foo")
   public String foo(@SuppressWarnings("unused") Map<String, Object> model)
   {
      throw new RuntimeException("Foo");
   }
   
   @SuppressWarnings("static-method")
   @RequestMapping("/redirect")
   public String redirect(@SuppressWarnings("unused") Map<String, Object> model)
   {
      return "redirect:/welcome";
   }
}
