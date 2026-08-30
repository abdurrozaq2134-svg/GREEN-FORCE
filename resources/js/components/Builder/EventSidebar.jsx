import React from 'react';
import {
  EVENT_COMPONENTS,
  IconCountdown,
  IconRsvp,
  IconSchedule,
  IconTicket,
  IconMap,
  IconEvent,
  IconArrowLeft,
} from './EventElements';

// ===================== EVENT SIDEBAR =====================
// Dedicated sidebar titled "Event" — displays only event-logic components
// (countdown, rsvp, schedule, ticket, map, poll, guestbook, feedback, sponsor,
//  + logic buttons: submit, oke, cancel).
// Separated from basic visual elements (text, shape, button) to isolate
// event behaviour from canvas layout elements.
export default function EventSidebar({ onAdd, isOpen, onClose, activeEventTypes }) {
  const displayComponents = isOpen
    ? EVENT_COMPONENTS
    : EVENT_COMPONENTS.filter((c) => activeEventTypes?.includes(c.type));

  return (
    <aside className="event-sidebar">
      <div className="event-sidebar-header">
        <h3 className="event-sidebar-title">
          <span className="event-sidebar-title-icon">
            <IconEvent />
          </span>
          Event
        </h3>
        {onClose && (
          <button className="event-sidebar-close" onClick={onClose} title="Tutup">
            <IconArrowLeft />
          </button>
        )}
      </div>

      <div className="event-sidebar-body">
        {/* Event-interaction components */}
        <p className="event-sidebar-section-label">Komponen Event</p>
        <div className="event-component-grid">
          {displayComponents
            .filter((c) => !c.isLogic)
            .map((comp) => (
              <div
                key={comp.type}
                className="event-component-card"
                onClick={() => onAdd(comp.type)}
              >
                <span className="event-component-icon">{comp.icon}</span>
                <span className="event-component-label">{comp.label}</span>
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
}

// Re-export icons so consumers can import from one place
export {
  IconCountdown,
  IconRsvp,
  IconSchedule,
  IconTicket,
  IconMap,
};
