/*
 * Copyright 2002-2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.session.redis.embedded;

import java.io.IOException;
import java.net.BindException;
import java.net.ServerSocket;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertySource;

/**
 * Runs an embedded Redis instance. This is only necessary since we do not want
 * users to have to setup a Redis instance. In a production environment, this
 * would not be used since a Redis Server would be setup.
 *
 * @author Rob Winch
 */
@Configuration
class EmbeddedRedisConfiguration {
	public static final String SERVER_PORT_PROP_NAME = "spring.redis.port";

	@Bean
	public static RedisServerBean redisServer(ConfigurableEnvironment env) {
		RedisServerBean bean = new RedisServerBean();
		env.getPropertySources().addLast(bean);
		return bean;
	}

	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	/**
	 * Implements BeanDefinitionRegistryPostProcessor to ensure this Bean is initialized
	 * before any other Beans. Specifically, we want to ensure that the Redis Server is
	 * started before RedisHttpSessionConfiguration attempts to enable Keyspace
	 * notifications. We also want to ensure that we are able to register the
	 * {@link PropertySource} before any beans are initialized.
	 */
	static class RedisServerBean extends PropertySource<RedisServerBean> implements InitializingBean, DisposableBean, BeanDefinitionRegistryPostProcessor {
	   private static boolean alreadyRunning = false;
		private final int port = getAvailablePort();

		private RedisServer redisServer;

		public RedisServerBean() {
			super("redisServerPortPropertySource");
		}

		/* (non-Javadoc)
		 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
		 */
		@Override
		public void afterPropertiesSet() throws Exception {
			//redisServer = new RedisServer( Arrays.asList(RedisExecProvider.defaultProvider().get().getAbsolutePath(),  "--port", Integer.toString(port)), port );
		   this.redisServer = new RedisServer(this.port);
		   if(!alreadyRunning)
		      this.redisServer.start();
		}
		
		/* (non-Javadoc)
		 * @see org.springframework.beans.factory.DisposableBean#destroy()
		 */
		@Override
		public void destroy() throws Exception {
			if(this.redisServer != null) {
				this.redisServer.stop();
			}
		}
		
		/* (non-Javadoc)
		 * @see org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor#postProcessBeanDefinitionRegistry(org.springframework.beans.factory.support.BeanDefinitionRegistry)
		 */
		@Override
		public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {}

		/* (non-Javadoc)
		 * @see org.springframework.beans.factory.config.BeanFactoryPostProcessor#postProcessBeanFactory(org.springframework.beans.factory.config.ConfigurableListableBeanFactory)
		 */
		@Override
		public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {}

		/* (non-Javadoc)
		 * @see org.springframework.core.env.PropertySource#getProperty(java.lang.String)
		 */
		@Override
		public Object getProperty(String inputName) {
			if(SERVER_PORT_PROP_NAME.equals(inputName)) {
				return this.port;
			}
			return null;
		}

		private static int getAvailablePort() {
			//ServerSocket socket = null;
			String sPort = System.getProperty(RedisServer.EMBEDDED_REDIS_SERVER_PORT);
			try (ServerSocket socket = new ServerSocket(sPort == null ? 0 : Integer.valueOf(sPort))) {
				return socket.getLocalPort();
			} catch(BindException e) {
			   alreadyRunning = true;
			   if(sPort == null)
			      throw new RuntimeException(e);
            return Integer.valueOf(sPort);
			} catch(IOException e) {
				throw new RuntimeException(e);
			}
		}
	}
}