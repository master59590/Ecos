import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, DateData } from 'react-native-calendars';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Mainpage = ({ navigation }: RouterProps) => {
    const [activeTab, setActiveTab] = useState('home');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [weekDays, setWeekDays] = useState<{ day: number; dayOfWeek: string }[]>([]);

    useEffect(() => {
        const today = new Date();
        const offset = today.getTimezoneOffset() * 60000; // คำนวณความคลาดเคลื่อนของ Time Zone
        const localDate = new Date(today.getTime() - offset); // ปรับให้เป็นเวลาท้องถิ่น
        const formattedDate = localDate.toISOString().split('T')[0]; // YYYY-MM-DD ที่ถูกต้อง
        setSelectedDate(formattedDate);
    
        // Generate a week range dynamically
        const daysArray = [];
        for (let i = -3; i <= 3; i++) {
            const date = new Date(localDate); // ใช้ localDate เพื่อให้เป็นเวลาท้องถิ่น
            date.setDate(localDate.getDate() + i - 1); // ลบ 1 วัน
            daysArray.push({
                day: date.getDate(),
                fullDate: date.toISOString().split('T')[0], // ใช้ YYYY-MM-DD ที่แน่นอน
                dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            });
        }
        setWeekDays(daysArray);
    }, []);
    
    const medications = [
        {
          id: '1',
          time: '09.00 น.',
          name: 'Insulin',
          amount: '8 ยูนิต',
          schedule: 'หลังอาหาร / ตอนเช้า',
          image: require('../../assets/insulin.jpg'),
          status: 'ยังไม่บันทึกสถานะ',
        },
        {
          id: '2',
          time: '09.00 น.',
          name: 'Paracetamol',
          amount: '1 เม็ด',
          schedule: 'หลังอาหาร / ตอนเย็น',
          image: require('../../assets/pill.jpg'),
          status: 'ยังไม่บันทึกสถานะ',
        },
        {
            id: '2',
            time: '09.00 น.',
            name: 'Paracetamol',
            amount: '1 เม็ด',
            schedule: 'หลังอาหาร / ตอนเย็น',
            image: require('../../assets/pill.jpg'),
            status: 'ยังไม่บันทึกสถานะ',
          },
          {
            id: '2',
            time: '09.00 น.',
            name: 'Paracetamol',
            amount: '1 เม็ด',
            schedule: 'หลังอาหาร / ตอนเย็น',
            image: require('../../assets/pill.jpg'),
            status: 'ยังไม่บันทึกสถานะ',
          },
          
          {
            id: '2',
            time: '09.00 น.',
            name: 'Paracetamol',
            amount: '1 เม็ด',
            schedule: 'หลังอาหาร / ตอนเย็น',
            image: require('../../assets/pill.jpg'),
            status: 'ยังไม่บันทึกสถานะ',
          },
      ];
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerContainer}>

                    <View style={styles.header}>

                    <TouchableOpacity onPress={() => {
                        setActiveTab('profile');
                        navigation.navigate('Profile')
                        }}>
                        <Image source={require('../../assets/gongyoopic.jpg')} style={styles.profileImage} />
                    </TouchableOpacity>
                        <Text style={styles.userName}>Gong Yoo</Text>
                        <Ionicons name="ellipsis-horizontal" size={24} color="#00524D" style={styles.menuIcon} />
                    </View>

                    <View style={styles.dateSection}>
                        <View style={styles.dateRow}>
                            <Text style={styles.todayText}>Today</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Ionicons name="calendar-outline" size={24} color="black" style={styles.calendarIcon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.dateText]}>{selectedDate}</Text>

                        
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
                            {weekDays.map(({ day, dayOfWeek, fullDate }) => (
                            <TouchableOpacity 
                                key={fullDate} 
                                style={[styles.dateCircle, selectedDate === fullDate && styles.selectedDate]} 
                                onPress={() => {
                                setSelectedDate(fullDate); // ใช้ค่าวันที่จริง
                            }}
                            >
                                <Text style={[styles.dateNumber, selectedDate === fullDate && styles.activeDateText]}>{day}</Text>
                                <Text style={[styles.dateDay, selectedDate === fullDate && styles.activeDateText]}>{dayOfWeek}</Text>
                            </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View style={{height:20}}></View>
                <ScrollView 
    style={styles.scrollView} 
    contentContainerStyle={styles.scrollContent} 
    nestedScrollEnabled={true} // ให้ FlatList เลื่อนได้ใน ScrollView
>
    <View style={styles.medicationsContainer}>
        <FlatList
            data={medications}
            keyExtractor={(item, index) => index.toString()} // ป้องกัน key ซ้ำ
            renderItem={({ item }) => (
                <View style={styles.medicationCard}>
                    <Image source={item.image} style={styles.medImage} />
                    <View style={styles.medicationInfo}>
                        <Text style={styles.medTime}>🕒 {item.time}</Text>
                        <Text style={styles.medName}>{item.name}</Text>
                        <Text style={{ color: "#00524D" }}>จำนวน {item.amount}</Text>
                        <Text style={{ color: "#00524D" }}>ช่วงเวลา {item.schedule}</Text>
                    </View>
                    <TouchableOpacity style={styles.statusButton}>
                        <Text style={{ color: 'white' }}>{item.status}</Text>
                    </TouchableOpacity>
                </View>
            )}
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true} // ให้ FlatList รองรับการเลื่อน
            keyboardShouldPersistTaps="handled" // ป้องกันการขัดข้องของปุ่มกด
        />
    </View>
</ScrollView>


            </SafeAreaView>
            
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>เลือกวันที่</Text>
                        <Calendar onDayPress={(day: DateData) => {
                            setSelectedDate(day.dateString);
                            setCurrentDay(new Date(day.dateString).getDate());
                            setModalVisible(false);
                            }}
                            markedDates={{ [selectedDate]: { selected: true, selectedColor: '#0cd4ad' } }}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                <Text>ยกเลิก</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.confirmButton}>
                                <Text>ยืนยัน</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>



            <View style={styles.bottomNav}>
                <TouchableOpacity style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]} onPress={() => setActiveTab('home')}>
                    <Ionicons name="home" size={24} color={activeTab === 'home' ? '#00514D' : '#99B9B8'} />
                    <Text style={{ color: activeTab === 'home' ? '#00514D' : '#99B9B8' }}>หน้าหลัก</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, activeTab === 'list' && styles.activeNavItem]} onPress={() => setActiveTab('list')}>
                    <Ionicons name="list" size={24} color={activeTab === 'list' ? '#00514D' : '#99B9B8'} />
                    <Text style={{ color: activeTab === 'list' ? '#00514D' : '#99B9B8' }}>รายการยา</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, activeTab === 'add' && styles.activeNavItem]} onPress={() => setActiveTab('add')}>
                    <Ionicons name="add-circle" size={24} color={activeTab === 'add' ? '#00514D' : '#99B9B8'} />
                    <Text style={{ color: activeTab === 'add' ? '#00514D' : '#99B9B8' }}>เพิ่มข้อมูลยา</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, activeTab === 'profile' && styles.activeNavItem]} onPress={() => {
                    setActiveTab('profile');
                    navigation.navigate('Medicine_index')
                    }}  >
                    <Ionicons name="person" size={24} color={activeTab === 'profile' ? '#00514D' : '#99B9B8'} />
                    <Text style={{ color: activeTab === 'profile' ? '#00514D' : '#99B9B8' }}>สารบัญยา</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Mainpage;

const styles = StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor: '#CBF2F5',
        },
        safeArea: {
            flex: 1,
            backgroundColor: '#CBF2F5',
        },
        headerContainer: {
            backgroundColor: '#55C3CC',
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 0,
            paddingBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#55C3CC',
            padding: 15,
            paddingTop: StatusBar.currentHeight || 15,
        },
        profileImage: {
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
        },
        userName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#00524d',
            flex: 1,
        },
        menuIcon: {
            padding: 5,
        },
        todayText: {
            fontSize: 16,
            color:'#fff',
        },
        dateSection: {
            marginTop: 10,
            paddingHorizontal: 15,
        },
        dateText: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 20,
            color:'#fff',
        },
        dateSelector: {
            flexDirection: 'row',
            marginBottom: 20,
        },
        dateCircle: {
            width: 55,
            height: 55,
            borderRadius: 27.5,
            backgroundColor: '#DDF3F5',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
        },
        selectedDate: {
            backgroundColor: '#00524d',
        },
        dateNumber: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#00524d',
        },
        dateDay: {
            fontSize: 12,
            color: '#00524d',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
        },
        cancelButton: {
            padding: 10,
            backgroundColor: 'lightgray',
            borderRadius: 5,
        },
        confirmButton: {
            padding: 10,
            backgroundColor: '#0cd4ad',
            borderRadius: 5,
        },
        bottomNav: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
        navItem: {
            alignItems: 'center',
        },
        activeNavItem: {
            backgroundColor: '#fff',
            borderRadius: 10,
        },
        calendarIcon: {
            marginLeft: 10,
            color:'#fff'
        },
        dateRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        activeDateText: {
            color: 'white',
            fontWeight: 'bold',
        }, 
        textContainer:{
            position: 'absolute',
            top: 280, // ปรับค่านี้ให้ตรงตำแหน่งที่ต้องการ
            left: 20,
            right: 20,
            backgroundColor: 'rgba(255,255,255,0.8)', // ให้เห็นชัดขึ้น
            padding: 10,
            borderRadius: 10,
        },
        medicationsContainer: {
            // marginTop: 20, // ให้แยกจาก Header ชัดเจน
            // paddingHorizontal: 20,
            // position: 'absolute',
            marginTop: 20, // ให้แยกจาก Header
            paddingHorizontal: 20,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255,255,255,0.8)', // ให้เห็นชัดขึ้น
            padding: 10,
            borderRadius: 10,
            flex: 1, // ให้ FlatList ใช้พื้นที่เต็มและเลื่อนลงได้
            paddingTop: 20,
        },
        medicationCard: {
            // flexDirection: 'row',
            // backgroundColor: 'white',
            // borderRadius: 20,
            // padding: 15,
            // marginBottom: 15,
            // alignItems: 'center',
            // shadowColor: '#000',
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.1,
            // shadowRadius: 4,
            // elevation: 5, // เงาสำหรับ Android
            flexDirection: 'column',  // เปลี่ยนจาก row เป็น column
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 15,
            marginBottom: 15,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
        },
        medImage: {
            width: 50,
            height: 50,
            resizeMode: 'contain',
            // marginRight: 10,
            marginBottom: 10, // ขยับให้ต่ำลง

        },
        medicationInfo: {
            // flex: 1,
            // marginLeft:5
            alignItems: 'flex-start', // ชิดซ้าย
            marginBottom: 10,  // เพิ่มระยะห่างก่อนปุ่ม
        },
        medTime: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#00524d',
        },
        medName: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#00524d',
        },
        statusButton: {
            // backgroundColor: 'red',
            // padding: 8,
            // borderRadius: 10,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 10,
            width: '100%',  // ให้กว้างเต็มที่
            alignItems: 'center',
        },
        scrollView: {
            backgroundColor: '#black', // เปลี่ยนสีพื้นหลังของ ScrollView
            paddingHorizontal: 20, // เพิ่มระยะขอบด้านข้าง
            flex: 1, // ให้ ScrollView ใช้พื้นที่เต็ม

        },
        scrollContent: {
            paddingBottom: 50, // ป้องกันข้อมูลติดขอบล่าง
            alignItems: 'center', // จัดให้อยู่ตรงกลาง
            flexGrow: 1, 
            
        }
        
    });
        
        // medicationCard: { flexDirection: 'row',
        //      backgroundColor: 'white', 
        //      marginLeft:'10%',
        //      marginRight:'10%',
        //      borderRadius: 10, 
        //      padding: 10,
        //       marginBottom: 10,
        //        alignItems: 'center' },
        // medicationInfo: { flex: 1, marginLeft: 10 },
        // medTime: { fontSize: 16, fontWeight: 'bold' },
        // medName: { fontSize: 14, fontWeight: 'bold' },
        // statusButton: { backgroundColor: 'red', padding: 5, borderRadius: 5, marginRight: 10 },
       
        
   
    





  /* <TouchableOpacity style={styles.btnLogout}  onPress={() => navigation.navigate('details')}>
                <Text style={styles.btnTextMainpage}>Mainpage.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout}  onPress={() => FIREBASE_AUTH.signOut()}>
                <Text style={styles.btnTextLogout}>Logout</Text>
        </TouchableOpacity> */

        /* <FlatList
                data={medications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
            <View style={styles.medicationCard}>
                <Ionicons name={item.icon} size={40} color="#0cd4ad" />
            <View style={styles.medicationInfo}>
              <Text style={styles.medTime}>{item.time}</Text>
              <Text style={styles.medName}>ชื่อยา {item.name}</Text>
              <Text>จำนวน {item.amount}</Text>
              <Text>ช่วงเวลา {item.schedule}</Text>
            </View>
            <TouchableOpacity style={styles.statusButton}>
              <Text style={styles.statusText}>{item.status}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="trash-can" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      /> */