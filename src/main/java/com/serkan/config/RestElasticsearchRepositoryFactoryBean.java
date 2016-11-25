/**
 * 
 */
package com.serkan.config;

import org.springframework.data.elasticsearch.repository.support.ElasticsearchRepositoryFactoryBean;

/**
 * @author SYESILDAG
 *
 */
@SuppressWarnings("rawtypes")
public class RestElasticsearchRepositoryFactoryBean extends ElasticsearchRepositoryFactoryBean
{
   @SuppressWarnings("unchecked")
   @Override
   public void afterPropertiesSet() {
       setMappingContext(new org.springframework.data.elasticsearch.core.mapping.SimpleElasticsearchMappingContext());
       super.afterPropertiesSet();
   }
}
