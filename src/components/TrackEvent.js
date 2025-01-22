import axios from "axios";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const TrackEvent = async (eventType, eventData, userId) => {
  try {
    const trackingUrl = `${Base_url}/track`;
    await axios.post(trackingUrl, {
      eventType,
      eventData,
      timestamp: new Date().toISOString(),
      userId
    });
    console.log(`Event tracked: ${eventType}`, eventData);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

export default TrackEvent;
