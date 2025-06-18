CREATE TABLE serviceType (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE serviceSubType (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    service_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES serviceType(id) ON DELETE CASCADE
);

CREATE TABLE supplierCompany (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activities TEXT,
    address_line_1 VARCHAR(255),
    address_line_2 VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    state VARCHAR(100),
    country VARCHAR(100),
    licence_no VARCHAR(100),
    service_type VARCHAR(255)
);

CREATE TABLE suppliersAccess (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_id text,
    name VARCHAR(255) NOT NULL,
    supplier_company_id UUID NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    power VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_company_id) REFERENCES supplierCompany(id) ON DELETE CASCADE
);


CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    service_type VARCHAR(255),
    service_sub_type VARCHAR(255),
    description TEXT,
    duration INT[],  -- Array of integers to represent the duration
    cancellation_policy TEXT,
    features TEXT[],  -- Array of features
    includes TEXT[],  -- Array of included items
    excludes TEXT[],  -- Array of excluded items
    location VARCHAR(255),
    maximum_group_size INT,
    price DECIMAL(10, 2),
    special_benefits TEXT[],  -- Array of special benefits
    status VARCHAR(50),
    supplier_access_id UUID NOT NULL,  -- Foreign key from suppliersAccess table
    FOREIGN KEY (supplier_access_id) REFERENCES supplieraccess(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_no VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicebookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id UUID NOT NULL,  -- Foreign key from services table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    supplier_id UUID NOT NULL,  -- Foreign key from supplierCompany or suppliersAccess table
    payment_status VARCHAR(50),
    payment_intent_id UUID,
    created_by UUID NOT NULL,  -- Foreign key from users table
    pickup_location VARCHAR(255),
    pickup_date DATE NOT NULL,
    pickup_time TIME NOT NULL;
    city VARCHAR(100),
    street VARCHAR(255),
    address_line_1 VARCHAR(255),
    address_line_2 VARCHAR(255),
    postal_code VARCHAR(20),
    state VARCHAR(100),
    country VARCHAR(100),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES supplieraccess(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE

);

CREATE TABLE servicebookingperson (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,  -- Foreign key from users table
    service_id UUID NOT NULL,  -- Foreign key from services table
    supplier_id UUID NOT NULL,  -- Foreign key from suppliersAccess table
    booking_id UUID NOT NULL,  -- Foreign key from serviceBookings table
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES supplieraccess(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES servicebookings(id) ON DELETE CASCADE
);

CREATE TABLE servicecomments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,  -- Foreign key from users table
    service_id UUID NOT NULL,  -- Foreign key from services table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating INT,  -- Rating value
    description TEXT,
    location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE promoCode (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    supplier_id UUID NOT NULL,  -- Foreign key to the supplier (e.g., suppliersAccess table)
    discount DECIMAL(10, 2) NOT NULL,  -- Discount value (e.g., 10.50 for a 10.50% discount)
    status VARCHAR(50) NOT NULL,  -- Status of the promo code (e.g., "active", "expired")
    FOREIGN KEY (supplier_id) REFERENCES supplieraccess(id) ON DELETE CASCADE
);

create table contacts (
  id uuid default gen_random_uuid() primary key,  -- UUID for unique identifier
  created_at timestamptz default current_timestamp, -- Timestamp for creation date
  first_name text not null,  -- First name
  last_name text not null,   -- Last name
  email text not null unique, -- Email (unique constraint to prevent duplicates)
  message text               -- Message (optional field)
);

CREATE TABLE promocodes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- Unique identifier
    code TEXT UNIQUE NOT NULL, -- Promo code text
    discount_value NUMERIC NOT NULL, -- Discount value
    min_ticket_price NUMERIC, -- Minimum ticket price for the promo code to apply
    created_at TIMESTAMPTZ DEFAULT NOW(), -- Timestamp of when the promo code is created
    end_date TIMESTAMPTZ, -- Expiration date of the promo code
    supplier_id UUID REFERENCES supplieraccess(id) ON DELETE CASCADE, -- Reference to the supplieraccess table
    service_id UUID REFERENCES services(id) ON DELETE CASCADE -- Reference to the service table
);

CREATE TABLE promocodeusages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- Unique identifier
    promo_code_id UUID REFERENCES promo_codes(id) ON DELETE CASCADE, -- Reference to the promo codes table
    user_id UUID NOT NULL, -- Hardcoded user ID will be inserted dynamically
    service_id UUID REFERENCES services(id) ON DELETE CASCADE, -- Reference to the services table
    created_at TIMESTAMPTZ DEFAULT NOW() -- Timestamp of when the promo code is used
);

CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    redirect_url TEXT,
    more_info TEXT,
    created_by TEXT DEFAULT 'admin' NOT NULL,
    image TEXT
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_access_id UUID REFERENCES supplieraccess(id) ON DELETE CASCADE, -- Supplier receiving the notification
    type TEXT CHECK (type IN ('bookingalerts', 'paymentalerts', 'reviewsalerts', 'servicealerts')), -- Notification type
    title TEXT NOT NULL, -- Short title for the notification
    message TEXT NOT NULL, -- Detailed notification message
    is_read BOOLEAN DEFAULT FALSE, -- Whether the notification has been read
    created_at TIMESTAMP DEFAULT NOW(), -- Timestamp of when the notification was created
    seen_at TIMESTAMP NULL -- Timestamp when the supplier saw the notification (NULL if unseen)
)

-- Create the function to handle booking notifications
CREATE OR REPLACE FUNCTION handle_booking_notifications()
RETURNS TRIGGER AS $$
BEGIN
    -- Case 1: A new booking is inserted
    IF TG_OP = 'INSERT' THEN
        INSERT INTO notifications (supplier_id, type, title, message, is_read, created_at)
        VALUES (
            NEW.supplier_id,
            'bookingalerts',
            'New Booking Alert',
            'You have received a new booking request.',
            FALSE,
            NOW()
        );
    
    -- Case 2: Booking status is updated
    ELSIF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
        IF NEW.status = 'confirmed' THEN
            INSERT INTO notifications (supplier_id, type, title, message, is_read, created_at)
            VALUES (
                NEW.supplier_id,
                'bookingalerts',
                'Booking Confirmed Alert',
                'A booking has been confirmed.',
                FALSE,
                NOW()
            );
        ELSIF NEW.status = 'cancelled' THEN
            INSERT INTO notifications (supplier_id, type, title, message, is_read, created_at)
            VALUES (
                NEW.supplier_id,
                'bookingalerts',
                'Booking Canceled Alert',
                'A booking has been cancelled.',
                FALSE,
                NOW()
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the function after INSERT or UPDATE on bookings
CREATE TRIGGER trigger_booking_notifications
AFTER INSERT OR UPDATE ON servicebookings
FOR EACH ROW
EXECUTE FUNCTION handle_booking_notifications();

-- Create or replace function to handle review notifications
CREATE OR REPLACE FUNCTION handle_review_notifications()
RETURNS TRIGGER AS $$
DECLARE
    supplier_id UUID;
    service_name TEXT;
BEGIN
    -- Fetch the supplier access ID and service name for the reviewed service
    SELECT sa.id, s.name INTO supplier_id, service_name
    FROM supplieraccess sa
    JOIN services s ON sa.service_id = s.id
    WHERE s.id = NEW.service_id
    LIMIT 1;

    -- Insert a new notification for the supplier
    IF supplier_id IS NOT NULL THEN
        INSERT INTO notifications (supplier_id, type, title, message, is_read, created_at)
        VALUES (
            supplier_id,
            'reviewsalerts',
            'New Review Alert',
            'A new review has been posted for your service: ' || service_name || '.',
            FALSE,
            NOW()
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the function after INSERT on servicecomments
CREATE TRIGGER trigger_review_notifications
AFTER INSERT ON servicecomments
FOR EACH ROW
EXECUTE FUNCTION handle_review_notifications();

-- Create or replace function to send notifications when service status changes
CREATE OR REPLACE FUNCTION handle_service_status_change()
RETURNS TRIGGER AS $$
DECLARE
    supplier_id UUID;
BEGIN
    -- Get supplier_access_id for the service
    SELECT supplier_id INTO supplier_id
    FROM services
    WHERE id = NEW.id;

    -- If status is updated to 'active', send an approval notification
    IF NEW.status = 'active' THEN
        INSERT INTO notifications (supplier_id, type, title, message, is_read, created_at)
        VALUES (
            supplier_id,
            'servicealerts',
            'Service Approved',
            'Your service "' || NEW.name || '" has been approved and is now live on the website.',
            FALSE,
            NOW()
        );
    END IF;

    -- If status is updated to 'rejected', send a rejection notification
    IF NEW.status = 'inactive' THEN
        INSERT INTO notifications (supplier_id, type, title, message, is_read, created_at)
        VALUES (
            supplier_id,
            'servicealerts',
            'Service Rejected',
            'Your service "' || NEW.name || '" has been rejected by the admin.',
            FALSE,
            NOW()
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function on service status change
CREATE TRIGGER trigger_service_status_notifications
AFTER UPDATE OF status ON services
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION handle_service_status_change();

CREATE TABLE payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE payout_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES supplieraccess(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, approved, rejected
    requested_at TIMESTAMPTZ DEFAULT now(),
    processed_at TIMESTAMPTZ
);

CREATE TABLE supplier_bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES supplieraccess(id) ON DELETE CASCADE,
    stripe_account_id VARCHAR(255) NOT NULL, -- Supplier’s Stripe Connect account ID
    account_holder_name VARCHAR(255) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    account_number VARCHAR(255) NOT NULL,
    iban VARCHAR(34) NOT NULL, -- Used in Malta instead of routing number
    swift_code VARCHAR(50) NOT NULL,
    account_type VARCHAR(50) CHECK (account_type IN ('checking', 'savings')) NOT NULL DEFAULT 'checking',
    country VARCHAR(50) NOT NULL , -- Malta as default
    currency VARCHAR(10) NOT NULL , -- Euro as default
    payout_schedule VARCHAR(20) CHECK (payout_schedule IN ('weekly', 'biweekly', 'monthly')) NOT NULL DEFAULT 'monthly',
    status VARCHAR(20) CHECK (status IN ('pending', 'verified', 'rejected')) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION notify_supplier_company_status()
RETURNS TRIGGER AS $$
DECLARE 
  supplier_id UUID;
BEGIN
  -- Wait until supplieraccess is created (Check if row exists)
  SELECT id INTO supplier_id 
  FROM supplieraccess 
  WHERE supplier_company_id = NEW.id 
  LIMIT 1;

  -- If no supplier_id is found, delay notification creation
  IF supplier_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- If status is 'pending', notify the supplier
  IF NEW.status = 'pending' THEN
    INSERT INTO notifications (type, title, message, is_read, supplier_id)
    VALUES (
      'companyalerts', 
      'Company Registration Pending', 
      'Your company registration is pending approval.', 
      FALSE, 
      supplier_id
    );
  END IF;

  -- If status changes to 'active', notify supplier that company is approved
  IF NEW.status = 'active' THEN
    INSERT INTO notifications (type, title, message, is_read, supplier_id)
    VALUES (
      'companyalerts', 
      'Company Approved', 
      'Your company has been approved! You can now add services.', 
      FALSE, 
      supplier_id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION notify_supplier_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (type, title, message, is_read, supplier_id)
  VALUES (
    'companyalerts', 
    'Company Registration Pending', 
    'Your company registration is pending approval.', 
    FALSE, 
    NEW.id -- Supplier ID now exists
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Trigger to supplieraccess table
CREATE TRIGGER trigger_notify_supplier_created
AFTER INSERT ON supplieraccess
FOR EACH ROW
EXECUTE FUNCTION notify_supplier_created();






-- itineraries tables
-- Table: itineraries
CREATE TABLE itineraries (
    id SERIAL PRIMARY KEY,
    trip_name VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: itinerary_days
CREATE TABLE itinerary_days (
    id SERIAL PRIMARY KEY,
    itinerary_id INTEGER NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_id) REFERENCES itineraries(id) ON DELETE CASCADE
);

-- Table: itinerary_steps
CREATE TABLE itinerary_steps (
    id SERIAL PRIMARY KEY,
    itinerary_day_id INTEGER NOT NULL,
    step_number INTEGER NOT NULL,
    step_type VARCHAR(50) CHECK (step_type IN ('accommodation', 'transportation', 'activity', 'food', 'note', 'place_to_go')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_day_id) REFERENCES itinerary_days(id) ON DELETE CASCADE,
    UNIQUE (itinerary_day_id, step_number)
);

-- Table: accommodations
CREATE TABLE accommodations (
    id SERIAL PRIMARY KEY,
    itinerary_step_id INTEGER NOT NULL,
    place_name VARCHAR(255) NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    check_in_time TIME,
    check_out_time TIME,
    booking_number VARCHAR(100),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_step_id) REFERENCES itinerary_steps(id) ON DELETE CASCADE
);

-- Table: transportations
CREATE TABLE transportations (
    id SERIAL PRIMARY KEY,
    itinerary_step_id INTEGER NOT NULL,
    type VARCHAR(50) CHECK (type IN ('flight', 'train', 'boat', 'car', 'bus')) NOT NULL,
    name VARCHAR(255),
    departure_location VARCHAR(255),
    departure_date DATE,
    arrival_location VARCHAR(255),
    arrival_date DATE,
    is_booked BOOLEAN DEFAULT FALSE,
    departure_time TIME,
    arrival_time TIME,
    transport_number VARCHAR(100),
    booking_number VARCHAR(100),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_step_id) REFERENCES itinerary_steps(id) ON DELETE CASCADE
);

-- Table: activities
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    itinerary_step_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    date DATE,
    is_booked BOOLEAN DEFAULT FALSE,
    time TIME,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_step_id) REFERENCES itinerary_steps(id) ON DELETE CASCADE
);

-- Table: food
CREATE TABLE food (
    id SERIAL PRIMARY KEY,
    itinerary_step_id INTEGER NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    time TIME,
    number_of_guests INTEGER,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_step_id) REFERENCES itinerary_steps(id) ON DELETE CASCADE
);

-- Table: notes
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    itinerary_step_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_step_id) REFERENCES itinerary_steps(id) ON DELETE CASCADE
);

-- Table: places_to_go
CREATE TABLE places_to_go (
    id SERIAL PRIMARY KEY,
    itinerary_step_id INTEGER NOT NULL,
    place_name VARCHAR(255) NOT NULL,
    time TIME,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_step_id) REFERENCES itinerary_steps(id) ON DELETE CASCADE
);


-- update booking status to complete trigger
CREATE OR REPLACE FUNCTION update_booking_status()
RETURNS TRIGGER AS $$
DECLARE 
    booking_end TIMESTAMP;
BEGIN
    -- Only proceed if the status is "confirmed"
    IF NEW.status = 'confirmed' THEN
        -- Calculate the booking end time by adding the service duration
        SELECT (NEW.start_date + NEW.pickup_time)::TIMESTAMP + INTERVAL '1 hour' * s.duration 
        INTO booking_end
        FROM service s
        WHERE s.id = NEW.service_id;

        -- Check if the current timestamp has passed the booking end time
        IF NOW() >= booking_end THEN
            NEW.status := 'completed';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Trigger
CREATE TRIGGER check_and_complete_booking
BEFORE UPDATE ON servicebookings
FOR EACH ROW
WHEN (OLD.status = 'confirmed') -- Only trigger when status is already confirmed
EXECUTE FUNCTION update_booking_status();
