import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const MedicineListScreen = () => {
  const router = useRouter();

  // ตัวอย่างข้อมูลยา
  const [medicines, setMedicines] = useState([
    {
      id: '1',
      name: 'ยาทาแก้คัน Diabederm',
      dosage: '1 ครั้ง',
      timeSlot: 'ไม่กำหนด / เย็น',
      additional: 'รักษาเป็นต้องการ',
      icon: 'https://img.icons8.com/color/48/ointment.png', // ใช้รูปไอคอนจำลอง
    },
  ]);

  // เก็บค่าประเภทยาที่ถูกเลือก
  const [selectedMedicineType, setSelectedMedicineType] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>รายการยา</Text>
        <IconButton icon="dots-horizontal" size={24} onPress={() => {}} />
      </View>

      {/* เมนูเลือกประเภทของยา */}
      <View style={styles.medicineTypeContainer}>
        {[
          { icon: '💊', id: 'pill' },
          { icon: '💉', id: 'injection' },
          { icon: '🧴', id: 'lotion' },
          { icon: '🌿', id: 'herbal' },
          { icon: '🔖', id: 'other' },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.medicineTypeButton,
              selectedMedicineType === item.id && styles.selectedMedicineType,
            ]}
            onPress={() => setSelectedMedicineType(item.id)}
          >
            <Text style={styles.medicineTypeText}>{item.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Body - พื้นหลังสีขาวครอบเนื้อหา */}
      <View style={styles.bodyContainer}>
        <FlatList
          data={medicines}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.medicineCard}>
              <View style={styles.medicineInfo}>
                <Image source={{ uri: item.icon }} style={styles.medicineIcon} />
                <View>
                  <Text style={styles.medicineName}>ชื่อยา  {item.name}</Text>
                  <Text style={styles.medicineDetail}>จำนวน  {item.dosage}</Text>
                  <Text style={styles.medicineDetail}>ช่วงเวลา  {item.timeSlot}</Text>
                  <Text style={styles.medicineDetail}>เพิ่มเติม  {item.additional}</Text>
                </View>
              </View>
              <IconButton 
                icon="pencil" 
                size={20} 
              />
            </View>
          )}
        />
      </View>

      {/* ปุ่มเพิ่มรายการยา - ลอยอยู่ด้านล่าง------------------------------------- */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => router.push('/MedicineReminder')}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>เพิ่มรายการยา</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MedicineListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55C3CC', // พื้นหลังหลัก
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  medicineTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  medicineTypeButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  selectedMedicineType: {
    backgroundColor: '#00796B', // เปลี่ยนเป็นสีเขียวเมื่อถูกเลือก
  },
  medicineTypeText: {
    fontSize: 24,
  },
  /* Body Section */
  bodyContainer: {
    flex: 1,
    backgroundColor: '#CBF2F5', // สีพื้นหลังของเนื้อหา
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 100, // เพิ่ม padding เพื่อไม่ให้ FlatList ทับปุ่ม
  },
  medicineCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  medicineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicineIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  medicineDetail: {
    fontSize: 14,
    color: '#666',
  },
  /* ปุ่มเพิ่มรายการยา */
  addButton: {
    position: 'absolute',
    bottom: 20, // ปรับตำแหน่งให้ติดขอบล่าง
    left: '50%',
    transform: [{ translateX: -90 }], // จัดให้กึ่งกลาง
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5, // เพิ่มเงาให้ดูเหมือนลอย
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
});
