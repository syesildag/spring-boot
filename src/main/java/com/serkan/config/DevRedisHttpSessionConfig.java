/**
 * @author SYESILDAG
 */
package com.serkan.config;

import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.redis.embedded.EnableEmbeddedRedis;

import com.serkan.profiles.DevProfile;

@EnableEmbeddedRedis
@EnableRedisHttpSession
@DevProfile
public class DevRedisHttpSessionConfig
{
}
