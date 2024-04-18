export async function GET() {
    const industriesData: {name: string}[] = [{'name': 'Archiving Service'}, {'name': 'Call Center'}, {'name': 'Collection Agency'}, {'name': 'College Recruiting'}, {'name': 'Courier Service'}, {'name': 'Delivery'}, {'name': 'Document Preparation'}, {'name': 'Employee Benefits'}, {'name': 'Extermination Service'}, {'name': 'Facilities Support Services'}, {'name': 'Housekeeping Service'}, {'name': 'Human Resources'}, {'name': 'Knowledge Management'}, {'name': 'Office Administration'}, {'name': 'Packaging Services'}, {'name': 'Physical Security'}, {'name': 'Project Management'}, {'name': 'Staffing Agency'}, {'name': 'Trade Shows'}, {'name': 'Virtual Workforce'}, {'name': 'Ad Exchange'}, {'name': 'Ad Network'}, {'name': 'Ad Retargeting'}, {'name': 'Ad Server'}, {'name': 'Ad Targeting'}, {'name': 'Advertising'}, {'name': 'Advertising Platforms'}, {'name': 'Affiliate Marketing'}, {'name': 'Local Advertising'}, {'name': 'Mobile Advertising'}, {'name': 'Native Advertising'}, {'name': 'Outdoor Advertising'}, {'name': 'SEM'}, {'name': 'Social Media Advertising'}, {'name': 'Agriculture'}, {'name': 'AgTech'}, {'name': 'Animal Feed'}, {'name': 'Aquaculture'}, {'name': 'Equestrian'}, {'name': 'Farming'}, {'name': 'Forestry'}, {'name': 'Horticulture'}, {'name': 'Hydroponics'}, {'name': 'Livestock'}, {'name': 'App Discovery'}, {'name': 'Apps'}, {'name': 'Consumer Applications'}, {'name': 'Enterprise Applications'}, {'name': 'Mobile Apps'}, {'name': 'Reading Apps'}, {'name': 'Web Apps'}, {'name': 'Artificial Intelligence (AI)'}, {'name': 'Generative AI'}, {'name': 'Intelligent Systems'}, {'name': 'Machine Learning'}, {'name': 'Natural Language Processing'}, {'name': 'Predictive Analytics'}, {'name': 'Robotic Process Automation (RPA)'}, {'name': 'Bioinformatics'}, {'name': 'Biometrics'}, {'name': 'Biopharma'}, {'name': 'Biotechnology'}, {'name': 'Genetics'}, {'name': 'Life Science'}, {'name': 'Neuroscience'}, {'name': 'Quantified Self'}, {'name': 'Auctions'}, {'name': 'Classifieds'}, {'name': 'Collectibles'}, {'name': 'Consumer Reviews'}, {'name': 'Coupons'}, {'name': 'E-Commerce'}, {'name': 'E-Commerce Platforms'}, {'name': 'Flash Sale'}, {'name': 'Gift'}, {'name': 'Gift Card'}, {'name': 'Gift Exchange'}, {'name': 'Gift Registry'}, {'name': 'Group Buying'}, {'name': 'Local Shopping'}, {'name': 'Made to Order'}, {'name': 'Marketplace'}, {'name': 'Office Supplies'}, {'name': 'Online Auctions'}, {'name': 'Personalization'}, {'name': 'Point of Sale'}, {'name': 'Price Comparison'}, {'name': 'Rental'}, {'name': 'Retail'}, {'name': 'Retail Technology'}, {'name': 'Secondhand Goods'}, {'name': 'Shopping'}, {'name': 'Shopping Mall'}, {'name': 'Social Shopping'}, {'name': 'Sporting Goods'}, {'name': 'Vending and Concessions'}, {'name': 'Virtual Goods'}, {'name': 'Wholesale'}, {'name': 'Adult'}, {'name': 'Baby'}, {'name': 'Children'}, {'name': 'Communities'}, {'name': 'Dating'}, {'name': 'Elderly'}, {'name': 'Family'}, {'name': 'Funerals'}, {'name': 'Humanitarian'}, {'name': 'Leisure'}, {'name': 'Lifestyle'}, {'name': "Men's"}, {'name': 'Online Forums'}, {'name': 'Parenting'}, {'name': 'Pet'}, {'name': 'Private Social Networking'}, {'name': 'Professional Networking'}, {'name': 'Retirement'}, {'name': 'Social'}, {'name': 'Social Entrepreneurship'}, {'name': 'Teenagers'}, {'name': 'Virtual World'}, {'name': 'Wedding'}, {'name': "Women's"}, {'name': 'Young Adults'}, {'name': 'Computer'}, {'name': 'Consumer Electronics'}, {'name': 'Drones'}, {'name': 'Electronics'}, {'name': 'Google Glass'}, {'name': 'Mobile Devices'}, {'name': 'Nintendo'}, {'name': 'Playstation'}, {'name': 'Roku'}, {'name': 'Smart Home'}, {'name': 'Wearables'}, {'name': 'Windows Phone'}, {'name': 'Xbox'}, {'name': 'Blogging Platforms'}, {'name': 'Books'}, {'name': 'Content Delivery Network'}, {'name': 'Content Discovery'}, {'name': 'Content Syndication'}, {'name': 'Copywriting'}, {'name': 'Creative Agency'}, {'name': 'DRM'}, {'name': 'EBooks'}, {'name': 'Journalism'}, {'name': 'News'}, {'name': 'Printing'}, {'name': 'Publishing'}, {'name': 'Social Bookmarking'}, {'name': 'Video Editing'}, {'name': 'Video Streaming'}, {'name': 'A/B Testing'}, {'name': 'Analytics'}, {'name': 'Application Performance Management'}, {'name': 'Big Data'}, {'name': 'Business Intelligence'}, {'name': 'Consumer Research'}, {'name': 'Data Collection and Labeling'}, {'name': 'Data Governance'}, {'name': 'Data Integration'}, {'name': 'Data Management'}, {'name': 'Data Mining'}, {'name': 'Data Visualization'}, {'name': 'Database'}, {'name': 'Facial Recognition'}, {'name': 'Geospatial'}, {'name': 'Image Recognition'}, {'name': 'Location Based Services'}, {'name': 'Market Research'}, {'name': 'Product Research'}, {'name': 'Speech Recognition'}, {'name': 'Test and Measurement'}, {'name': 'Text Analytics'}, {'name': 'Usability Testing'}, {'name': 'CAD'}, {'name': 'Fashion'}, {'name': 'Graphic Design'}, {'name': 'Human Computer Interaction'}, {'name': 'Industrial Design'}, {'name': 'Interior Design'}, {'name': 'Mechanical Design'}, {'name': 'Product Design'}, {'name': 'UX Design'}, {'name': 'Web Design'}, {'name': 'Alumni'}, {'name': 'Charter Schools'}, {'name': 'Continuing Education'}, {'name': 'Corporate Training'}, {'name': 'E-Learning'}, {'name': 'EdTech'}, {'name': 'Education'}, {'name': 'Edutainment'}, {'name': 'Higher Education'}, {'name': 'Language Learning'}, {'name': 'MOOC'}, {'name': 'Music Education'}, {'name': 'Personal Development'}, {'name': 'Primary Education'}, {'name': 'Secondary Education'}, {'name': 'Skill Assessment'}, {'name': 'Special Education'}, {'name': 'STEM Education'}, {'name': 'Textbook'}, {'name': 'Training'}, {'name': 'Tutoring'}, {'name': 'Vocational Education'}, {'name': 'Battery'}, {'name': 'Biofuel'}, {'name': 'Biomass Energy'}, {'name': 'Clean Energy'}, {'name': 'Electrical Distribution'}, {'name': 'Energy'}, {'name': 'Energy Efficiency'}, {'name': 'Energy Management'}, {'name': 'Energy Storage'}, {'name': 'Fossil Fuels'}, {'name': 'Fuel'}, {'name': 'Fuel Cell'}, {'name': 'Geothermal Energy'}, {'name': 'Hydroelectric'}, {'name': 'Oil and Gas'}, {'name': 'Power Grid'}, {'name': 'Renewable Energy'}, {'name': 'Solar'}, {'name': 'Wind Energy'}, {'name': 'Mobile Payments'}, {'name': 'Payments'}, {'name': 'Wealth Management'}, {'name': '3D Technology'}, {'name': 'Application Specific Integrated Circuit (ASIC)'}, {'name': 'Audio/Visual Equipment'}, {'name': 'Augmented Reality'}, {'name': 'Cloud Infrastructure'}, {'name': 'Communication Hardware'}, {'name': 'Communications Infrastructure'}, {'name': 'Computer Vision'}, {'name': 'Data Center'}, {'name': 'Data Center Automation'}, {'name': 'Data Storage'}, {'name': 'Drone Management'}, {'name': 'DSP'}, {'name': 'Electronic Design Automation (EDA)'}, {'name': 'Embedded Systems'}, {'name': 'Field-Programmable Gate Array (FPGA)'}, {'name': 'Flash Storage'}, {'name': 'GPS'}, {'name': 'GPU'}, {'name': 'Hardware'}, {'name': 'Laser'}, {'name': 'Lighting'}, {'name': 'Network Hardware'}, {'name': 'NFC'}, {'name': 'Optical Communication'}, {'name': 'Private Cloud'}, {'name': 'Remote Sensing'}, {'name': 'RFID'}, {'name': 'RISC'}, {'name': 'Robotics'}, {'name': 'Satellite Communication'}, {'name': 'Semiconductor'}, {'name': 'Sensor'}, {'name': 'Telecommunications'}, {'name': 'Video Conferencing'}, {'name': 'Virtual Reality'}, {'name': 'Virtualization'}, {'name': 'Wireless'}, {'name': 'Addiction Treatment'}, {'name': 'Alternative Medicine'}, {'name': 'Assisted Living'}, {'name': 'Assistive Technology'}, {'name': 'Child Care'}, {'name': 'Clinical Trials'}, {'name': 'Cosmetic Surgery'}, {'name': 'Dental'}, {'name': 'Diabetes'}, {'name': 'Dietary Supplements'}, {'name': 'Elder Care'}, {'name': 'Electronic Health Record (EHR)'}, {'name': 'Emergency Medicine'}, {'name': 'Fertility'}, {'name': 'First Aid'}, {'name': 'Health Care'}, {'name': 'Health Diagnostics'}, {'name': 'Home Health Care'}, {'name': 'Hospital'}, {'name': 'Medical'}, {'name': 'Medical Device'}, {'name': 'Mental Health'}, {'name': 'mHealth'}, {'name': 'Nursing and Residential Care'}, {'name': 'Nutraceutical'}, {'name': 'Nutrition'}, {'name': 'Oncology'}, {'name': 'Outpatient Care'}, {'name': 'Personal Health'}, {'name': 'Pharmaceutical'}, {'name': 'Precision Medicine'}, {'name': 'Primary and Urgent Care'}, {'name': 'Psychology'}, {'name': 'Rehabilitation'}, {'name': 'Telehealth'}, {'name': 'Therapeutics'}, {'name': 'Veterinary'}, {'name': 'Wellness'}, {'name': 'Business Information Systems'}, {'name': 'CivicTech'}, {'name': 'Cloud Data Services'}, {'name': 'Cloud Management'}, {'name': 'Cloud Security'}, {'name': 'CMS'}, {'name': 'Contact Management'}, {'name': 'CRM'}, {'name': 'Cyber Security'}, {'name': 'DevOps'}, {'name': 'Document Management'}, {'name': 'E-Signature'}, {'name': 'Email'}, {'name': 'GovTech'}, {'name': 'Identity Management'}, {'name': 'Information and Communications Technology (ICT)'}, {'name': 'Information Services'}, {'name': 'Information Technology'}, {'name': 'Intrusion Detection'}, {'name': 'IT Infrastructure'}, {'name': 'IT Management'}, {'name': 'Management Information Systems'}, {'name': 'Messaging'}, {'name': 'Military'}, {'name': 'Network Security'}, {'name': 'Penetration Testing'}, {'name': 'Reputation'}, {'name': 'Sales Automation'}, {'name': 'Scheduling'}, {'name': 'Social CRM'}, {'name': 'Spam Filtering'}, {'name': 'Technical Support'}, {'name': 'Unified Communications'}, {'name': 'Video Chat'}, {'name': 'VoIP'}, {'name': 'Cloud Computing'}, {'name': 'Cloud Storage'}, {'name': 'Darknet'}, {'name': 'Domain Registrar'}, {'name': 'Ediscovery'}, {'name': 'Internet'}, {'name': 'Internet of Things'}, {'name': 'ISP'}, {'name': 'Music Streaming'}, {'name': 'Online Portals'}, {'name': 'Product Search'}, {'name': 'Search Engine'}, {'name': 'Semantic Search'}, {'name': 'Semantic Web'}, {'name': 'SMS'}, {'name': 'Social Media'}, {'name': 'Social Media Management'}, {'name': 'Social Network'}, {'name': 'Vertical Search'}, {'name': 'Visual Search'}, {'name': 'Web Browsers'}, {'name': 'Web Hosting'}, {'name': 'Web3'}, {'name': '3D Printing'}, {'name': 'Advanced Materials'}, {'name': 'Foundries'}, {'name': 'Industrial'}, {'name': 'Industrial Automation'}, {'name': 'Industrial Engineering'}, {'name': 'Industrial Manufacturing'}, {'name': 'Machinery Manufacturing'}, {'name': 'Manufacturing'}, {'name': 'Paper Manufacturing'}, {'name': 'Plastics and Rubber Manufacturing'}, {'name': 'Textiles'}, {'name': 'Wood Processing'}, {'name': 'Meeting Software'}, {'name': 'Wired Telecommunications'}, {'name': 'Android'}, {'name': 'iOS'}, {'name': 'Mobile'}, {'name': 'Mineral'}, {'name': 'Mining'}, {'name': 'Mining Technology'}, {'name': 'Natural Resources'}, {'name': 'Precious Metals'}, {'name': 'Timber'}, {'name': 'Water'}, {'name': 'Corrections Facilities'}, {'name': 'Fraud Detection'}, {'name': 'Homeland Security'}, {'name': 'Law Enforcement'}, {'name': 'Privacy'}, {'name': 'Security'}, {'name': 'Billing'}, {'name': 'Credit Cards'}, {'name': 'Debit Cards'}, {'name': 'Transaction Processing'}, {'name': 'Virtual Currency'}, {'name': 'Aerospace'}, {'name': 'Chemical'}, {'name': 'Chemical Engineering'}, {'name': 'Civil Engineering'}, {'name': 'Environmental Engineering'}, {'name': 'Marine Technology'}, {'name': 'Mechanical Engineering'}, {'name': 'Nanotechnology'}, {'name': 'Nuclear'}, {'name': 'Quantum Computing'}, {'name': 'Software Engineering'}, {'name': 'Bitcoin'}, {'name': 'Browser Extensions'}, {'name': 'Business Process Automation (BPA)'}, {'name': 'Chatbot'}, {'name': 'Consumer Software'}, {'name': 'Cryptocurrency'}, {'name': 'Developer APIs'}, {'name': 'Developer Platform'}, {'name': 'Developer Tools'}, {'name': 'Embedded Software'}, {'name': 'Enterprise Resource Planning (ERP)'}, {'name': 'Enterprise Software'}, {'name': 'File Sharing'}, {'name': 'IaaS'}, {'name': 'Linux'}, {'name': 'macOS'}, {'name': 'Marketing Automation'}, {'name': 'Metaverse'}, {'name': 'Open Source'}, {'name': 'Operating Systems'}, {'name': 'PaaS'}, {'name': 'Presentation Software'}, {'name': 'Presentations'}, {'name': 'Productivity Tools'}, {'name': 'QR Codes'}, {'name': 'SaaS'}, {'name': 'Simulation'}, {'name': 'SNS'}, {'name': 'Software'}, {'name': 'Task Management'}, {'name': 'Virtual Assistant'}, {'name': 'Virtual Desktop'}, {'name': 'Web Development'}, {'name': 'Adventure Travel'}, {'name': 'Amusement Park and Arcade'}, {'name': 'Business Travel'}, {'name': 'Casino'}, {'name': 'Hospitality'}, {'name': 'Hotel'}, {'name': 'Museums and Historical Sites'}, {'name': 'Parks'}, {'name': 'Resorts'}, {'name': 'Timeshare'}, {'name': 'Tour Operator'}, {'name': 'Tourism'}, {'name': 'Travel'}, {'name': 'Travel Accommodations'}, {'name': 'Travel Agency'}, {'name': 'Vacation Rental'}, {'name': 'Air Transportation'}, {'name': 'Automotive'}, {'name': 'Autonomous Vehicles'}, {'name': 'Car Sharing'}, {'name': 'Charging Infrastructure'}, {'name': 'Delivery Service'}, {'name': 'Electric Vehicle'}, {'name': 'Ferry Service'}, {'name': 'Fleet Management'}, {'name': 'Food Delivery'}, {'name': 'Freight Service'}, {'name': 'Last Mile Transportation'}, {'name': 'Limousine Service'}, {'name': 'Logistics'}, {'name': 'Marine Transportation'}, {'name': 'Parking'}, {'name': 'Ports and Harbors'}, {'name': 'Procurement'}, {'name': 'Public Transportation'}, {'name': 'Railroad'}, {'name': 'Recreational Vehicles'}, {'name': 'Ride Sharing'}, {'name': 'Same Day Delivery'}, {'name': 'Shipping'}, {'name': 'Shipping Broker'}, {'name': 'Space Travel'}, {'name': 'Supply Chain Management'}, {'name': 'Taxi Service'}, {'name': 'Transportation'}, {'name': 'Warehouse Automation'}, {'name': 'Warehousing'}, {'name': 'Water Transportation'}, {'name': 'Carbon Capture'}, {'name': 'CleanTech'}, {'name': 'Green Building'}, {'name': 'Green Consumer Goods'}, {'name': 'GreenTech'}, {'name': 'Organic'}, {'name': 'Pollution Control'}, {'name': 'Recycling'}, {'name': 'Sustainability'}, {'name': 'Waste Management'}, {'name': 'Water Purification'}, {'name': 'Wildlife Conservation'}, {'name': 'App Marketing'}, {'name': 'Brand Marketing'}, {'name': 'Cause Marketing'}, {'name': 'Content Marketing'}, {'name': 'Digital Marketing'}, {'name': 'Digital Signage'}, {'name': 'Direct Marketing'}, {'name': 'Direct Sales'}, {'name': 'Email Marketing'}, {'name': 'Lead Generation'}, {'name': 'Lead Management'}, {'name': 'Local'}, {'name': 'Local Business'}, {'name': 'Loyalty Programs'}, {'name': 'Marketing'}, {'name': 'Multi-level Marketing'}, {'name': 'Personal Branding'}, {'name': 'Public Relations'}, {'name': 'Sales'}, {'name': 'Sales Enablement'}, {'name': 'SEO'}, {'name': 'Social Media Marketing'}, {'name': 'Sponsorship'}, {'name': 'Video Advertising'}]
    return new Response(JSON.stringify(industriesData), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })  
}