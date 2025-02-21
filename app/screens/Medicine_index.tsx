import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 
import { FontAwesome5 } from "@expo/vector-icons";


export default function Content() {
  const [activeButton, setActiveButton] = useState("สารบัญยา");
  const [activeTab, setActiveTab] = useState('home');
  const navigation = useNavigation();


  const handleMedicinePress = (medicineName) => {
    navigation.navigate(medicineName); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>สารบัญยา</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Entypo name="dots-three-horizontal" size={24} color="#00524D" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#999" />
          <TouchableOpacity style={styles.searchButton}>
            <Entypo name="magnifying-glass" size={18} color="#55C3CC" />
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          <View style={styles.row}>
            {/* Medicine Item 1 */}
            <TouchableOpacity style={styles.box} onPress={() => handleMedicinePress('Para')}>
              <Image
                source={{ uri: 'https://www.thaihealth.or.th/data/content/2018/01/40403/cms/newscms_thaihealth_c_dgiklmnsx135.jpg' }}
                style={styles.boxImage}
              />
              <Text style={styles.medicineName}>
                ชื่อยา: <Text style={styles.boldText}>พาราเซตามอล</Text>
                {"\n"}(Para-acetylaminophenol)
              </Text>
              <Text style={styles.medicineDescription}>
                <Text style={styles.boldText}>สรรพคุณ:</Text> บรรเทาอาการปวด ลดไข้
              </Text>
            </TouchableOpacity>

            {/* Medicine Item 2 */}
            <TouchableOpacity style={styles.box} onPress={() => handleMedicinePress('Antibiotic')}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1637737073/attached_image_th/antibioticpillgreenandbluecolourcapsules.jpg' }}
                style={styles.boxImage}
              />
              <Text style={styles.medicineName}>
                ชื่อยา: <Text style={styles.boldText}>ยาปฏิชีวนะ</Text>
                {"\n"}(Antibiotic)
              </Text>
              <Text style={styles.medicineDescription}>
                <Text style={styles.boldText}>สรรพคุณ:</Text> ใช้รักษาการติดเชื้อ
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {/* Medicine Item 3 */}
            <TouchableOpacity style={styles.box} onPress={() => handleMedicinePress('Painkiller')}>
              <Image
                source={{ uri: 'https://inwfile.com/s-dl/sqea0a.jpg' }}
                style={styles.boxImage}
              />
              <Text style={styles.medicineName}>
                ชื่อยา: <Text style={styles.boldText}>ยาแก้ปวด</Text>
                {"\n"}(Painkiller)
              </Text>
              <Text style={styles.medicineDescription}>
                <Text style={styles.boldText}>สรรพคุณ:</Text> บรรเทาอาการปวด
              </Text>
            </TouchableOpacity>

            {/* Medicine Item 4 */}
            <TouchableOpacity style={styles.box} onPress={() => handleMedicinePress('Antifungal')}>
              <Image
                source={{ uri: 'https://www.canesten.co.th/sites/g/files/vrxlpx22106/files/2024-03/canesten-products-slide-1.png' }}
                style={styles.boxImage}
              />
              <Text style={styles.medicineName}>
                ชื่อยา: <Text style={styles.boldText}>ยาฆ่าเชื้อรา</Text>
                {"\n"}(Antifungal)
              </Text>
              <Text style={styles.medicineDescription}>
                <Text style={styles.boldText}>สรรพคุณ:</Text> ใช้รักษาเชื้อราผิวหนัง
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {/* Medicine Item 5 */}
            <TouchableOpacity style={styles.box} onPress={() => handleMedicinePress('CoughSyrup')}>
              <Image
                source={{ uri: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/40/88/8850360310040/8850360310040_4.jpg' }}
                style={styles.boxImage}
              />
              <Text style={styles.medicineName}>
                ชื่อยา: <Text style={styles.boldText}>ยาแก้ไอ</Text>
                {"\n"}(Cough Syrup)
              </Text>
              <Text style={styles.medicineDescription}>
                <Text style={styles.boldText}>สรรพคุณ:</Text> บรรเทาอาการไอ
              </Text>
            </TouchableOpacity>

            {/* Medicine Item 6 */}
            <TouchableOpacity style={styles.box} onPress={() => handleMedicinePress('HealthSupplement')}>
              <Image
                source={{ uri: 'https://bangpleestationery.com/wp-content/uploads/2019/12/%E0%B8%A2%E0%B8%B2%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%AD.png' }}
                style={styles.boxImage}
              />
              <Text style={styles.medicineName}>
                ชื่อยา: <Text style={styles.boldText}>ยาแก้ไอชนิดน้ำ</Text>
                {"\n"}(Health Supplement)
              </Text>
              <Text style={styles.medicineDescription}>
                <Text style={styles.boldText}>สรรพคุณ:</Text> บรรเทาอาการไอ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.bottomNav}>
                <TouchableOpacity style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]} onPress={() => {
    setActiveTab('home');
    navigation.navigate('Mainpage'); // ✅ ไปที่ Mainpage
  }}
                  >
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
                    }}  >
                    <Ionicons name="person" size={24} color={activeTab === 'profile' ? '#00514D' : '#99B9B8'} />
                    <Text style={{ color: activeTab === 'profile' ? '#00514D' : '#99B9B8' }}>สารบัญยา</Text>
                </TouchableOpacity>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#CBF2F5",
  },

  medicineName: {
    marginLeft:10,
    fontSize: 12,
    color: "#00524D",
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  medicineDescription: {
    fontSize: 10,
    color: "#333",
    marginTop: 5,
    marginLeft:10,
  },
  header: {
    width: "100%",
    height: 148,
    backgroundColor: "#55C3CC",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#00524D",
    fontWeight: "bold",
    marginRight: 180,
  },
  menuButton: {
    position: "absolute",
    right: 40,
    top: 65,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 343,
    marginTop: 20,
    backgroundColor: "rgba(85, 195, 204, 0.5)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 46,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    padding: 5,
    backgroundColor: "white",
    width: 70,
    borderRadius: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 20,
  },
  boxContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  row: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "95%",
  },
  box: {
    width: 170,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    overflow: "hidden", // Ensure the image stays within the box
  },
  boxImage: {
    width: "100%", // Fill the box width
    height: 117,  // Fixed height
    resizeMode: "cover", // Ensure the image fits properly
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 110,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 12,
    color: "#00524D",
  },
  activeNavButton: {
    color: "#003C3A",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeNavButtonText: {
    color: "#003C3A", // Active color for text
    fontWeight: "bold",
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
});
