package com.serkan.profiles;

import org.springframework.context.annotation.Profile;

@Profile(com.serkan.components.Profile.DEV)
public @interface DevProfile
{
}
