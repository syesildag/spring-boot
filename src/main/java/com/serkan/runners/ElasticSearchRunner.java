/**
 * 
 */
package com.serkan.runners;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import com.serkan.elasticsearch.Customer;
import com.serkan.repository.elasticsearch.CustomerRepository;

@Component
public class ElasticSearchRunner implements CommandLineRunner, Ordered, DisposableBean
{
   static Log logger = LogFactory.getLog(ElasticSearchRunner.class);
   
   private CustomerRepository customerRepository;
   
   public ElasticSearchRunner()
   {
   }
   
   @Autowired
   public ElasticSearchRunner(CustomerRepository customerRepository)
   {
      this.customerRepository = customerRepository;
   }
   
   @Override
   public void run(String ... args)
      throws Exception
   {
      logger.debug("Order: "+getOrder()+": ElasticSearchRunner args: " + args);
      
      this.customerRepository.deleteAll();
      saveCustomers();
      fetchAllCustomers();
      fetchIndividualCustomers();
   }
   
   /* (non-Javadoc)
    * @see org.springframework.core.Ordered#getOrder()
    */
   @Override
   public int getOrder()
   {
      return 0;
   }
   
   /* (non-Javadoc)
    * @see org.springframework.beans.factory.DisposableBean#destroy()
    */
   @Override
   public void destroy()
      throws Exception
   {
      logger.debug("ElasticSearchRunner destroyed...");
   }
   
   private void saveCustomers() {
      this.customerRepository.save(new Customer("Alice", "Smith", 25));
      this.customerRepository.save(new Customer("Bob", "Smith", 32));
   }
   
   private void fetchAllCustomers() {
      logger.debug("Customers found with findAll():");
      logger.debug("-------------------------------");
      for (Customer customer : this.customerRepository.findAll()) {
         logger.debug(customer);
      }
   }
   
   private void fetchIndividualCustomers() {
      logger.debug("Customer found with findByFirstName('Alice'):");
      logger.debug("--------------------------------");
      logger.debug(this.customerRepository.findByFirstName("Alice"));

      logger.debug("Customers found with findByLastName('Smith'):");
      logger.debug("--------------------------------");
      
      for (Customer customer : this.customerRepository.findByLastName("Smith"))
         logger.debug(customer);
   }
}
