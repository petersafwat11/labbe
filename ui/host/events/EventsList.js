import React from "react";
import EventCard from "./EventCard";

const dummyEvents = {
  id: 1,
  title: "حفل زفاف أحمد وقطافه",
  date: "السبت 15 ديسمبر 2024 - 7:00 مساءً",
  location: "قاعة الزفاف، الرياض",
  guest: "10 ضيوف",
  replyingRate: "90%",
  invited: 150,
  confirmed: 120,
  apologies: 15,
};
// Add more dummy events as needed

function EventsList() {
  return <EventCard event={dummyEvents} />;
}

export default EventsList;
