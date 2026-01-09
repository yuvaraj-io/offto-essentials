CREATE TABLE connectivity_sim_business_profile (
  id CHAR(36) NOT NULL PRIMARY KEY,

  business_login_id CHAR(36) NOT NULL,

  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,

  is_verified TINYINT(1) DEFAULT 0,

  about TEXT,

  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),

  address TEXT,
  landmark VARCHAR(255),
  pincode VARCHAR(10),

  profile_pic VARCHAR(512),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_connectivity_business_login
    FOREIGN KEY (business_login_id)
    REFERENCES business_login(id)
    ON DELETE CASCADE
);







CREATE TABLE subscriptions (
  id CHAR(36) PRIMARY KEY,
  business_profile_id CHAR(36) NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  revenue DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE sim_services (
  id CHAR(36) NOT NULL PRIMARY KEY,

  connectivity_sim_business_profile_id CHAR(36) NOT NULL,

  name VARCHAR(255) NOT NULL,

  e_sim TINYINT(1) DEFAULT 0,
  passport_required TINYINT(1) DEFAULT 0,
  aadhar_required TINYINT(1) DEFAULT 0,
  photo_required TINYINT(1) DEFAULT 0,

  activation_time TEXT,

  home_delivery_option TINYINT(1) DEFAULT 0,

  pickup_latitude DECIMAL(10, 7),
  pickup_longitude DECIMAL(10, 7),

  sim_replace_availability TINYINT(1) DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_sim_services_business_profile
    FOREIGN KEY (connectivity_sim_business_profile_id)
    REFERENCES connectivity_sim_business_profile(id)
    ON DELETE CASCADE
);


CREATE TABLE sim_service_plans (
  id CHAR(36) PRIMARY KEY,
  sim_service_id CHAR(36) NOT NULL,

  plan_name VARCHAR(255) NOT NULL,
  sim_name VARCHAR(255),
  details TEXT,
  price DECIMAL(10,2) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_sim_service
    FOREIGN KEY (sim_service_id)
    REFERENCES sim_services(id)
    ON DELETE CASCADE
);



CREATE TABLE business_bank_details (
  id CHAR(36) PRIMARY KEY,

  business_profile_id CHAR(36) NOT NULL,

  bank_account_number VARCHAR(50) NOT NULL,
  bank_account_name VARCHAR(255) NOT NULL,
  bank_account_type VARCHAR(50) NOT NULL,
  bank_name VARCHAR(255) NOT NULL,
  branch_name VARCHAR(255) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uniq_business_bank (business_profile_id),

  CONSTRAINT fk_bank_business
    FOREIGN KEY (business_profile_id)
    REFERENCES connectivity_sim_business_profile(id)
    ON DELETE CASCADE
);


CREATE TABLE business_contact_details (
  id CHAR(36) PRIMARY KEY,

  business_profile_id CHAR(36) NOT NULL UNIQUE,

  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_business_contact (business_profile_id)
);
