import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const MedicineReminder = () => {
    // State management
    const [medicineName, setMedicineName] = useState('');
    const [dosage, setDosage] = useState('');
    const [medicineTimes, setMedicineTimes] = useState(['']);
    const [unitModalVisible, setUnitModalVisible] = useState(false);
    const [timeModalVisible, setTimeModalVisible] = useState(false);
    const [timerModalVisible, setTimerModalVisible] = useState(false);
    const [dateStartModalVisible, setDateStartModalVisible] = useState(false);
    const [dateEndModalVisible, setDateEndModalVisible] = useState(false);
    const [reminderModalVisible, setReminderModalVisible] = useState(false);
    const [timePickerModalVisible, setTimePickerModalVisible] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation(); // Initialize navigation



    // Form data states
    const [unit, setUnit] = useState('');
    const [time, setTime] = useState('');
    const [timer, setTimer] = useState('');
    const [dateStart, setDateStart] = useState({ day: '', month: '', year: '' });
    const [dateEnd, setDateEnd] = useState({ day: '', month: '', year: '' });
    const [reminder, setReminder] = useState('');
    const [selectedHour, setSelectedHour] = useState('15');
    const [selectedMinute, setSelectedMinute] = useState('00');

    // Constants
    const icons = ["💊", "💉", "🧴", "🌿", "📝"];
    const units = ['มิลลิลิตร', 'เม็ด', 'ครั้ง', 'ยูนิต', 'ช้อนชา'];
    const times = ['เช้า', 'กลางวัน', 'เย็น', 'ก่อนนอน', 'ไม่กำหนด'];
    const timers = ['ก่อนอาหาร', 'หลังอาหาร', 'วันละครั้ง'];
    const reminders = ['ไม่แจ้งเตือน', 'ทุกวัน', 'ทุกสัปดาห์', 'ทุกเดือน'];
    const days = ['16', '17', '18', '19', '20'];
    const months = ['มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม'];
    const years = ['2023', '2024', '2025', '2026', '2027'];
    //   const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    //   const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const hours = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    const minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',];

    const handleConfirm = () => {
        const newMedicine = {
            id: Date.now().toString(), // Unique ID
            name: medicineName,
            dosage: `${dosage} ${unit}`,
            timeSlot: `${time} ${timer}`,
            additional: reminder,
            icon: selectedIcon || '💊', // Default icon
        };
        console.log('New Medicine Added:', newMedicine);

        setConfirmationVisible(false);

        // Here you would typically save to a database or state management system
        console.log('Saving medicine:', {
            name: medicineName,
            dosage: `${dosage} ${unit}`,
            timeSlot: `${time} ${timer}`,
            startDate: dateStart.day ? `${dateStart.day} ${dateStart.month} ${dateStart.year}` : '',
            endDate: dateEnd.day ? `${dateEnd.day} ${dateEnd.month} ${dateEnd.year}` : '',
            reminder: reminder,
            times: medicineTimes,
            icon: selectedIcon
        });
        setConfirmationVisible(false);
    };

    const addMedicineTime = () => {
        setMedicineTimes([...medicineTimes, '']);
    };

    const removeMedicineTime = (index) => {
        const updatedTimes = medicineTimes.filter((_, i) => i !== index);
        setMedicineTimes(updatedTimes);
    };

    // Confirmation Modal Component
    const ConfirmationModal = () => (
        <Modal visible={confirmationVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.confirmationContent}>
                    <Text style={styles.confirmationTitle}>ยืนยันการเพิ่มรายการยา</Text>

                    <View style={styles.detailContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>ชื่อยา:</Text>
                            <Text style={styles.detailText}>{medicineName || '-'}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>จำนวน:</Text>
                            <Text style={styles.detailText}>{`${dosage || '1'} ${unit || 'ครั้ง'}`}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>ช่วงเวลา:</Text>
                            <Text style={styles.detailText}>{`${time || 'ไม่กำหนด'} ${timer ? `/ ${timer}` : ''}`}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>วันที่เริ่มต้น:</Text>
                            <Text style={styles.detailText}>
                                {dateStart.day ? `${dateStart.day} ${dateStart.month} ${dateStart.year}` : '-'}
                            </Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>การแจ้งเตือน:</Text>
                            <Text style={styles.detailText}>{reminder || 'ทุกวัน'}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => setConfirmationVisible(false)}
                        >
                            <Text style={styles.buttonText}>ยกเลิก</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.buttonText}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );


    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>เพิ่มรายการยา</Text>
                <TouchableOpacity onPress={() => navigation.navigate('medicine-list')}>
                    <Ionicons name="close" size={24} color="#00524D" />
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                data={icons}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedIcon(item)}
                        onMouseEnter={() => setHoveredIcon(item)}
                        onMouseLeave={() => setHoveredIcon(null)}
                    >
                        <View style={[
                            styles.iconContainer,
                            selectedIcon === item && styles.selectedIcon,
                            hoveredIcon === item && styles.hoveredIcon
                        ]}>
                            <Text style={styles.iconText}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Input Fields */}
            <Text style={styles.inputTitle}>ชื่อยา</Text>
            <TextInput style={styles.input} placeholder="กรอกชื่อยา" />

            {/* Dosage Row */}
            <View style={styles.rowContainer}>
                <View style={styles.halfWidthContainer}>
                    <Text style={styles.inputTitle}>ลักษณะการรับประทานยา</Text>
                    <TextInput style={styles.input} placeholder="ขนาดของการรับประทานยา" onChangeText={setDosage}
                        keyboardType="numeric" />
                </View>

                <View style={styles.halfWidthContainer}>
                    <Text>‏‎</Text>
                    <TouchableOpacity
                        onPress={() => setUnitModalVisible(true)}
                        style={styles.input}
                    >
                        <Text>{unit || 'หน่วย'}</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* Time Row */}
            <View style={styles.rowContainer}>
                <View style={styles.halfWidthContainer}>
                    <Text style={styles.inputTitle}>ช่วงการรับประทานยา</Text>
                    <TouchableOpacity
                        onPress={() => setTimerModalVisible(true)}
                        style={styles.input}
                    >
                        <Text>{timer || 'ช่วงการรับประทาน'}</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.halfWidthContainer}>
                    <Text>‎</Text>
                    <TouchableOpacity
                        onPress={() => setTimeModalVisible(true)}
                        style={styles.input}
                    >
                        <Text>{time || 'ช่วงเวลา'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Date Row */}
            <View style={styles.rowContainer}>
                <View style={styles.halfWidthContainer}>
                    <Text style={styles.inputTitle}>ตั้งค่าการแจ้งตือน</Text>
                    <TouchableOpacity
                        onPress={() => setDateStartModalVisible(true)}
                        style={styles.input}

                    >
                        <Text>
                            {dateStart.day && dateStart.month && dateStart.year
                                ? `${dateStart.day} ${dateStart.month} ${dateStart.year}`
                                : 'วันที่เริ่มต้น'}
                        </Text>

                    </TouchableOpacity>

                </View>


                <View style={styles.halfWidthContainer}>
                    <Text style={styles.inputTitle}>‏‎</Text>
                    <TouchableOpacity
                        onPress={() => setDateEndModalVisible(true)}
                        style={styles.input}
                    >
                        <Text>
                            {dateEnd.day && dateEnd.month && dateEnd.year
                                ? `${dateEnd.day} ${dateEnd.month} ${dateEnd.year}`
                                : 'วันที่สิ้นสุด'}
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>


            <TouchableOpacity
                onPress={() => setReminderModalVisible(true)}
                style={styles.input}
            >
                <Text>{reminder || 'ความถี่การแจ้งเตือน'}</Text>
            </TouchableOpacity>

            {medicineTimes.map((_, index) => (
                <View key={index} style={styles.timeRow}>
                    <TouchableOpacity
                        onPress={() => setTimePickerModalVisible(true)}
                        style={[styles.input, styles.timeInput]}
                    >
                        <Text>
                            {selectedHour && selectedMinute
                                ? `${selectedHour}:${selectedMinute}`
                                : `เวลาการรับประทานครั้งที่ ${index + 1}`}
                        </Text>
                    </TouchableOpacity>
                    {index > 0 && (
                        <TouchableOpacity onPress={() => removeMedicineTime(index)}>
                            <FontAwesome name="minus-circle" size={24} color="red" />
                        </TouchableOpacity>
                    )}
                </View>
            ))}

            <TouchableOpacity onPress={addMedicineTime} style={styles.addTimeButton}>
                <FontAwesome name="plus-circle" size={24} color="teal" style={styles.addTimeIcon} />
                <Text style={styles.addTimeText}>เพิ่มเวลาการรับประทาน</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setConfirmationVisible(true)}
            >
                <Text style={styles.saveButtonText}>บันทึกรายการ</Text>
            </TouchableOpacity>

            <Modal visible={unitModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#004d61' }}>หน่วย</Text>
                        {units.map((u) => (
                            <TouchableOpacity key={u} style={{ padding: 10, alignItems: 'center' }} onPress={() => { setUnit(u); setUnitModalVisible(false); }}>
                                <Text style={{ fontSize: 16, fontWeight: unit === u ? 'bold' : 'normal', color: unit === u ? '#004d61' : 'black' }}>{u}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setUnitModalVisible(false)} style={{ padding: 10, backgroundColor: '#004d61', borderRadius: 5, alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Time Modal ช่วงเวลา */}
            <Modal visible={timeModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#004d61' }}>ช่วงการรับประทาน</Text>
                        {times.map((t) => (
                            <TouchableOpacity key={t} style={{ padding: 10, alignItems: 'center' }} onPress={() => { setTime(t); setTimeModalVisible(false); }}>
                                <Text style={{ fontSize: 16, fontWeight: time === t ? 'bold' : 'normal', color: time === t ? '#004d61' : 'black' }}>{t}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setTimeModalVisible(false)} style={{ padding: 10, backgroundColor: '#004d61', borderRadius: 5, alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Time Modal ก่อน หลัง อาหาร  */}
            <Modal visible={timerModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#004d61' }}>ช่วงการรับประทาน</Text>
                        {timers.map((t) => (
                            <TouchableOpacity key={t} style={{ padding: 10, alignItems: 'center' }} onPress={() => { setTimer(t); setTimerModalVisible(false); }}>
                                <Text style={{ fontSize: 16, fontWeight: time === t ? 'bold' : 'normal', color: timer === t ? '#004d61' : 'black' }}>{t}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setTimerModalVisible(false)} style={{ padding: 10, backgroundColor: '#004d61', borderRadius: 5, alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Date Start Modal */}
            <Modal visible={dateStartModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#004d61' }}>วันที่เริ่มต้น</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>วัน</Text>
                                {days.map((d) => (
                                    <TouchableOpacity key={d} style={{ padding: 10 }} onPress={() => setDateStart(prev => ({ ...prev, day: d }))}>
                                        <Text style={{ fontSize: 16, fontWeight: dateStart.day === d ? 'bold' : 'normal', color: dateStart.day === d ? '#004d61' : 'black' }}>{d}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>เดือน</Text>
                                {months.map((m) => (
                                    <TouchableOpacity key={m} style={{ padding: 10 }} onPress={() => setDateStart(prev => ({ ...prev, month: m }))}>
                                        <Text style={{ fontSize: 16, fontWeight: dateStart.month === m ? 'bold' : 'normal', color: dateStart.month === m ? '#004d61' : 'black' }}>{m}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>ปี</Text>
                                {years.map((y) => (
                                    <TouchableOpacity key={y} style={{ padding: 10 }} onPress={() => setDateStart(prev => ({ ...prev, year: y }))}>
                                        <Text style={{ fontSize: 16, fontWeight: dateStart.year === y ? 'bold' : 'normal', color: dateStart.year === y ? '#004d61' : 'black' }}>{y}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setDateStartModalVisible(false)} style={{ padding: 10, backgroundColor: '#004d61', borderRadius: 5, alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Date End Modal */}
            <Modal visible={dateEndModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#004d61' }}>วันที่สิ้นสุด</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>วัน</Text>
                                {days.map((d) => (
                                    <TouchableOpacity key={d} style={{ padding: 10 }} onPress={() => setDateEnd(prev => ({ ...prev, day: d }))}>
                                        <Text style={{ fontSize: 16, fontWeight: dateEnd.day === d ? 'bold' : 'normal', color: dateEnd.day === d ? '#004d61' : 'black' }}>{d}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>เดือน</Text>
                                {months.map((m) => (
                                    <TouchableOpacity key={m} style={{ padding: 10 }} onPress={() => setDateEnd(prev => ({ ...prev, month: m }))}>
                                        <Text style={{ fontSize: 16, fontWeight: dateEnd.month === m ? 'bold' : 'normal', color: dateEnd.month === m ? '#004d61' : 'black' }}>{m}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text>ปี</Text>
                                {years.map((y) => (
                                    <TouchableOpacity key={y} style={{ padding: 10 }} onPress={() => setDateEnd(prev => ({ ...prev, year: y }))}>
                                        <Text style={{ fontSize: 16, fontWeight: dateEnd.year === y ? 'bold' : 'normal', color: dateEnd.year === y ? '#004d61' : 'black' }}>{y}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setDateEndModalVisible(false)} style={{ padding: 10, backgroundColor: '#004d61', borderRadius: 10, alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Reminder Modal */}
            <Modal visible={reminderModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#004d61' }}>ความถี่การแจ้งเตือน</Text>
                        {reminders.map((r) => (
                            <TouchableOpacity key={r} style={{ padding: 10, alignItems: 'center' }} onPress={() => { setReminder(r); setReminderModalVisible(false); }}>
                                <Text style={{ fontSize: 16, fontWeight: reminder === r ? 'bold' : 'normal', color: reminder === r ? '#004d61' : 'black' }}>{r}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setReminderModalVisible(false)} style={{ padding: 10, backgroundColor: '#004d61', borderRadius: 10, alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Time Picker Modal */}
            <Modal visible={timePickerModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20, width: '80%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#004d61' }}>เวลารับประทานครั้งที่ 1</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {hours.map((h) => (
                                    <TouchableOpacity key={h} style={{ padding: 10 }} onPress={() => setSelectedHour(h)}>
                                        <Text style={{ fontSize: 16, fontWeight: selectedHour === h ? 'bold' : 'normal', color: selectedHour === h ? '#004d61' : 'black' }}>{h}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#004d61', marginHorizontal: 10 }}>:</Text>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {minutes.map((m) => (
                                    <TouchableOpacity key={m} style={{ padding: 10 }} onPress={() => setSelectedMinute(m)}>
                                        <Text style={{ fontSize: 16, fontWeight: selectedMinute === m ? 'bold' : 'normal', color: selectedMinute === m ? '#004d61' : 'black' }}>{m}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setTimePickerModalVisible(false)} style={{ padding: 10, backgroundColor: '#004d61', borderRadius: 5, alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ConfirmationModal />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '##00796B',
        borderRadius: 15,
        margin: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00524D',
    },
    contentContainer: {
        backgroundColor: '#CBF2F5',
        padding: 20,
        borderRadius: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00524D',
    },
    inputTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#00524D',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidthContainer: {
        width: '48%',
    },
    saveButton: {
        backgroundColor: '#00796B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    iconContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 5,
    },
    selectedIcon: {
        backgroundColor: '#00796B',
    },
    hoveredIcon: {
        backgroundColor: '#D3F8F2',
    },
    iconText: {
        fontSize: 24,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    timeInput: {
        flex: 1,
        marginRight: 5,
    },
    addTimeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    addTimeIcon: {
        marginRight: 5,
    },
    addTimeText: {
        color: 'teal',
    },
    saveButton: {
        backgroundColor: '#00796B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    confirmationContent: {
        backgroundColor: '#CBF2F5',
        padding: 25,
        borderRadius: 10,
        width: '85%',
    },
    confirmationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#00524D',
        textAlign: 'center',
    },
    detailContainer: {
        marginVertical: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    detailLabel: {
        fontWeight: '600',
        color: '#00524D',
    },
    detailText: {
        color: '#00524D',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        padding: 12,
        borderRadius: 20,
        width: '40%',
    },
    cancelButton: {
        backgroundColor: 'white',
    },
    confirmButton: {
        backgroundColor: 'white',
    },
    buttonText: {
        color: '#00524D',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MedicineReminder;
