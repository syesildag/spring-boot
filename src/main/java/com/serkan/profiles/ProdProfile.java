package com.serkan.profiles;

import org.springframework.context.annotation.Profile;

@Profile(com.serkan.components.Profile.PROD)
public @interface ProdProfile
{
}
