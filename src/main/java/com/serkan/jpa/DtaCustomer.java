package com.serkan.jpa;
// Generated 8 avr. 2016 09:15:23 by Hibernate Tools 4.3.1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * DtaCustomer generated by hbm2java
 */
@Entity
@Table(name = "dta_customer", schema = "public", uniqueConstraints = @UniqueConstraint(columnNames = {"app_instance_id", "cus_databases_id"}) )
public class DtaCustomer implements java.io.Serializable
{
   
   private long dtaCustomerId;
   private AppInstance appInstance;
   private CusDatabases cusDatabases;
   
   public DtaCustomer()
   {
   }
   
   public DtaCustomer(AppInstance appInstance)
   {
      this.appInstance = appInstance;
   }
   
   public DtaCustomer(long dtaCustomerId, AppInstance appInstance)
   {
      this.dtaCustomerId = dtaCustomerId;
      this.appInstance = appInstance;
   }
   
   public DtaCustomer(long dtaCustomerId, AppInstance appInstance, CusDatabases cusDatabases)
   {
      this.dtaCustomerId = dtaCustomerId;
      this.appInstance = appInstance;
      this.cusDatabases = cusDatabases;
   }
   
   @Id
   @SequenceGenerator(name="customer_seq", sequenceName="dta_customer_seq", allocationSize=1)
   @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="customer_seq")
   @Column(name = "dta_customer_id", unique = true, nullable = false)
   public long getDtaCustomerId()
   {
      return this.dtaCustomerId;
   }
   
   public void setDtaCustomerId(long dtaCustomerId)
   {
      this.dtaCustomerId = dtaCustomerId;
   }
   
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "app_instance_id", nullable = false)
   public AppInstance getAppInstance()
   {
      return this.appInstance;
   }
   
   public void setAppInstance(AppInstance appInstance)
   {
      this.appInstance = appInstance;
   }
   
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "cus_databases_id")
   public CusDatabases getCusDatabases()
   {
      return this.cusDatabases;
   }
   
   public void setCusDatabases(CusDatabases cusDatabases)
   {
      this.cusDatabases = cusDatabases;
   }
   
}
