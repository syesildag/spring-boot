/**
 * @author SYESILDAG
 */
package com.serkan.config;

import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

import com.serkan.profiles.ProdProfile;

@EnableRedisHttpSession
@ProdProfile
public class ProdRedisHttpSessionConfig
{
}
