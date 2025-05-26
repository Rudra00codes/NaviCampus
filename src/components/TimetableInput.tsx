import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appStore';

// Define time periods based on requirements
const TIME_PERIODS = [
  { id: 1, label: 'Period 1', startTime: '09:15', endTime: '10:15' },
  { id: 2, label: 'Period 2', startTime: '10:15', endTime: '11:15' },
  { id: 3, label: 'Period 3', startTime: '11:15', endTime: '12:15' },
  { id: 4, label: 'Lunch Break', startTime: '12:15', endTime: '13:15', isBreak: true },
  { id: 5, label: 'Period 4', startTime: '13:15', endTime: '14:15' },
  { id: 6, label: 'Period 5', startTime: '14:15', endTime: '15:15' },
  { id: 7, label: 'Period 6', startTime: '15:15', endTime: '16:15' },
  { id: 8, label: 'Period 7', startTime: '16:15', endTime: '17:15' },
];

const WEEKDAYS = [
  { id: 1, name: 'Monday', shortName: 'Mon' },
  { id: 2, name: 'Tuesday', shortName: 'Tue' },
  { id: 3, name: 'Wednesday', shortName: 'Wed' },
  { id: 4, name: 'Thursday', shortName: 'Thu' },
  { id: 5, name: 'Friday', shortName: 'Fri' },
];

interface TimetableInputProps {
  onClose: () => void;
}

interface ClassForm {
  subjectName: string;
  instructor: string;
  room: string;
  building: string;
  dayOfWeek: number;
  periodId: number;
}

export default function TimetableInput({ onClose }: TimetableInputProps) {
  const { language, addClassSchedule, classSchedule, removeClassSchedule } = useAppStore();
  const [showAddClass, setShowAddClass] = useState(false);
  const [editingClass, setEditingClass] = useState<string | null>(null);
  const [classForm, setClassForm] = useState<ClassForm>({
    subjectName: '',
    instructor: '',
    room: '',
    building: '',
    dayOfWeek: 1,
    periodId: 1,
  });

  const getExistingClass = (dayOfWeek: number, periodId: number) => {
    const period = TIME_PERIODS.find(p => p.id === periodId);
    if (!period || period.isBreak) return null;
    
    return classSchedule.find(
      schedule => 
        schedule.dayOfWeek === dayOfWeek && 
        schedule.startTime === period.startTime
    );
  };
  const handleAddClass = () => {
    const { subjectName, instructor, room, building, dayOfWeek, periodId } = classForm;
    
    if (!subjectName.trim()) {
      Alert.alert(
        language === 'en' ? 'Error' : 'त्रुटि',
        language === 'en' ? 'Please enter subject name' : 'कृपया विषय का नाम दर्ज करें'
      );
      return;
    }

    if (!room.trim() || !building.trim()) {
      Alert.alert(
        language === 'en' ? 'Error' : 'त्रुटि',
        language === 'en' ? 'Please enter room and building' : 'कृपया कमरा और भवन दर्ज करें'
      );
      return;
    }

    const period = TIME_PERIODS.find(p => p.id === periodId);
    if (!period || period.isBreak) return;

    // Check if slot is already occupied (only for new classes, not edits)
    if (!editingClass) {
      const existingClass = getExistingClass(dayOfWeek, periodId);
      if (existingClass) {
        Alert.alert(
          language === 'en' ? 'Slot Occupied' : 'स्लॉट भरा हुआ',
          language === 'en' 
            ? 'This time slot already has a class. Please choose a different time.'
            : 'इस समय स्लॉट में पहले से ही एक कक्षा है। कृपया कोई अन्य समय चुनें।'
        );
        return;
      }
    }

    if (editingClass) {
      // Update existing class
      const updates = {
        name: subjectName.trim(),
        instructor: instructor.trim() || undefined,
        room: room.trim(),
        building: building.trim(),
        startTime: period.startTime,
        endTime: period.endTime,
        dayOfWeek,
      };
      
      // Remove old class and add updated one
      removeClassSchedule(editingClass);
      addClassSchedule(updates);
    } else {
      // Add new class
      addClassSchedule({
        name: subjectName.trim(),
        instructor: instructor.trim() || undefined,
        room: room.trim(),
        building: building.trim(),
        startTime: period.startTime,
        endTime: period.endTime,
        dayOfWeek,
      });
    }

    // Reset form
    setClassForm({
      subjectName: '',
      instructor: '',
      room: '',
      building: '',
      dayOfWeek: 1,
      periodId: 1,
    });

    setShowAddClass(false);
    setEditingClass(null);
    
    Alert.alert(
      language === 'en' ? 'Success' : 'सफलता',
      editingClass 
        ? (language === 'en' ? 'Class updated successfully!' : 'कक्षा सफलतापूर्वक अपडेट की गई!')
        : (language === 'en' ? 'Class added successfully!' : 'कक्षा सफलतापूर्वक जोड़ी गई!')
    );
  };

  const handleEditClass = (classId: string) => {
    const classToEdit = classSchedule.find(c => c.id === classId);
    if (!classToEdit) return;

    const period = TIME_PERIODS.find(p => p.startTime === classToEdit.startTime);
    if (!period) return;

    setClassForm({
      subjectName: classToEdit.name,
      instructor: classToEdit.instructor || '',
      room: classToEdit.room,
      building: classToEdit.building,
      dayOfWeek: classToEdit.dayOfWeek,
      periodId: period.id,
    });

    setEditingClass(classId);
    setShowAddClass(true);
  };
  const handleDeleteClass = (classId: string) => {
    Alert.alert(
      language === 'en' ? 'Delete Class' : 'कक्षा हटाएं',
      language === 'en' 
        ? 'Are you sure you want to delete this class?'
        : 'क्या आप वाकई इस कक्षा को हटाना चाहते हैं?',
      [
        {
          text: language === 'en' ? 'Cancel' : 'रद्द करें',
          style: 'cancel',
        },
        {
          text: language === 'en' ? 'Delete' : 'हटाएं',
          style: 'destructive',
          onPress: () => {
            removeClassSchedule(classId);
            Alert.alert(
              language === 'en' ? 'Success' : 'सफलता',
              language === 'en' ? 'Class deleted successfully!' : 'कक्षा सफलतापूर्वक हटाई गई!'
            );
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setClassForm({
      subjectName: '',
      instructor: '',
      room: '',
      building: '',
      dayOfWeek: 1,
      periodId: 1,
    });
    setEditingClass(null);
    setShowAddClass(false);
  };

  const renderTimetableGrid = () => {
    return (
      <View style={styles.timetableContainer}>
        {/* Header with days */}
        <View style={styles.timetableHeader}>
          <View style={styles.timeColumnHeader}>
            <Text style={styles.timeHeaderText}>
              {language === 'en' ? 'Time' : 'समय'}
            </Text>
          </View>
          {WEEKDAYS.map(day => (
            <View key={day.id} style={styles.dayColumnHeader}>
              <Text style={styles.dayHeaderText}>{day.shortName}</Text>
            </View>
          ))}
        </View>

        {/* Timetable rows */}
        <ScrollView style={styles.timetableBody}>
          {TIME_PERIODS.map(period => (
            <View key={period.id} style={styles.timetableRow}>
              <View style={[styles.timeColumn, period.isBreak && styles.breakTimeColumn]}>
                <Text style={[styles.timeText, period.isBreak && styles.breakTimeText]}>
                  {period.startTime}
                </Text>
                <Text style={[styles.timeLabel, period.isBreak && styles.breakTimeText]}>
                  {period.label}
                </Text>
              </View>
              
              {WEEKDAYS.map(day => {
                const existingClass = getExistingClass(day.id, period.id);
                const isBreak = period.isBreak;
                
                return (
                  <TouchableOpacity
                    key={`${day.id}-${period.id}`}
                    style={[
                      styles.classSlot,
                      isBreak && styles.breakSlot,
                      existingClass && styles.occupiedSlot,
                    ]}
                    onPress={() => {
                      if (!isBreak && !existingClass) {
                        setClassForm(prev => ({
                          ...prev,
                          dayOfWeek: day.id,
                          periodId: period.id,
                        }));
                        setShowAddClass(true);
                      }
                    }}
                    disabled={isBreak || !!existingClass}
                  >
                    {isBreak ? (
                      <Text style={styles.breakText}>
                        {language === 'en' ? 'Lunch' : 'दोपहर का भोजन'}
                      </Text>                    ) : existingClass ? (
                      <TouchableOpacity
                        style={styles.classInfo}
                        onLongPress={() => handleDeleteClass(existingClass.id)}
                        onPress={() => handleEditClass(existingClass.id)}
                      >
                        <Text style={styles.className} numberOfLines={1}>
                          {existingClass.name}
                        </Text>
                        <Text style={styles.classLocation} numberOfLines={1}>
                          {existingClass.room}
                        </Text>
                        {existingClass.instructor && (
                          <Text style={styles.classInstructor} numberOfLines={1}>
                            {existingClass.instructor}
                          </Text>
                        )}
                        <View style={styles.classActions}>
                          <Ionicons name="create-outline" size={12} color="#3B82F6" />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Ionicons name="add" size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderAddClassModal = () => {
    const selectedDay = WEEKDAYS.find(d => d.id === classForm.dayOfWeek);
    const selectedPeriod = TIME_PERIODS.find(p => p.id === classForm.periodId);

    return (
      <Modal
        visible={showAddClass}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={resetForm}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={resetForm}
            >
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>            <Text style={styles.modalTitle}>
              {editingClass 
                ? (language === 'en' ? 'Edit Class' : 'कक्षा संपादित करें')
                : (language === 'en' ? 'Add Class' : 'कक्षा जोड़ें')
              }
            </Text>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={handleAddClass}
            >
              <Text style={styles.modalSaveText}>
                {language === 'en' ? 'Save' : 'सहेजें'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Selected Time Slot */}
            <View style={styles.timeSlotInfo}>
              <Text style={styles.timeSlotTitle}>
                {language === 'en' ? 'Selected Time Slot' : 'चयनित समय स्लॉट'}
              </Text>
              <Text style={styles.timeSlotDetails}>
                {selectedDay?.name} • {selectedPeriod?.startTime} - {selectedPeriod?.endTime}
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>
                {language === 'en' ? 'Subject Name *' : 'विषय का नाम *'}
              </Text>
              <TextInput
                style={styles.textInput}
                value={classForm.subjectName}
                onChangeText={(text) => setClassForm(prev => ({ ...prev, subjectName: text }))}
                placeholder={language === 'en' ? 'Enter subject name' : 'विषय का नाम दर्ज करें'}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.fieldLabel}>
                {language === 'en' ? 'Instructor' : 'प्रशिक्षक'}
              </Text>
              <TextInput
                style={styles.textInput}
                value={classForm.instructor}
                onChangeText={(text) => setClassForm(prev => ({ ...prev, instructor: text }))}
                placeholder={language === 'en' ? 'Enter instructor name' : 'प्रशिक्षक का नाम दर्ज करें'}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formSection, styles.formHalf]}>
                <Text style={styles.fieldLabel}>
                  {language === 'en' ? 'Room *' : 'कमरा *'}
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={classForm.room}
                  onChangeText={(text) => setClassForm(prev => ({ ...prev, room: text }))}
                  placeholder={language === 'en' ? 'Room' : 'कमरा'}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={[styles.formSection, styles.formHalf]}>
                <Text style={styles.fieldLabel}>
                  {language === 'en' ? 'Building *' : 'भवन *'}
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={classForm.building}
                  onChangeText={(text) => setClassForm(prev => ({ ...prev, building: text }))}
                  placeholder={language === 'en' ? 'Building' : 'भवन'}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === 'en' ? 'Manage Timetable' : 'समयसारणी प्रबंधित करें'}
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddClass(true)}
        >
          <Ionicons name="add" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>        <Text style={styles.instructionsText}>
          {language === 'en' 
            ? 'Tap empty slots to add classes. Tap existing classes to edit, long press to delete. Classes run Monday-Friday, 9:15 AM - 5:00 PM with lunch break 12:15-1:15 PM.'
            : 'कक्षाएं जोड़ने के लिए खाली स्लॉट पर टैप करें। संपादित करने के लिए मौजूदा कक्षाओं पर टैप करें, हटाने के लिए लंबे समय तक दबाएं। कक्षाएं सोमवार-शुक्रवार, सुबह 9:15 - शाम 5:00 बजे तक चलती हैं।'
          }
        </Text>
      </View>

      {/* Timetable Grid */}
      {renderTimetableGrid()}

      {/* Add Class Modal */}
      {renderAddClassModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  addButton: {
    padding: 8,
  },
  instructionsContainer: {
    backgroundColor: '#EBF8FF',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  instructionsText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  timetableContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timetableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  timeColumnHeader: {
    width: 80,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  timeHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  dayColumnHeader: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  timetableBody: {
    flex: 1,
  },
  timetableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  timeColumn: {
    width: 80,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  breakTimeColumn: {
    backgroundColor: '#FEF3C7',
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
  timeLabel: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
  },
  breakTimeText: {
    color: '#92400E',
  },
  classSlot: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  breakSlot: {
    backgroundColor: '#FEF3C7',
  },
  occupiedSlot: {
    backgroundColor: '#EBF8FF',
  },
  breakText: {
    fontSize: 10,
    color: '#92400E',
    fontWeight: '500',
  },
  classInfo: {
    padding: 4,
    alignItems: 'center',
  },
  className: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1E40AF',
    textAlign: 'center',
  },
  classLocation: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },  classInstructor: {
    fontSize: 8,
    color: '#9CA3AF',
  },
  classActions: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  modalSaveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  timeSlotInfo: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  timeSlotTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  timeSlotDetails: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  formSection: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formHalf: {
    flex: 0.48,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
});