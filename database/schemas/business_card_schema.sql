-- Create app_config table for field definitions
CREATE TABLE IF NOT EXISTS app_config (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Text', 'Email', 'Address', 'LongText', 'Date', 'File', 'Enum', 'Show')),
    key BOOLEAN DEFAULT FALSE,
    label VARCHAR(255),
    formula TEXT,
    show BOOLEAN DEFAULT TRUE,
    editable BOOLEAN DEFAULT TRUE,
    required BOOLEAN DEFAULT FALSE,
    initial_value TEXT,
    display_name VARCHAR(255),
    description TEXT,
    search BOOLEAN DEFAULT FALSE,
    scan BOOLEAN DEFAULT FALSE,
    nfc BOOLEAN DEFAULT FALSE,
    pii BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create business_data table for actual form data
CREATE TABLE IF NOT EXISTS business_data (
    id SERIAL PRIMARY KEY,
    card_email VARCHAR(255),
    card_address TEXT,
    card_city VARCHAR(100),
    card_state VARCHAR(100),
    card_country VARCHAR(100),
    card_note TEXT,
    contact_notes TEXT,
    gstin_certificate VARCHAR(500), -- file path/URL
    gstin VARCHAR(50),
    legal_name VARCHAR(255),
    date_of_establishment DATE,
    company_type VARCHAR(100),
    registered_address TEXT,
    directors TEXT,
    company_notes TEXT,
    business_card_available BOOLEAN DEFAULT FALSE,
    company_name VARCHAR(255),
    contact_name VARCHAR(255),
    job_title VARCHAR(255),
    phone VARCHAR(100),
    website VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_business_data_email ON business_data(card_email);
CREATE INDEX IF NOT EXISTS idx_business_data_company ON business_data(company_name, legal_name);
CREATE INDEX IF NOT EXISTS idx_business_data_phone ON business_data(phone);
CREATE INDEX IF NOT EXISTS idx_business_data_gstin ON business_data(gstin);
CREATE INDEX IF NOT EXISTS idx_business_data_created_at ON business_data(created_at);
CREATE INDEX IF NOT EXISTS idx_business_data_business_card_available ON business_data(business_card_available);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_app_config_updated_at BEFORE UPDATE ON app_config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_data_updated_at BEFORE UPDATE ON business_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default app_config records for business card fields
INSERT INTO app_config (name, type, label, display_name, required, search, scan, pii) VALUES
('card_email', 'Email', 'Email Address', 'Email', FALSE, TRUE, TRUE, TRUE),
('card_address', 'Address', 'Address', 'Address', FALSE, FALSE, TRUE, TRUE),
('card_city', 'Text', 'City', 'City', FALSE, TRUE, TRUE, FALSE),
('card_state', 'Text', 'State', 'State', FALSE, TRUE, TRUE, FALSE),
('card_country', 'Text', 'Country', 'Country', FALSE, TRUE, TRUE, FALSE),
('card_note', 'LongText', 'Card Notes', 'Notes', FALSE, FALSE, FALSE, FALSE),
('contact_notes', 'LongText', 'Contact Notes', 'Contact Notes', FALSE, FALSE, FALSE, FALSE),
('gstin_certificate', 'File', 'GSTIN Certificate', 'GSTIN Certificate', FALSE, FALSE, FALSE, FALSE),
('gstin', 'Text', 'GSTIN', 'GSTIN', FALSE, TRUE, FALSE, TRUE),
('legal_name', 'Text', 'Legal Name', 'Legal Name', FALSE, TRUE, TRUE, FALSE),
('date_of_establishment', 'Date', 'Date of Establishment', 'Established', FALSE, FALSE, FALSE, FALSE),
('company_type', 'Enum', 'Company Type', 'Company Type', FALSE, TRUE, FALSE, FALSE),
('registered_address', 'Address', 'Registered Address', 'Registered Address', FALSE, FALSE, TRUE, TRUE),
('directors', 'Text', 'Directors', 'Directors', FALSE, FALSE, FALSE, FALSE),
('company_notes', 'LongText', 'Company Notes', 'Company Notes', FALSE, FALSE, FALSE, FALSE),
('business_card_available', 'Show', 'Business Card Available', 'Has Business Card', FALSE, TRUE, FALSE, FALSE),
('company_name', 'Text', 'Company Name', 'Company', FALSE, TRUE, TRUE, FALSE),
('contact_name', 'Text', 'Contact Name', 'Contact Person', FALSE, TRUE, TRUE, TRUE),
('job_title', 'Text', 'Job Title', 'Job Title', FALSE, FALSE, TRUE, FALSE),
('phone', 'Text', 'Phone Number', 'Phone', FALSE, TRUE, TRUE, TRUE),
('website', 'Text', 'Website', 'Website', FALSE, FALSE, TRUE, FALSE)
ON CONFLICT DO NOTHING;
