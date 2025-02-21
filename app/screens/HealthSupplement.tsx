import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const recommendedSupplements = [
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
  {
    id: "3",
    name: "ยาฆ่าเชื้อรา",
    image: "https://www.canesten.co.th/sites/g/files/vrxlpx22106/files/2024-03/canesten-products-slide-1.png",
    description: "ใช้รักษาเชื้อราผิวหนัง",
    screen: "Antifungal",
  },
];

const HealthSupplement = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Image
          source={{
            uri: 'https://bangpleestationery.com/wp-content/uploads/2019/12/%E0%B8%A2%E0%B8%B2%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%AD.png',
          }}
          style={styles.boxImage}
        />
        <Text style={styles.medicineName}>
          ชื่อผลิตภัณฑ์: <Text style={styles.boldText}>ยาแก้ไอชนิดน้ำ</Text>
          {"\n"}(Health Supplement)
        </Text>
        <Text style={styles.medicineDescription}>
          <Text style={styles.boldText}>สรรพคุณ:</Text> บรรเทาอาการไอ
        </Text>
        <Text style={styles.medicineDescription}>
          <Text style={styles.boldText}>วิธีการรับประทาน / ใช้</Text>
        </Text>
        <Text style={styles.medicineDetails}>
          จิบครั้งละ1-2ครั้ง เมื่อมีอาการไอหรือคันคอ
        </Text>
      </View>

      <Text style={styles.sectionTitle}>แนะนำสำหรับคุณ</Text>
      <View style={styles.boxContainer}>
              <FlatList
                data={recommendedSupplements}
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
    height: 150,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00524D',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
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

export default HealthSupplement;