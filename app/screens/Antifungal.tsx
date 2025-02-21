import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const recommendedMedicines = [
  {
    id: "1",
    name: "ยาปฏิชีวนะ",
    image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1637737073/attached_image_th/antibioticpillgreenandbluecolourcapsules.jpg",
    description: "ใช้รักษาการติดเชื้อแบคทีเรีย",
    screen: "Antibiotic",
  },
  {
    id: "2",
    name: "ยาแก้ปวด",
    image: "https://inwfile.com/s-dl/sqea0a.jpg",
    description: "บรรเทาอาการปวด",
    screen: "Painkiller",
  },
];

const Antifungal = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔹 รายละเอียดยา */}
      <View style={styles.box}>
        <Image
          source={{
            uri: 'https://www.canesten.co.th/sites/g/files/vrxlpx22106/files/2024-03/canesten-products-slide-1.png',
          }}
          style={styles.boxImage}
        />
        <Text style={styles.medicineName}>
          ชื่อยา: <Text style={styles.boldText}>ยาฆ่าเชื้อรา</Text>
          {"\n"}(Antifungal)
        </Text>
        <Text style={styles.medicineDescription}>
          <Text style={styles.boldText}>สรรพคุณ:</Text> ใช้รักษาเชื้อราผิวหนัง
        </Text>
        <Text style={styles.medicineDescription}>
          <Text style={styles.boldText}>วิธีการรับประทาน / ใช้</Text>
        </Text>
        <Text style={styles.medicineDetails}>
          ใช้ทาบนผิวหนังที่มีอาการติดเชื้อรา 1-2 ครั้งต่อวันตามคำแนะนำของแพทย์
        </Text>
      </View>

      {/* 🔹 ส่วนแนะนำสำหรับคุณ */}
      <View style={styles.boxContainer}>
        <Text style={styles.sectionTitle}>แนะนำสำหรับคุณ</Text>
        <FlatList
          data={recommendedMedicines}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recommendBox} onPress={() => navigation.navigate(item.screen)}>
              <Image source={{ uri: item.image }} style={styles.recommendImage} />
              <Text style={styles.recommendText}>{item.name}</Text>
              <Text style={styles.recommendDesc}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#CBF2F5',
    padding: 20,
  },
  box: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  boxImage: {
    width: '100%',
    height: 117,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00524D',
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  medicineDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  medicineDetails: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    lineHeight: 22,
  },

  // 🔹 สไตล์ของ "แนะนำสำหรับคุณ"
  boxContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00524D",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  recommendBox: {
    width: 170,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    overflow: "hidden",
  },
  recommendImage: {
    width: "100%",
    height: 117,
    resizeMode: "cover",
  },
  recommendText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00524D",
    marginTop: 5,
    textAlign: "center",
  },
  recommendDesc: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 3,
    paddingHorizontal: 5,
  },
});

export default Antifungal;
