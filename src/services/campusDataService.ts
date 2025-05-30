import { Location, ClassSchedule } from '../store/appStore';

// Mock locations data for Amity University Punjab
// Coordinates based on Sector 82 A, IT City Rd, Sahibzada Ajit Singh Nagar, Punjab 140306
export const campusLocations: Location[] = [
  {
    id: '1',
    name: 'Main Building',
    description: 'The main administrative building of the campus',
    coordinates: {
      latitude: 30.6631,
      longitude: 76.7278,
    },
    type: 'other',
  },
  {
    id: '2',
    name: 'Computer Science Lab',
    description: 'State-of-the-art computer science laboratory',
    coordinates: {
      latitude: 30.6635,
      longitude: 76.7282,
    },
    building: 'Engineering Block',
    floor: 2,
    roomNumber: 'E201',    type: 'lab',
  },
  {
    id: '3',
    name: 'Library',
    description: 'Central library with study spaces and resources',
    coordinates: {
      latitude: 30.6640,
      longitude: 76.7275,
    },
    building: 'Knowledge Center',
    floor: 1,
    type: 'library',
  },
  {
    id: '4',
    name: 'Lecture Hall 1',
    description: 'Large lecture hall for undergraduate classes',
    coordinates: {
      latitude: 30.6627,
      longitude: 76.7285,
    },
    building: 'Academic Block A',
    floor: 1,
    roomNumber: 'A101',
    type: 'classroom',
  },
  {
    id: '5',
    name: 'Physics Laboratory',
    description: 'Modern physics laboratory for experiments',
    coordinates: {
      latitude: 30.6638,
      longitude: 76.7280,
    },
    building: 'Science Block',
    floor: 3,
    roomNumber: 'S304',
    type: 'lab',
  },
  {
    id: '6',
    name: 'Cafeteria',
    description: 'Campus cafeteria with diverse food options',
    coordinates: {
      latitude: 30.6625,
      longitude: 76.7270,
    },
    building: 'Student Center',
    floor: 1,
    type: 'cafeteria',
  },
  {
    id: '7',
    name: 'Dean Office',
    description: 'Office of the Dean of Students',
    coordinates: {
      latitude: 30.6633,
      longitude: 76.7290,
    },
    building: 'Administration Block',
    floor: 2,
    roomNumber: 'ADM205',
    type: 'office',
  },
  {
    id: '8',
    name: 'Student Counseling Center',
    description: 'Mental health and wellness counseling for students',
    coordinates: {
      latitude: 30.6628,
      longitude: 76.7288,
    },
    building: 'Wellness Center',
    floor: 1,
    roomNumber: 'W105',
    type: 'office',
  },
];

// Mock class schedule data
export const classSchedules: ClassSchedule[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    room: 'A101',
    building: 'Academic Block A',
    startTime: '09:00',
    endTime: '10:30',
    dayOfWeek: 1, // Monday
    instructor: 'Dr. Sharma',
  },
  {
    id: '2',
    name: 'Calculus II',
    room: 'S202',
    building: 'Science Block',
    startTime: '11:00',
    endTime: '12:30',
    dayOfWeek: 1, // Monday
    instructor: 'Dr. Patel',
  },
  {
    id: '3',
    name: 'Data Structures and Algorithms',
    room: 'E201',
    building: 'Engineering Block',
    startTime: '14:00',
    endTime: '15:30',
    dayOfWeek: 2, // Tuesday
    instructor: 'Prof. Kumar',
  },
  {
    id: '4',
    name: 'Physics Lab',
    room: 'S304',
    building: 'Science Block',
    startTime: '10:00',
    endTime: '12:00',
    dayOfWeek: 3, // Wednesday
    instructor: 'Dr. Singh',
  },
  {
    id: '5',
    name: 'Technical Communication',
    room: 'A203',
    building: 'Academic Block A',
    startTime: '15:00',
    endTime: '16:30',
    dayOfWeek: 4, // Thursday
    instructor: 'Dr. Gupta',
  },
];

// Function to search locations by query
export const searchLocations = (query: string): Location[] => {
  const lowerCaseQuery = query.toLowerCase();
  return campusLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(lowerCaseQuery) ||
      location.description?.toLowerCase().includes(lowerCaseQuery) ||
      location.building?.toLowerCase().includes(lowerCaseQuery) ||
      location.roomNumber?.toLowerCase().includes(lowerCaseQuery)
  );
};

// Function to get class schedules for a specific day
export const getClassSchedulesForDay = (day: number): ClassSchedule[] => {
  return classSchedules.filter((schedule) => schedule.dayOfWeek === day);
};

// Function to find a location by ID
export const getLocationById = (id: string): Location | undefined => {
  return campusLocations.find((location) => location.id === id);
};

// Function to get room availability
export const getRoomAvailability = (
  roomId: string,
  date: Date
): { available: boolean; nextAvailableTime?: string } => {
  // This is a mock implementation
  // In a real app, this would check against actual bookings
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const currentTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  
  const room = campusLocations.find((location) => location.id === roomId);
  
  if (!room) {
    return { available: false };
  }
  
  const schedulesForRoom = classSchedules.filter(
    (schedule) =>
      schedule.dayOfWeek === day &&
      schedule.room === room.roomNumber &&
      schedule.building === room.building
  );
  
  for (const schedule of schedulesForRoom) {
    if (currentTime >= schedule.startTime && currentTime <= schedule.endTime) {
      return {
        available: false,
        nextAvailableTime: schedule.endTime,
      };
    }
  }
  
  return { available: true };
};