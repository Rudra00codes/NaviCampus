import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../src/store/appStore';
import { classSchedules, getLocationById } from '../src/services/campusDataService';

export default function ScheduleScreen() {
  const { language } = useAppStore();
  const daysOfWeek = language === 'en' 
    ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    : ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  
  const shortDaysOfWeek = language === 'en'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] 
    : ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
  
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const [selectedDay, setSelectedDay] = useState(today);
  const [view, setView] = useState<'week' | 'day'>('day');
  
  // Get class schedules for the selected day
  const getSchedulesForDay = (day: number) => {
    return classSchedules.filter(schedule => schedule.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };
  
  const navigateToLocation = (locationId: string) => {
    router.push({
      pathname: `/location/${locationId}`,
      params: { id: locationId }
    });
  };
  
  // Find location ID for a classroom
  const findLocationIdForClass = (schedule: { room: string, building: string }) => {
    const location = classSchedules.find(
      loc => loc.room === schedule.room && loc.building === schedule.building
    );
    if (location) {
      // In a real app, you would look up the location ID properly
      return '4'; // Using Lecture Hall 1 as an example
    }
    return null;
  };
  
  const renderTimeSlots = () => {
    const slots = [];
    for (let i = 8; i < 20; i++) {
      slots.push(
        <View key={i} style={styles.timeSlot}>
          <Text style={styles.timeText}>{`${i}:00`}</Text>
        </View>
      );
    }
    return slots;
  };
  
  const renderDaySchedule = (day: number) => {
    const daySchedules = getSchedulesForDay(day);
    
    if (daySchedules.length === 0) {
      return (
        <View style={styles.emptyScheduleContainer}>
          <Ionicons name="calendar-outline" size={64} color="#E5E7EB" />
          <Text style={styles.emptyScheduleText}>
            {language === 'en' 
              ? 'No classes scheduled for this day' 
              : 'इस दिन के लिए कोई कक्षा निर्धारित नहीं है'}
          </Text>
        </View>
      );
    }
    
    return (
      <ScrollView contentContainerStyle={styles.scheduleList}>
        {daySchedules.map((schedule) => {
          const locationId = findLocationIdForClass(schedule);
          return (
            <TouchableOpacity 
              key={schedule.id}
              style={styles.scheduleCard}
              onPress={() => locationId && navigateToLocation(locationId)}
            >
              <View style={styles.scheduleTimeContainer}>
                <Text style={styles.scheduleTime}>{schedule.startTime}</Text>
                <Text style={styles.scheduleTimeSeparator}>-</Text>
                <Text style={styles.scheduleTime}>{schedule.endTime}</Text>
              </View>
              
              <View style={styles.scheduleInfoContainer}>
                <Text style={styles.scheduleTitle}>{schedule.name}</Text>
                <View style={styles.scheduleDetails}>
                  <View style={styles.scheduleDetailItem}>
                    <Ionicons name="location" size={14} color="#6B7280" />
                    <Text style={styles.scheduleDetailText}>
                      {`${schedule.building}, Room ${schedule.room}`}
                    </Text>
                  </View>
                  
                  {schedule.instructor && (
                    <View style={styles.scheduleDetailItem}>
                      <Ionicons name="person" size={14} color="#6B7280" />
                      <Text style={styles.scheduleDetailText}>
                        {schedule.instructor}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };
  
  const renderWeekView = () => {
    return (
      <ScrollView 
        style={styles.weekViewContainer}
        contentContainerStyle={styles.weekViewContent}
      >
        <View style={styles.weekViewHeader}>
          <View style={styles.weekViewHeaderHour}></View>
          {[1, 2, 3, 4, 5].map((day) => (
            <View key={day} style={styles.weekViewHeaderDay}>
              <Text style={styles.weekViewHeaderDayText}>{shortDaysOfWeek[day]}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.weekViewGrid}>
          {/* Time slots on the left */}
          <View style={styles.weekViewTimes}>
            {renderTimeSlots()}
          </View>
          
          {/* Days grid */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.weekViewDays}>
              {[1, 2, 3, 4, 5].map((day) => {
                const daySchedules = getSchedulesForDay(day);
                
                return (
                  <View key={day} style={styles.weekViewDay}>
                    {daySchedules.map((schedule) => {
                      const startHour = parseInt(schedule.startTime.split(':')[0]);
                      const startMinute = parseInt(schedule.startTime.split(':')[1]);
                      const endHour = parseInt(schedule.endTime.split(':')[0]);
                      const endMinute = parseInt(schedule.endTime.split(':')[1]);
                      
                      const top = (startHour - 8) * 60 + startMinute;
                      const height = (endHour - startHour) * 60 + (endMinute - startMinute);
                      
                      const locationId = findLocationIdForClass(schedule);
                      
                      return (
                        <TouchableOpacity
                          key={schedule.id}
                          style={[
                            styles.weekViewEvent,
                            {
                              top,
                              height,
                              backgroundColor: getColorForClass(schedule.name),
                            }
                          ]}
                          onPress={() => locationId && navigateToLocation(locationId)}
                        >
                          <Text style={styles.weekViewEventText} numberOfLines={2}>
                            {schedule.name}
                          </Text>
                          <Text style={styles.weekViewEventLocation} numberOfLines={1}>
                            {`${schedule.room}`}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  };
  
  // Helper function to get a consistent color based on class name
  const getColorForClass = (className: string) => {
    // Simple hash function for demo
    const hash = className.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const colors = [
      '#DBEAFE', // Blue
      '#D1FAE5', // Green
      '#FEF3C7', // Yellow
      '#FEE2E2', // Red
      '#F3E8FF', // Purple
      '#E0F2FE', // Light Blue
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === 'en' ? 'Class Schedule' : 'कक्षा कार्यक्रम'}
        </Text>
        <TouchableOpacity 
          style={styles.viewToggleButton}
          onPress={() => setView(view === 'day' ? 'week' : 'day')}
        >
          <Ionicons 
            name={view === 'day' ? "calendar" : "list"} 
            size={24} 
            color="#3B82F6" 
          />
        </TouchableOpacity>
      </View>
      
      {view === 'day' ? (
        <>
          {/* Day selector */}
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daySelector}
            contentContainerStyle={styles.daySelectorContent}
          >
            {daysOfWeek.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayButton,
                  selectedDay === index && styles.dayButtonActive,
                  today === index && styles.todayButton
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <Text style={[
                  styles.dayButtonText,
                  selectedDay === index && styles.dayButtonTextActive
                ]}>
                  {day}
                </Text>
                {today === index && (
                  <View style={styles.todayIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Schedule list for selected day */}
          {renderDaySchedule(selectedDay)}
        </>
      ) : (
        renderWeekView()
      )}
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  viewToggleButton: {
    padding: 8,
  },
  daySelector: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  daySelectorContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayButtonActive: {
    backgroundColor: '#3B82F6',
  },
  todayButton: {
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  dayButtonTextActive: {
    color: '#FFFFFF',
  },
  todayIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EF4444',
    marginTop: 4,
  },
  scheduleList: {
    padding: 16,
    paddingBottom: 40,
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  scheduleTimeContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  scheduleTimeSeparator: {
    fontSize: 12,
    color: '#6B7280',
    marginVertical: 2,
  },
  scheduleInfoContainer: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  scheduleDetails: {
    flexDirection: 'column',
  },
  scheduleDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  scheduleDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  emptyScheduleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyScheduleText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
  },
  weekViewContainer: {
    flex: 1,
  },
  weekViewContent: {
    paddingBottom: 40,
  },
  weekViewHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  weekViewHeaderHour: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  weekViewHeaderDay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    minWidth: 80,
    maxWidth: 120,
  },
  weekViewHeaderDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  weekViewGrid: {
    flexDirection: 'row',
  },
  weekViewTimes: {
    width: 60,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  timeSlot: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  weekViewDays: {
    flexDirection: 'row',
  },
  weekViewDay: {
    position: 'relative',
    height: 720, // 12 hours * 60 minutes
    minWidth: 80,
    maxWidth: 120,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  weekViewEvent: {
    position: 'absolute',
    left: 2,
    right: 2,
    borderRadius: 6,
    padding: 4,
    overflow: 'hidden',
  },
  weekViewEventText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
  },
  weekViewEventLocation: {
    fontSize: 9,
    color: '#6B7280',
  },
});