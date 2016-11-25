CREATE SEQUENCE app_instance_seq INCREMENT BY 1 MINVALUE 4;

CREATE TABLE app_instance (
    --app_instance_id bigint auto_increment NOT NULL,
    app_instance_id identity NOT NULL,
    app_instance_cd character varying(128) NOT NULL,
    app_instance_lb character varying(128) DEFAULT '_L'::character varying,
    app_instance_jmx_url character varying(256),
    app_instance_type character varying(64));

--ALTER TABLE app_instance ADD CONSTRAINT pk_app_instance PRIMARY KEY (app_instance_id);

CREATE UNIQUE INDEX app_instance_un ON app_instance (app_instance_cd);
--------------------------------------------------------------------------------------------
CREATE SEQUENCE cus_databases_seq INCREMENT BY 1 MINVALUE 4;

CREATE TABLE cus_databases (
    cus_databases_id identity NOT NULL,
    cus_databases_cd character varying(128) NOT NULL,
    cus_databases_lb character varying(128) DEFAULT '_L'::character varying,
    user_schema character varying(128) NOT NULL,
    password character varying(128),
    b_maintenance_bl boolean not null default false);

CREATE UNIQUE INDEX cus_databases_un ON cus_databases (cus_databases_cd);
--------------------------------------------------------------------------------------------
CREATE SEQUENCE dta_customer_seq INCREMENT BY 1 MINVALUE 4;

CREATE TABLE dta_customer (
    dta_customer_id identity NOT NULL,
    app_instance_id bigint NOT NULL,
    cus_databases_id bigint);

CREATE UNIQUE INDEX dta_customer_un ON dta_customer (app_instance_id, cus_databases_id);
CREATE INDEX fk_app_instance_dta_customer ON dta_customer (app_instance_id);
CREATE INDEX fk_cus_database_dta_customer ON dta_customer (cus_databases_id);
