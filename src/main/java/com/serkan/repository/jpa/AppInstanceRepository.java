package com.serkan.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.serkan.jpa.AppInstance;

public interface AppInstanceRepository extends JpaRepository<AppInstance, Long>
{
   List<AppInstance> findByAppInstanceCd(@Param("code") String appInstanceCd);
}
