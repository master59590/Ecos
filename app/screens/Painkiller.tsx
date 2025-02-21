import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const recommendedMedicines = [
  {
    id: "1",
    name: "ยาแก้ไอ",
    image: "https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/40/88/8850360310040/8850360310040_4.jpg",
    description: "บรรเทาอาการไอ",
    screen: "CoughSyrup",
  },
  {
    id: "2",
    name: "ยาปฏิชีวนะ",
    image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1637737073/attached_image_th/antibioticpillgreenandbluecolourcapsules.jpg",
    description: "ใช้รักษาการติดเชื้อแบคทีเรีย",
    screen: "Antibiotic",
  },
  {
    id: "3",
    name: "ยาฆ่าเชื้อรา",
    image: "https://www.canesten.co.th/sites/g/files/vrxlpx22106/files/2024-03/canesten-products-slide-1.png",
    description: "ใช้รักษาเชื้อราผิวหนัง",
    screen: "Antifungal",
  },
];

const Painkiller = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔹 รายละเอียดยา */}
      <View style={styles.box}>
        <Image
          source={{
            uri: 'https://inwfile.com/s-dl/sqea0a.jpg',
          }}
          style={styles.boxImage}
        />
        <Text style={styles.medicineName}>
          ชื่อยา: <Text style={styles.boldText}>ยาแก้ปวด</Text>
          {"\n"}(Painkiller)
        </Text>
        <Text style={styles.medicineDescription}>
          <Text style={styles.boldText}>สรรพคุณ:</Text> บรรเทาอาการปวด
        </Text>
        <Text style={styles.medicineDescription}>
          <Text style={styles.boldText}>วิธีการรับประทาน / ใช้</Text>
        </Text>

        <Text style={styles.medicineDetails}>
          <Text style={styles.boldText}>ผู้ใหญ่:</Text> รับประทานครั้งละ 500 มิลลิกรัม ทุก 4-6 ชั่วโมงตามความจำเป็น แต่ไม่เกิน 4000 มิลลิกรัม (8 เม็ด) ใน 24 ชั่วโมง
        </Text>

        <Text style={styles.medicineDetails}>
          <Text style={styles.boldText}>เด็ก:</Text> ปริมาณยาขึ้นอยู่กับน้ำหนักตัวและคำแนะนำของแพทย์
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

export default Painkiller;
