/**
 * Rules for the "Schedule Your Visit" calendar.
 * Everything here is easy to change; nothing else needs touching.
 */
export const appointmentConfig = {
  // Days the chambers receives visitors: 0 = Sunday ... 6 = Saturday
  openDays: [1, 2, 3, 4, 5, 6],

  // Time slots offered on a normal open day
  slots: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],

  // Days with different hours (0 = Sunday ... 6 = Saturday)
  slotsByDay: {
    6: ['10:00 AM', '11:00 AM', '12:00 PM'],
  },

  // Shown under the calendar
  hoursNote: 'Monday – Friday, 9:00 AM – 5:00 PM · Saturday, 10:00 AM – 1:00 PM',

  // Same-day slots must be at least this many hours away
  minNoticeHours: 2,

  // Days that repeat every year, written MM-DD (Nigerian fixed public holidays).
  // Please confirm these, and add anything else the chambers closes for.
  closedEveryYear: ['01-01', '05-01', '06-12', '10-01', '12-25', '12-26'],

  // One-off closed dates, written YYYY-MM-DD (e.g. Good Friday, Eid, court vacation days)
  closedDates: [],

  // How far ahead a visitor can book
  monthsAhead: 12,

  // Requests are sent by WhatsApp or email. Number in international format, no + or spaces.
  whatsappNumber: '2348067710016',
}
