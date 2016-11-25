package com.serkan.jpa;
// Generated 8 avr. 2016 09:15:23 by Hibernate Tools 4.3.1

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * CusDatabases generated by hbm2java
 */
@Entity
@Table(name = "cus_databases", schema = "public", uniqueConstraints = @UniqueConstraint(columnNames = "cus_databases_cd") )
public class CusDatabases implements java.io.Serializable
{
   
   private long cusDatabasesId;
   private String cusDatabasesCd;
   private String cusDatabasesLb;
   private String userSchema;
   private String password;
   private boolean BMaintenanceBl;
   private Set<DtaCustomer> dtaCustomers = new HashSet<DtaCustomer>(0);
   
   public CusDatabases()
   {
   }
   
   public CusDatabases(String cusDatabasesCd, String cusDatabasesLb, String userSchema, boolean BMaintenanceBl)
   {
      this.cusDatabasesCd = cusDatabasesCd;
      this.cusDatabasesLb = cusDatabasesLb;
      this.userSchema = userSchema;
      this.BMaintenanceBl = BMaintenanceBl;
   }
   
   public CusDatabases(long cusDatabasesId, String cusDatabasesCd, String cusDatabasesLb, String userSchema, boolean BMaintenanceBl)
   {
      this.cusDatabasesId = cusDatabasesId;
      this.cusDatabasesCd = cusDatabasesCd;
      this.cusDatabasesLb = cusDatabasesLb;
      this.userSchema = userSchema;
      this.BMaintenanceBl = BMaintenanceBl;
   }
   
   public CusDatabases(long cusDatabasesId, String cusDatabasesCd, String cusDatabasesLb, String userSchema, String password, boolean BMaintenanceBl, Set<DtaCustomer> dtaCustomers)
   {
      this.cusDatabasesId = cusDatabasesId;
      this.cusDatabasesCd = cusDatabasesCd;
      this.cusDatabasesLb = cusDatabasesLb;
      this.userSchema = userSchema;
      this.password = password;
      this.BMaintenanceBl = BMaintenanceBl;
      this.dtaCustomers = dtaCustomers;
   }
   
   @Id
   @SequenceGenerator(name="databases_seq", sequenceName="cus_databases_seq", allocationSize=1)
   @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="databases_seq")
   @Column(name = "cus_databases_id", unique = true, nullable = false)
   public long getCusDatabasesId()
   {
      return this.cusDatabasesId;
   }
   
   public void setCusDatabasesId(long cusDatabasesId)
   {
      this.cusDatabasesId = cusDatabasesId;
   }
   
   @Column(name = "cus_databases_cd", unique = true, nullable = false, length = 128)
   public String getCusDatabasesCd()
   {
      return this.cusDatabasesCd;
   }
   
   public void setCusDatabasesCd(String cusDatabasesCd)
   {
      this.cusDatabasesCd = cusDatabasesCd;
   }
   
   @Column(name = "cus_databases_lb", nullable = false, length = 128)
   public String getCusDatabasesLb()
   {
      return this.cusDatabasesLb;
   }
   
   public void setCusDatabasesLb(String cusDatabasesLb)
   {
      this.cusDatabasesLb = cusDatabasesLb;
   }
   
   @Column(name = "user_schema", nullable = false, length = 128)
   public String getUserSchema()
   {
      return this.userSchema;
   }
   
   public void setUserSchema(String userSchema)
   {
      this.userSchema = userSchema;
   }
   
   @Column(name = "password", length = 128)
   public String getPassword()
   {
      return this.password;
   }
   
   public void setPassword(String password)
   {
      this.password = password;
   }
   
   @Column(name = "b_maintenance_bl", nullable = false)
   public boolean isBMaintenanceBl()
   {
      return this.BMaintenanceBl;
   }
   
   public void setBMaintenanceBl(boolean BMaintenanceBl)
   {
      this.BMaintenanceBl = BMaintenanceBl;
   }
   
   @OneToMany(fetch = FetchType.LAZY, mappedBy = "cusDatabases")
   public Set<DtaCustomer> getDtaCustomers()
   {
      return this.dtaCustomers;
   }
   
   public void setDtaCustomers(Set<DtaCustomer> dtaCustomers)
   {
      this.dtaCustomers = dtaCustomers;
   }
   
}