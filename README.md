# Google Maps Plugin

## Overview

This project is an interactive Google Maps plugin built using React.js. It allows users to plot geographical coordinates, display info windows with city and state information, and manage pins dynamically. The functionality is specifically designed for locations within the USA. Additionally, a feature to delete pins after plotting has been implemented to enhance usability.

## DEMO VIDEO -
https://drive.google.com/file/d/1U2idOi6weEURu55kdgidDABlsw6qNY-K/view?usp=sharing

---

## Features

1. **Interactive Map:**

   - Displays a Google Map using the Google Maps JavaScript API.

2. **Marker Plotting:**

   - Plots markers on the map based on provided coordinates in JSON format.

3. **Info Windows:**

   - Displays city and state information for each marker using reverse geocoding with the Google Maps Geocoding API.

4. **Pin Management:**

   - Users can delete pins dynamically after they are plotted.

5. **Input Validation:**

   - Ensures all coordinates are within the USA before plotting.

6. **Responsive Design:**
   
   - The application adapts perfectly across devices, including phones, tablets, and desktops.

---

## Technology Stack

- **Frontend:** React.js
- **APIs:** Google Maps JavaScript API, Google Maps Geocoding API


---

## Setup and Installation

### Prerequisites

1. **Google API Key:** Obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/) with the following APIs enabled:

   - Google Maps JavaScript API
   - Google Maps Geocoding API

2. **Node.js and npm:** Ensure you have Node.js and npm installed on your system.

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/google-maps-plugin.git
   ```

2. Navigate to the project directory:

   ```bash
   cd google-maps-plugin
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Google API key:

   ```env
   REACT_APP_GOOGLE_API_KEY=your_google_api_key_here
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Open the application in your browser at `http://localhost:3000`.

---

## How to Use

1. Provide coordinates in the JSON format (e.g., `[{"latitude": 40.73061, "longitude": -73.935242}]`).
2. The map will plot markers for the provided coordinates.
3. Click on a marker to view the city and state in an info window.
4. To delete a pin, click the delete button associated with the marker.

---

## Additional Functionality

- **Dynamic Pin Deletion:**
  - After plotting, users can delete pins directly from the map. This improves flexibility and enhances user control over the plotted locations.

---

## Required Libraries

- [react-google-maps/api](https://react-google-maps-api-docs.netlify.app/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Screenshots/Video

1. **Map with Markers:**
    ![image](https://github.com/user-attachments/assets/6e73b8ad-3703-4a00-9246-0fede3b5a979)



3. **Info Window:**
   ![image](https://github.com/user-attachments/assets/6c97602b-f2f8-4e80-bf23-c590a30b0b44)



5. **Pin Deletion:**
   ![image](https://github.com/user-attachments/assets/9de816d1-0513-4574-a343-cd7710d50d81)



---

]

## Deliverables

1. **Code Files:**

   - The React.js project files

2. **Screenshots/Video:**

   - Demonstrating map functionality, info windows, and pin deletion.

3. **Documentation:**

   - This README file with setup instructions and details.

---

## Contact

For any questions, feel free to contact:

- **Name:** Garv
- **Email:** [garvagarwal.work@gmail.com](mailto\:garvagarwal.work@gmail.com)

---

## Notes

- Ensure your Google Cloud billing is active to avoid disruptions in API usage.
- Test the application with sample JSON data to validate functionality.

Good luck!
