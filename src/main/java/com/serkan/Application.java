package com.serkan;

import java.util.concurrent.TimeUnit;

import javax.annotation.PreDestroy;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.quartz.SimpleThreadPoolTaskExecutor;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.web.context.support.ServletRequestHandledEvent;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.serkan.properties.MySettings;

@SpringBootApplication
//@EnableElasticsearchRepositories(repositoryFactoryBeanClass=RestElasticsearchRepositoryFactoryBean.class, basePackageClasses={Customer.class})
//@EnableConfigurationProperties
//@EnableJpaRepositories(basePackages={"com.serkan.repository"})
//@EntityScan(basePackages={"com.serkan.jpa"})
//public class Application extends SpringBootServletInitializer {
public class Application implements ExitCodeGenerator, InitializingBean {
   
   static Log logger = LogFactory.getLog(Application.class);
   
   @Autowired
   ThreadPoolTaskScheduler threadPoolTaskScheduler;
   
   public static void main(String[] args) {
      SpringApplication springApplication = new SpringApplication(Application.class);
      //springApplication.setShowBanner(true);
      
      springApplication.addListeners(new ApplicationListener<ApplicationStartedEvent>() {
         @Override
         public void onApplicationEvent(ApplicationStartedEvent event) {
            System.out.println("ApplicationStartedEvent: args -> " + event);
         }
      });
      
      springApplication.addListeners(new ApplicationListener<ServletRequestHandledEvent>(){
         @Override
         public void onApplicationEvent(ServletRequestHandledEvent event)
         {
            System.out.println("ServletRequestHandledEvent: args -> " + event);
         }
      });
      
      springApplication.run(args);
   }
   
   @SuppressWarnings("static-method")
   @Bean
   public InternalResourceViewResolver jspViewResolver() {
       InternalResourceViewResolver viewResolver  = new InternalResourceViewResolver();
       
       viewResolver.setPrefix("/WEB-INF/jsp/");
       viewResolver.setSuffix(".jsp");
       viewResolver.setViewClass(org.springframework.web.servlet.view.JstlView.class);
       
       return viewResolver ;
   }
   
   //@Bean(destroyMethod = "shutdown")
   //@DevProfile
   //public EmbeddedDatabase dataSource() {
   //    return new EmbeddedDatabaseBuilder().
   //            setType(EmbeddedDatabaseType.H2).
   //            addScript("classpath:schema.sql").
   //            addScript("classpath:data.sql").
   //            build();
   //}
   
   @SuppressWarnings("static-method")
   @Bean
   public SimpleThreadPoolTaskExecutor mySimpleThreadPoolTaskExecutor()
   {
      SimpleThreadPoolTaskExecutor simpleThreadPoolTaskExecutor = new SimpleThreadPoolTaskExecutor();
      simpleThreadPoolTaskExecutor.setThreadCount(2);
      simpleThreadPoolTaskExecutor.setThreadPriority(3);
      simpleThreadPoolTaskExecutor.setInstanceName("Quartz");
      return simpleThreadPoolTaskExecutor;
   }
   
   @SuppressWarnings("static-method")
   @ConfigurationProperties(prefix="my")
   @Bean
   public MySettings mySettings()
   {
      return new MySettings();
   }
   
   @SuppressWarnings("static-method")
   @ConfigurationProperties(prefix="executor")
   @Bean
   public ThreadPoolTaskExecutor myThreadPoolTaskExecutor()
   {
      return new ThreadPoolTaskExecutor();
   }
   
   @SuppressWarnings("static-method")
   @Bean
   public PeriodicTrigger tenSecondPeriodicTrigger()
   {
      return new PeriodicTrigger(10000L, TimeUnit.MILLISECONDS);
   }
   
   @SuppressWarnings("static-method")
   @PreDestroy
   public void destroy()
   {
      System.out.println("Application pre-destroy...");
   }
   
   /* (non-Javadoc)
    * @see org.springframework.boot.ExitCodeGenerator#getExitCode()
    */
   @Override
   public int getExitCode()
   {
      int exitCode = 666;
      System.out.println("Application exit code: " + exitCode);
      return exitCode;
   }
   
   @SuppressWarnings("static-method")
   @Scheduled(initialDelay=1000, fixedRate=5000)
   public void doSomething() {
      logger.debug("running in initialDelay=1000, fixedRate=5000...");
   }
   
   /* (non-Javadoc)
    * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
    */
   @SuppressWarnings("unqualified-field-access")
   @Override
   public void afterPropertiesSet()
      throws Exception
   {
      threadPoolTaskScheduler.schedule(new Runnable()
      {
         @Override
         public void run()
         {
            logger.debug("running in tenSecondPeriodicTrigger...");
         }
      }, tenSecondPeriodicTrigger());
   }
}
