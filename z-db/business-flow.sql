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
